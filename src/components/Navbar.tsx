import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, isAdmin, currentUser } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin size={24} />
          <span className="text-xl font-bold">TourEase</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/tours" className="hover:text-blue-200 transition-colors">
            Tours
          </Link>
          <Link to="/accommodations" className="hover:text-blue-200 transition-colors">
            Accommodations
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/bookings" className="hover:text-blue-200 transition-colors">
                My Bookings
              </Link>
              
              {isAdmin && (
                <Link to="/admin" className="hover:text-blue-200 transition-colors">
                  Admin Panel
                </Link>
              )}
              
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span>{currentUser?.username}</span>
              </div>
              
              <button 
                onClick={logout}
                className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;