import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Items structure: { [storeId_itemId]: { id, qty, name, price, storeId, ...juiceDetails } }
    // Ideally cart should handle multiple stores, but for this mock we'll focus on one store active at a time or simple aggregation
    // Simplifying to: { [itemId]: qty } for the specific current flow based on StoreDetail usage
    // But to robustly support the Drawer which needs more info, we should store full item details if possible OR mock lookup.
    // Given the requirement "UI only", we will store a map of itemId -> { ...details, qty }

    const [cartItems, setCartItems] = useState({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (state) => {
        setIsDrawerOpen(state !== undefined ? state : !isDrawerOpen);
    };

    const addToCart = (item) => {
        setCartItems(prev => {
            const existing = prev[item.id];
            return {
                ...prev,
                [item.id]: {
                    ...item,
                    qty: (existing ? existing.qty : 0) + 1
                }
            };
        });
        setIsDrawerOpen(true); // Auto-open drawer on add? Optional, requirement says "Floating bar appears", maybe not auto-open drawer from add.
        // Prompt says "Clicking icon opens cart drawer", doesn't explicitly say "Add opens drawer". 
        // But StoreDetail logic was "Add item -> logic".
        // Let's NOT auto-open drawer on add to stay less intrusive, fitting the "Floating bar" behavior.
    };

    const updateQuantity = (itemId, change) => {
        setCartItems(prev => {
            const existing = prev[itemId];
            if (!existing) return prev;

            const newQty = existing.qty + change;
            if (newQty <= 0) {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            }

            return {
                ...prev,
                [itemId]: { ...existing, qty: newQty }
            };
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const newState = { ...prev };
            delete newState[itemId];
            return newState;
        });
    };

    const clearCart = () => {
        setCartItems({});
    };

    const totalItems = Object.values(cartItems).reduce((acc, item) => acc + item.qty, 0);
    const cartTotal = Object.values(cartItems).reduce((acc, item) => acc + (item.price * item.qty), 0);

    const value = useMemo(() => ({
        cartItems,
        isDrawerOpen,
        toggleDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        cartTotal
    }), [cartItems, isDrawerOpen]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
