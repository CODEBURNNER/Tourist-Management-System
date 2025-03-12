import React from 'react';
import { Booking } from '../types';
import { tours, accommodations } from '../data';
import { Calendar, Users, DollarSign } from 'lucide-react';

interface BookingItemProps {
  booking: Booking;
  showPayButton?: boolean;
  onPayNow?: (bookingId: string) => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ 
  booking, 
  showPayButton = false,
  onPayNow
}) => {
  const getItemDetails = () => {
    if (booking.itemType === 'tour') {
      return tours.find(tour => tour.id === booking.itemId);
    } else {
      return accommodations.find(acc => acc.id === booking.itemId);
    }
  };

  const item = getItemDetails();

  if (!item) {
    return <div>Booking information not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-col md:flex-row">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full md:w-48 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.location}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {booking.itemType === 'tour' ? 'Tour' : 'Accommodation'}
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-1" />
              <span>{booking.date}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Users size={16} className="mr-1" />
              <span>{booking.guests} {booking.itemType === 'tour' ? 'guests' : 'rooms'}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <DollarSign size={16} className="mr-1" />
              <span>${booking.totalPrice}</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className={`px-3 py-1 rounded-full text-sm ${
              booking.paymentStatus === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {booking.paymentStatus === 'completed' ? 'Paid' : 'Payment Pending'}
            </div>
            
            {showPayButton && booking.paymentStatus === 'pending' && onPayNow && (
              <button
                onClick={() => onPayNow(booking.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;