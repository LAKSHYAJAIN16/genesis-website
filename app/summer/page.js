'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function SummerProgram() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-sky-50 to-amber-50 ${poppins.className} overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl text-center"
        >
          <div className="inline-block px-6 py-2 mb-6 text-sm font-medium bg-white/80 backdrop-blur-sm rounded-full border border-amber-200 shadow-sm">
            🌞 Summer 2024
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">
              Genesis
            </span>{' '}
            <span className="text-amber-500">Summer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Dive into innovation this summer! Join our exclusive program for high school builders and creators.
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-md mx-auto transform transition-all hover:scale-[1.02]">
            {status === 'success' ? (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
                🎉 Thanks for joining! We'll be in touch soon!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Your email address"
                    className="w-full px-6 py-4 border-2 border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder-gray-400 text-gray-700"
                    disabled={status === 'loading'}
                  />
                  {status === 'error' && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'shadow-lg shadow-amber-100'
                  }`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    'Join Waitlist for Early Access'
                  )}
                </button>
              </form>
            )}
            
            <p className="text-sm text-gray-500 mt-6">
              We'll only use your email to send program updates. No spam, we promise! ✨
            </p>
          </div>

          {/* Summer highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: '🏖️', text: 'Summer Vibes' },
              { icon: '💡', text: 'Innovation' },
              { icon: '🤝', text: 'Community' },
              { icon: '🚀', text: 'Launch' },
              { icon: '🎯', text: 'Mentorship' },
              { icon: '🏆', text: 'Prizes' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/30 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-gray-700 font-medium">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
