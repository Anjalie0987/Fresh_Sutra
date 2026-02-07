import { COMMON_MENU } from '../data/commonMenu';

/**
 * Get shuffled menu for a specific vendor
 * Uses sessionStorage to maintain consistency per session
 * @param {string} vendorId 
 * @returns {Array} Shuffled menu categories
 */
export const getShuffledMenuForVendor = (vendorId) => {
    if (!vendorId) return COMMON_MENU;

    const storageKey = `vendor_menu_order_${vendorId}`;
    const storedOrder = sessionStorage.getItem(storageKey);

    // 1. Return cached order if exists
    if (storedOrder) {
        try {
            const orderIds = JSON.parse(storedOrder);
            // Map the original menu to the stored order of IDs
            // This is safer than storing the whole object (single source of truth for prices/items)
            const orderedMenu = orderIds
                .map(id => COMMON_MENU.find(cat => cat.categoryId === id))
                .filter(Boolean); // Filter out any undefineds if schema changed

            if (orderedMenu.length === COMMON_MENU.length) {
                return orderedMenu;
            }
        } catch (e) {
            console.error("Failed to parse stored menu order", e);
        }
    }

    // 2. Shuffle if no cache or invalid
    const shuffledIds = shuffleArray(COMMON_MENU.map(c => c.categoryId));

    // Store IDs not data
    sessionStorage.setItem(storageKey, JSON.stringify(shuffledIds));

    // Return mapped menu
    return shuffledIds
        .map(id => COMMON_MENU.find(cat => cat.categoryId === id))
        .filter(Boolean);
};

/**
 * Fisher-Yates Shuffle
 * Returns a new array, does not mutate original
 */
const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};
