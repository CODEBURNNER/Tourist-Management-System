export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  imageUrl: string;
  availableSpots: number;
}

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  availableRooms: number;
}

export interface Booking {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'tour' | 'accommodation';
  date: string;
  guests: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'completed';
}