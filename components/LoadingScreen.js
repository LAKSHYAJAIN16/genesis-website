// components/LoadingScreen.js
'use client';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">Submitting your application...</p>
      </div>
    </div>
  );
}