import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import AccommodationsPage from './pages/AccommodationsPage';
import AccommodationDetailPage from './pages/AccommodationDetailPage';
import BookingsPage from './pages/BookingsPage';
import PaymentPage from './pages/PaymentPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/tours/:id" element={<TourDetailPage />} />
                <Route path="/accommodations" element={<AccommodationsPage />} />
                <Route path="/accommodations/:id" element={<AccommodationDetailPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/payment/:bookingId" element={<PaymentPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white py-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">TourEase</h3>
                    <p className="text-gray-400">Your ultimate travel companion</p>
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-blue-400 transition-colors">About</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                  </div>
                </div>
                <div className="mt-6 text-center text-gray-400">
                  <p>&copy; 2025 TourEase. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;