/**
 * FRESH SUTRA - COMMON MENU DATA
 * Single source of truth for all juice vendors.
 * 
 * Architecture:
 * - Independent of specific vendors
 * - Category-based grouping
 * - Common pricing per category
 */

export const COMMON_MENU = [
    {
        categoryId: "classic_fruit",
        categoryName: "Classic Fruit Juices",
        price: 50,
        items: [
            { itemId: "orange", name: "Orange Juice", description: "Freshly squeezed oranges", isHealthy: true },
            { itemId: "apple", name: "Apple Juice", description: "Sweet and refreshing", isHealthy: true },
            { itemId: "pineapple", name: "Pineapple Juice", description: "Tangy pineapple goodness", isHealthy: true },
            { itemId: "mausambi", name: "Mausambi Juice", description: "Sweet lime favorite", isHealthy: true },
            { itemId: "grapes", name: "Grapes Juice", description: "Fresh black grapes", isHealthy: true },
            { itemId: "pomegranate", name: "Pomegranate Juice", description: "Rich in antioxidants", isHealthy: true }
        ]
    },
    {
        categoryId: "summer_coolers",
        categoryName: "Summer Coolers",
        price: 40,
        items: [
            { itemId: "watermelon", name: "Watermelon Juice", description: "Cooling and hydrating", isHealthy: true },
            { itemId: "muskmelon", name: "Muskmelon Juice", description: "Sweet seasonal melon", isHealthy: true },
            { itemId: "sugarcane", name: "Sugarcane Juice", description: "Fresh ganna juice", isHealthy: true },
            { itemId: "lemon", name: "Lemon Juice", description: "Classic nimbu pani", isHealthy: true }
        ]
    },
    {
        categoryId: "seasonal_specials",
        categoryName: "Seasonal Specials",
        price: 60,
        items: [
            { itemId: "mango", name: "Mango Juice", description: "Seasonal mango delight", isHealthy: true },
            { itemId: "strawberry", name: "Strawberry Juice", description: "Fresh strawberry blend", isHealthy: true },
            { itemId: "papaya", name: "Papaya Juice", description: "Light and nutritious", isHealthy: true }
        ]
    },
    {
        categoryId: "healthy_detox",
        categoryName: "Healthy & Detox",
        price: 50,
        items: [
            { itemId: "carrot", name: "Carrot Juice", description: "Rich in vitamin A", isHealthy: true },
            { itemId: "beetroot", name: "Beetroot Juice", description: "Improves blood circulation", isHealthy: true },
            { itemId: "carrot_beet", name: "Carrot Beet Mix", description: "Health combo", isHealthy: true },
            { itemId: "amla", name: "Amla Juice", description: "Immunity booster", isHealthy: true },
            { itemId: "cucumber", name: "Cucumber Juice", description: "Cooling detox", isHealthy: true }
        ]
    },
    {
        categoryId: "green_fitness",
        categoryName: "Green & Fitness",
        price: 60,
        items: [
            { itemId: "green_detox", name: "Green Detox Juice", description: "Spinach, cucumber, apple", isHealthy: true },
            { itemId: "mint_lemon", name: "Mint Lemon Juice", description: "Refreshing mint blend", isHealthy: true },
            { itemId: "ginger_lemon", name: "Ginger Lemon Juice", description: "Digestion booster", isHealthy: true }
        ]
    }
];

export const formatPrice = (price) => `₹${price}`;
