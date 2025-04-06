interface RatingRange {
    min: number;
    max: number;
    color: string;
    name: string;
}

// Define the rating ranges and their corresponding colors
const RATING_RANGES: RatingRange[] = [
    { min: 0, max: 1199, color: '#CCCCCC', name: 'Newbie' },
    { min: 1200, max: 1399, color: '#77FF77', name: 'Pupil' },
    { min: 1400, max: 1599, color: '#77DDBB', name: 'Specialist' },
    { min: 1600, max: 1899, color: '#AAAAFF', name: 'Expert' },
    { min: 1900, max: 2099, color: '#FF88FF', name: 'Candidate Master' },
    { min: 2100, max: 2399, color: '#FFBB55', name: 'Master' },
    { min: 2400, max: 2599, color: '#FFBB55', name: 'International Master' },
    { min: 2600, max: 2999, color: '#FF7777', name: 'Grandmaster' },
    { min: 3000, max: 3499, color: '#FF3333', name: 'International Grandmaster' },
    { min: 3500, max: Infinity, color: '#AA0000', name: 'Legendary Grandmaster' }
];

// Map of rank names to their display colors
const RANK_COLORS: Record<string, string> = {
    'newbie': '#CCCCCC',
    'pupil': '#77FF77',
    'specialist': '#77DDBB',
    'expert': '#AAAAFF',
    'candidate master': '#FF88FF',
    'master': '#FFBB55',
    'international master': '#FFBB55',
    'grandmaster': '#FF7777',
    'international grandmaster': '#FF3333',
    'legendary grandmaster': '#AA0000'
};

// Get color by rank name (case insensitive)
export const getColorByRank = (rank: string): string => {
    const normalizedRank = rank.toLowerCase();
    return RANK_COLORS[normalizedRank] || RANK_COLORS['newbie'];
};

// Get color by rating number
export const getColorByRating = (rating: number): string => {
    const range = RATING_RANGES.find(r => rating >= r.min && rating <= r.max);
    return range ? range.color : RANK_COLORS['newbie'];
};

// Get rank name by rating
export const getRankByRating = (rating: number): string => {
    const range = RATING_RANGES.find(r => rating >= r.min && rating <= r.max);
    return range ? range.name : 'Newbie';
};

// Get color for problem rating (slightly different shades than user ratings)
export const getProblemColor = (rating: number): string => {
    if (rating < 1200) return '#d9d9d9';  // Gray for newbie
    if (rating < 1400) return '#77ff77';  // Green for pupil
    if (rating < 1600) return '#77ddbb';  // Cyan for specialist
    if (rating < 1900) return '#aaaaff';  // Blue for expert
    if (rating < 2100) return '#ff88ff';  // Purple for candidate master
    if (rating < 2400) return '#ffbb55';  // Orange for master
    return '#ff7777';                     // Red for higher ratings
};

// Get all rating ranges
export const getRatingRanges = (): RatingRange[] => RATING_RANGES;

// Get min/max rating for a rank
export const getRatingRangeForRank = (rank: string): RatingRange | undefined => {
    const normalizedRank = rank.toLowerCase();
    return RATING_RANGES.find(r => r.name.toLowerCase() === normalizedRank);
};
