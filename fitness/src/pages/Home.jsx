import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Fitness Journey</h1>
                <p className="text-xl mb-8">Join challenges, track progress, and achieve your fitness goals with friends.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button variant="primary" size="lg">Get Started</Button>
                  </Link>
                  <Link to="/challenges">
                    <Button variant="outline" size="lg">Explore Challenges</Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/assets/images/hero-fitness.svg" 
                  alt="People exercising" 
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Join Challenges</h3>
                <p className="text-gray-600">Find fitness challenges that match your goals or create your own to inspire others.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Track Progress</h3>
                <p className="text-gray-600">Log your activities and watch your progress with intuitive charts and statistics.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Compete & Achieve</h3>
                <p className="text-gray-600">Earn badges, climb the leaderboard, and celebrate achievements with the community.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Challenges Preview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Popular Challenges</h2>
              <Link to="/challenges" className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* This would be mapped from actual challenge data in a real implementation */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img src="/assets/images/challenge-1.jpg" alt="30 Days Running" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Running</span>
                  <h3 className="text-xl font-bold mt-2 mb-2 text-gray-800">30 Days Running Challenge</h3>
                  <p className="text-gray-600 mb-4">Run at least 2km every day for 30 days. Build consistency and endurance.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">162 participants</span>
                    <Link to="/challenges/1">
                      <Button variant="secondary" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img src="/assets/images/challenge-2.jpg" alt="Yoga Flow" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Yoga</span>
                  <h3 className="text-xl font-bold mt-2 mb-2 text-gray-800">21-Day Yoga Flow</h3>
                  <p className="text-gray-600 mb-4">Practice yoga for 20 minutes daily. Improve flexibility and mindfulness.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">98 participants</span>
                    <Link to="/challenges/2">
                      <Button variant="secondary" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img src="/assets/images/challenge-3.jpg" alt="Strength Training" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Strength</span>
                  <h3 className="text-xl font-bold mt-2 mb-2 text-gray-800">Summer Strength Challenge</h3>
                  <p className="text-gray-600 mb-4">Complete 15 strength workouts in 30 days. Build muscle and power.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">134 participants</span>
                    <Link to="/challenges/3">
                      <Button variant="secondary" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src="/assets/images/testimonial-1.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Sarah J.</h4>
                    <p className="text-gray-500 text-sm">Runner</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"This platform has transformed my running routine. The challenges keep me motivated and the community is so supportive. I've improved my 5K time by 3 minutes!"</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src="/assets/images/testimonial-2.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Michael T.</h4>
                    <p className="text-gray-500 text-sm">Fitness Coach</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"I recommend this platform to all my clients. It's the perfect way to maintain accountability and track progress between our sessions. The data insights are invaluable."</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src="/assets/images/testimonial-3.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Elena R.</h4>
                    <p className="text-gray-500 text-sm">Yoga Enthusiast</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"I love how I can create custom challenges for my yoga practice. The badges and achievements make it fun, and I've connected with an amazing community of like-minded people."</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-800 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who are transforming their fitness routines with our challenge-based approach.</p>
            <Link to="/register">
              <Button variant="light" size="lg">Sign Up Now - It's Free!</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;