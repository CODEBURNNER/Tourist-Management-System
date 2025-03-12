import React, { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { tours, accommodations } from '../data';
import { CreditCard, Calendar, Users, CheckCircle } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { bookings, completePayment } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const booking = bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    return <Navigate to="/bookings" />;
  }
  
  if (booking.paymentStatus === 'completed') {
    return <Navigate to="/bookings" />;
  }
  
  const getItemDetails = () => {
    if (booking.itemType === 'tour') {
      return tours.find(tour => tour.id === booking.itemId);
    } else {
      return accommodations.find(acc => acc.id === booking.itemId);
    }
  };
  
  const item = getItemDetails();
  
  if (!item) {
    return <Navigate to="/bookings" />;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      completePayment(booking.id);
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect to bookings page after successful payment
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {isSuccess ? (
            <div className="bg-green-50 p-8 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-700 mb-4">
                Your booking has been confirmed. Redirecting to your bookings...
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              <div className="flex mb-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.location}</p>
                </div>
              </div>
              
              <div className="border-t border-b py-4 mb-4">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-gray-600" />
                  <span>Date: {booking.date}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-2 text-gray-600" />
                  <span>
                    {booking.guests} {booking.itemType === 'tour' ? 'guests' : 'rooms'}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Price per {booking.itemType === 'tour' ? 'person' : 'room'}</span>
                  <span>${item.price}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${booking.totalPrice}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {!isSuccess && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <CreditCard size={20} className="mr-2 text-blue-600" />
              <h2 className="text-xl font-bold">Payment Details</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Card Holder Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-2 rounded-md text-white font-bold ${
                  isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
              >
                {isProcessing ? 'Processing...' : `Pay $${booking.totalPrice}`}
              </button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                This is a simulation. No actual payment will be processed.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;