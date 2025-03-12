import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

interface BookingFormProps {
  itemId: string;
  itemType: 'tour' | 'accommodation';
  price: number;
  maxGuests: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ itemId, itemType, price, maxGuests }) => {
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');
  
  const { addBooking } = useBooking();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!date) {
        throw new Error('Please select a date');
      }
      
      const bookingId = addBooking(itemId, itemType, date, guests);
      navigate(`/payment/${bookingId}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Book Now</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {itemType === 'tour' ? 'Number of Guests' : 'Number of Rooms'}
          </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            min={1}
            max={maxGuests}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Price per {itemType === 'tour' ? 'person' : 'room'}</span>
            <span className="font-bold">${price}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">Total</span>
            <span className="font-bold">${price * guests}</span>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;