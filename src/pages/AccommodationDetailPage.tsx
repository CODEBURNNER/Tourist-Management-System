import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { accommodations } from '../data';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/BookingForm';
import { MapPin, Home, Wifi, Coffee } from 'lucide-react';

const AccommodationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  
  const accommodation = accommodations.find(a => a.id === id);
  
  if (!accommodation) {
    return <Navigate to="/accommodations" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img 
            src={accommodation.imageUrl} 
            alt={accommodation.name} 
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          
          <h1 className="text-3xl font-bold mb-4">{accommodation.name}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <MapPin size={16} className="mr-1 text-blue-600" />
              <span>{accommodation.location}</span>
            </div>
            
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <Home size={16} className="mr-1 text-blue-600" />
              <span>{accommodation.availableRooms} rooms available</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700">{accommodation.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Wifi size={16} className="mr-2 text-blue-600" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center">
                <Coffee size={16} className="mr-2 text-blue-600" />
                <span>Breakfast Included</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                </svg>
                <span>Air Conditioning</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"></path>
                  <path d="M12 15v5"></path>
                  <path d="M8 11v9"></path>
                  <path d="M16 11v9"></path>
                  <path d="M5 11h14"></path>
                </svg>
                <span>Swimming Pool</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Parking</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {isAuthenticated ? (
            <BookingForm 
              itemId={accommodation.id} 
              itemType="accommodation" 
              price={accommodation.price} 
              maxGuests={accommodation.availableRooms} 
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Book This Accommodation</h3>
              <p className="text-gray-700 mb-4">Please log in to book this accommodation.</p>
              <a 
                href="/login" 
                className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Log In to Book
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetailPage;