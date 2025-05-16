import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800">
          You've come to the right place 😎
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
          Your decentralized pension platform for a secure retirement. Take control of your financial future with Capital Frens.
        </p>
        <Link 
          to="/retire" 
          className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Start Your Pension Now
        </Link>
      </div>

      {/* How it works section */}
      <div className="bg-white rounded-xl shadow-xl p-10 mb-16 max-w-4xl mx-auto transform -translate-y-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-700">How it works:</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              1
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Choose Your Income</h3>
            <p className="text-gray-600 text-center">
              Set the amount of monthly income you want to receive during retirement.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              2
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Set Your Duration</h3>
            <p className="text-gray-600 text-center">
              Decide how long you want to receive payments for your retirement period.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              3
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Fund & Relax</h3>
            <p className="text-gray-600 text-center">
              Deposit the required amount and enjoy automated, reliable retirement payments.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-700">Why Choose Capital Frens?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">Fully Decentralized</h3>
            <p className="text-gray-600">
              Our smart contracts run autonomously on the blockchain, giving you full control over your retirement funds.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">Transparent & Secure</h3>
            <p className="text-gray-600">
              All transactions are recorded on the blockchain, ensuring complete transparency and security.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">Flexible Options</h3>
            <p className="text-gray-600">
              Customize your pension plan with flexible duration and payment options to match your retirement goals.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">No Middlemen</h3>
            <p className="text-gray-600">
              Cut out traditional financial intermediaries and their fees, maximizing your retirement returns.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <Link 
          to="/retire" 
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-md"
        >
          Start Planning Your Retirement
        </Link>
      </div>
    </div>
  );
};

export default Home;