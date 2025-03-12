import React from 'react';
import { Tour } from '../types';
import { Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={tour.imageUrl} 
        alt={tour.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{tour.name}</h3>
        
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span>{tour.location}</span>
        </div>
        
        <div className="flex items-center mt-1 text-gray-600">
          <Clock size={16} className="mr-1" />
          <span>{tour.duration}</span>
        </div>
        
        <div className="flex items-center mt-1 text-gray-600">
          <Users size={16} className="mr-1" />
          <span>{tour.availableSpots} spots left</span>
        </div>
        
        <p className="mt-2 text-gray-600 line-clamp-2">{tour.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">${tour.price}</span>
          <Link 
            to={`/tours/${tour.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;