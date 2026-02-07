import { COMMON_MENU } from '../data/commonMenu';

/**
 * Get shuffled menu for a specific vendor
 * Uses sessionStorage to maintain consistency per session
 * @param {string} vendorId 
 * @returns {Array} Shuffled menu categories
 */
export const getShuffledMenuForVendor = (vendorId) => {
    if (!vendorId) return COMMON_MENU;

    // Requirement: Shuffle menu every time a menu is opened
    // We do NOT use sessionStorage anymore as per new requirement

    // 1. Get shuffled IDs
    // Create a new copy of IDs to shuffle
    const allCategoryIds = COMMON_MENU.map(c => c.categoryId);
    const shuffledIds = shuffleArray([...allCategoryIds]);

    // 2. Map back to full objects
    // This ensures we always get a fresh random order
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
