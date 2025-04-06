/*
 *
 * User
 *
 */
export default interface User {
    handle: string;
    email?: string;           // Only if user allowed to share contact info
    vkId?: string;           // Only if user allowed to share contact info
    openId?: string;         // Only if user allowed to share contact info
    firstName?: string;      // Localized
    lastName?: string;       // Localized
    country?: string;        // Localized
    city?: string;          // Localized
    organization?: string;   // Localized
    contribution: number;
    rank: string;           // Localized
    rating: number;
    maxRank: string;        // Localized
    maxRating: number;
    lastOnlineTimeSeconds: number;    // Unix timestamp
    registrationTimeSeconds: number;  // Unix timestamp
    friendOfCount: number;
    avatar: string;         // URL
    titlePhoto: string;     // URL
};
