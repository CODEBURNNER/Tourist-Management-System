import { User, Tour, Accommodation, Booking } from './types';

// Mock data for users
export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    isAdmin: true,
  },
  {
    id: '2',
    username: 'tourist',
    password: 'tourist123',
    isAdmin: false,
  },
];

// Mock data for tours
export const tours: Tour[] = [
  {
    id: '1',
    name: 'Mountain Hiking Adventure',
    description: 'Experience the thrill of hiking through beautiful mountain trails with experienced guides.',
    price: 150,
    duration: '1 day',
    location: 'Rocky Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    availableSpots: 20,
  },
  {
    id: '2',
    name: 'Beach Paradise Tour',
    description: 'Relax and enjoy the sun at some of the most beautiful beaches in the world.',
    price: 200,
    duration: '3 days',
    location: 'Tropical Islands',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    availableSpots: 15,
  },
  {
    id: '3',
    name: 'City Cultural Experience',
    description: 'Explore the rich culture and history of famous cities with local expert guides.',
    price: 120,
    duration: '2 days',
    location: 'European Cities',
    imageUrl: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439',
    availableSpots: 25,
  },
];

// Mock data for accommodations
export const accommodations: Accommodation[] = [
  {
    id: '1',
    name: 'Mountain View Resort',
    description: 'Luxury resort with breathtaking mountain views and premium amenities.',
    price: 250,
    location: 'Rocky Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    availableRooms: 10,
  },
  {
    id: '2',
    name: 'Beachfront Villa',
    description: 'Exclusive villa located right on the beach with private access to the ocean.',
    price: 350,
    location: 'Tropical Islands',
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6',
    availableRooms: 5,
  },
  {
    id: '3',
    name: 'City Center Hotel',
    description: 'Convenient hotel located in the heart of the city, close to all major attractions.',
    price: 180,
    location: 'European Cities',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    availableRooms: 20,
  },
];

// Mock data for bookings
export const bookings: Booking[] = [];