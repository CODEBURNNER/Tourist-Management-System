import React from 'react';
import { accommodations } from '../data';
import AccommodationCard from '../components/AccommodationCard';

const AccommodationsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Accommodations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {accommodations.map(accommodation => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
        ))}
      </div>
    </div>
  );
};

export default AccommodationsPage;