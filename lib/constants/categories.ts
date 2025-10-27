export const CATEGORIES = [
  "Music",
  "Education",
  "Science",
  "Technology",
  "Gaming",
  "Lifestyle",
  "Beauty",
  "Fashion",
  "Food",
  "Travel",
  "Sports",
  "Entertainment",
  "Business",
  "Health & Fitness",
] as const;

export type Category = typeof CATEGORIES[number];
