import React from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import BookingItem from '../components/BookingItem';

const BookingsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { getUserBookings } = useBooking();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const bookings = getUserBookings();
  
  const handlePayNow = (bookingId: string) => {
    navigate(`/payment/${bookingId}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">No bookings found</h2>
          <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
          <div className="flex justify-center gap-4">
            <a 
              href="/tours" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Explore Tours
            </a>
            <a 
              href="/accommodations" 
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Find Accommodations
            </a>
          </div>
        </div>
      ) : (
        <div>
          {bookings.map(booking => (
            <BookingItem 
              key={booking.id} 
              booking={booking} 
              showPayButton={true}
              onPayNow={handlePayNow}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;