// app/application/page.js
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import SuccessScreen from '@/components/SuccessScreen';

export default function GenesisRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    tshirt: '',
    dietary: '',
    github: '',
    linkedin: '',
    idea: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitStatus === 'email_exists' && name === 'email') {
      setSubmitStatus(null);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setIsSubmitting(true);

    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setSubmitStatus('email_exists');
        return;
      }

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
      } else {
        throw new Error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'loading') {
    return <LoadingScreen />;
  }

  if (submitStatus === 'success') {
    return <SuccessScreen />;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center font-mono text-black">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white shadow-lg rounded-xl px-8 py-10 border border-gray-300"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-center mb-12 tracking-tight"
        >
          genesis registration form
        </motion.h1>

        {/* Error Messages */}
        {submitStatus === 'email_exists' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700"
          >
            <p className="font-medium">An application with this email already exists.</p>
            <p className="text-sm">Please use a different email address or contact support if you believe this is an error.</p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700"
          >
            <p className="font-medium">Error submitting application.</p>
            <p className="text-sm">Please try again or contact support if the problem persists.</p>
          </motion.div>
        )}

        {/* Name */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Name</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="(000) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              required
            />
          </div>
        </div>

        {/* School */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            What school do you go to?
          </label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
        </div>

        {/* T-shirt Size */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">T-shirt Size</label>
          <select
            name="tshirt"
            value={formData.tshirt}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-black focus:outline-none"
            required
          >
            <option value="">Select size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        {/* Dietary Restrictions */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            Dietary Restrictions
          </label>
          <select
            name="dietary"
            value={formData.dietary}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-black focus:outline-none"
            required
          >
            <option value="">Select restriction</option>
            <option value="None">None</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Nut Allergy">Nut Allergy</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* GitHub */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            GitHub Profile (optional)
          </label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            LinkedIn Profile (optional)
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Project Idea */}
        <div className="mb-8">
          <label className="block text-sm font-bold mb-2">
            Do you have a project idea? (optional)
          </label>
          <textarea
            name="idea"
            value={formData.idea}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about your project idea (if any)"
            className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500 mb-8">
          * Required fields
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 border-2 border-black rounded-md text-black font-semibold hover:bg-gray-50 transition-colors"
          >
            ← Back
          </motion.button>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            className={`w-full sm:w-auto px-8 py-3 rounded-md font-semibold shadow-md transition ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application →'}
          </motion.button>
        </div>
      </motion.form>
    </main>
  );
}