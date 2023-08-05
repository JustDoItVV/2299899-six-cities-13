export type Offer = {
  id: number;
  title: string;
  type: string;
  bedrooms: number;
  adults: number;
  children: number;
  price: number;
  rate: number;
  features: [string, string, string];
  inside: string[];
  description: string;
  isPremium: boolean;
  isFavorite: boolean;
  host: number;
  reviews: number[];
  pictures: string[];
  pictureSmall: string;
  city: string;
  lat: number;
  lng: number;
};