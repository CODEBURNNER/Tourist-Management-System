import React from 'react';
import { Link } from 'react-router-dom';
import { tours } from '../data';
import TourCard from '../components/TourCard';
import { MapPin, Compass, CreditCard, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  // Display only the first 3 tours
  const featuredTours = tours.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="bg-cover bg-center h-[500px] flex items-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Places</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book tours and accommodations for your next adventure with ease
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/tours" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Explore Tours
            </Link>
            <Link 
              to="/accommodations" 
              className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              Find Accommodations
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Destinations</h3>
              <p className="text-gray-600">Carefully selected destinations for unforgettable experiences</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Guided Tours</h3>
              <p className="text-gray-600">Expert guides to enhance your travel experience</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and secure booking process with flexible payment options</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated customer support throughout your journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tours Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Tours</h2>
            <Link 
              to="/tours" 
              className="text-blue-600 hover:underline"
            >
              View All Tours
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;