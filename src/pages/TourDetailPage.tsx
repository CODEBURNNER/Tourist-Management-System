import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { tours } from '../data';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/BookingForm';
import { Clock, MapPin, Users, Info } from 'lucide-react';

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  
  const tour = tours.find(t => t.id === id);
  
  if (!tour) {
    return <Navigate to="/tours" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img 
            src={tour.imageUrl} 
            alt={tour.name} 
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          
          <h1 className="text-3xl font-bold mb-4">{tour.name}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <MapPin size={16} className="mr-1 text-blue-600" />
              <span>{tour.location}</span>
            </div>
            
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <Clock size={16} className="mr-1 text-blue-600" />
              <span>{tour.duration}</span>
            </div>
            
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <Users size={16} className="mr-1 text-blue-600" />
              <span>{tour.availableSpots} spots left</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700">{tour.description}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <div className="flex items-start">
              <Info size={20} className="mr-2 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold">What to expect</h3>
                <p className="text-gray-700">
                  Join us for an unforgettable adventure! This tour includes professional guides, 
                  transportation, and all necessary equipment. Please wear comfortable clothing and 
                  bring a water bottle. Don't forget your camera to capture the amazing views!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {isAuthenticated ? (
            <BookingForm 
              itemId={tour.id} 
              itemType="tour" 
              price={tour.price} 
              maxGuests={tour.availableSpots} 
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Book This Tour</h3>
              <p className="text-gray-700 mb-4">Please log in to book this tour.</p>
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

export default TourDetailPage;