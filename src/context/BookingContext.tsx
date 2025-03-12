import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Booking, Tour, Accommodation } from '../types';
import { bookings, tours, accommodations } from '../data';
import { useAuth } from './AuthContext';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (itemId: string, itemType: 'tour' | 'accommodation', date: string, guests: number) => string;
  completePayment: (bookingId: string) => void;
  getUserBookings: () => Booking[];
  getAllBookings: () => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);
  const { currentUser } = useAuth();

  const addBooking = (
    itemId: string,
    itemType: 'tour' | 'accommodation',
    date: string,
    guests: number
  ): string => {
    if (!currentUser) {
      throw new Error('User must be logged in to book');
    }

    let item: Tour | Accommodation | undefined;
    
    if (itemType === 'tour') {
      item = tours.find((t) => t.id === itemId);
      if (item && item.availableSpots < guests) {
        throw new Error('Not enough spots available');
      }
    } else {
      item = accommodations.find((a) => a.id === itemId);
      if (item && item.availableRooms < guests) {
        throw new Error('Not enough rooms available');
      }
    }

    if (!item) {
      throw new Error('Item not found');
    }

    const totalPrice = item.price * guests;
    
    const newBooking: Booking = {
      id: Date.now().toString(),
      userId: currentUser.id,
      itemId,
      itemType,
      date,
      guests,
      totalPrice,
      paymentStatus: 'pending',
    };

    setBookingsList((prev) => [...prev, newBooking]);
    
    // Update availability
    if (itemType === 'tour') {
      const tourIndex = tours.findIndex((t) => t.id === itemId);
      if (tourIndex !== -1) {
        tours[tourIndex].availableSpots -= guests;
      }
    } else {
      const accommodationIndex = accommodations.findIndex((a) => a.id === itemId);
      if (accommodationIndex !== -1) {
        accommodations[accommodationIndex].availableRooms -= guests;
      }
    }

    return newBooking.id;
  };

  const completePayment = (bookingId: string) => {
    setBookingsList((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, paymentStatus: 'completed' }
          : booking
      )
    );
  };

  const getUserBookings = () => {
    if (!currentUser) return [];
    return bookingsList.filter((booking) => booking.userId === currentUser.id);
  };

  const getAllBookings = () => {
    return bookingsList;
  };

  const value = {
    bookings: bookingsList,
    addBooking,
    completePayment,
    getUserBookings,
    getAllBookings,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};