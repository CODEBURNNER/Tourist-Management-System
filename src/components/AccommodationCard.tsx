import React from 'react';
import { Accommodation } from '../types';
import { MapPin, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={accommodation.imageUrl} 
        alt={accommodation.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{accommodation.name}</h3>
        
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span>{accommodation.location}</span>
        </div>
        
        <div className="flex items-center mt-1 text-gray-600">
          <Home size={16} className="mr-1" />
          <span>{accommodation.availableRooms} rooms available</span>
        </div>
        
        <p className="mt-2 text-gray-600 line-clamp-2">{accommodation.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">${accommodation.price}/night</span>
          <Link 
            to={`/accommodations/${accommodation.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;