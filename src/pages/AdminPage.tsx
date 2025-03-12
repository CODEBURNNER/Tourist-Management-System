import React from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import BookingItem from '../components/BookingItem';
import { tours, accommodations, users } from '../data';
import { Users, MapPin, CreditCard } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { getAllBookings } = useBooking();
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }
  
  const allBookings = getAllBookings();
  
  const totalRevenue = allBookings
    .filter(booking => booking.paymentStatus === 'completed')
    .reduce((sum, booking) => sum + booking.totalPrice, 0);
  
  const pendingBookings = allBookings.filter(
    booking => booking.paymentStatus === 'pending'
  ).length;
  
  const completedBookings = allBookings.filter(
    booking => booking.paymentStatus === 'completed'
  ).length;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold">{users.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CreditCard size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Total Revenue</p>
              <h3 className="text-2xl font-bold">${totalRevenue}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <MapPin size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600">Available Tours</p>
              <h3 className="text-2xl font-bold">{tours.length}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Booking Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600">Completed Bookings</p>
                <h3 className="text-2xl font-bold">{completedBookings}</h3>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-600">Pending Bookings</p>
                <h3 className="text-2xl font-bold">{pendingBookings}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Add New Tour
            </button>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
              Add Accommodation
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Bookings</h2>
        
        {allBookings.length === 0 ? (
          <p className="text-gray-600">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {allBookings.map(booking => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;