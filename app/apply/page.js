'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center p-8 max-w-2xl mx-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-8">
            Application Form
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Click the button below to access our application form on JotForm.
          </p>
          
          <div className="mt-8">
            <a
              href="https://form.jotform.com/your-form-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>Go to Application Form</span>
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
          
          <p className="mt-6 text-gray-400 text-sm">
            You'll be redirected to JotForm to complete your application.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
