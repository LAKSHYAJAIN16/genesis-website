// app/api/submit-application/route.js
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Add server timestamp and status
    const applicationData = {
      ...data,
      submittedAt: serverTimestamp(),
      status: 'submitted'
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'applications'), applicationData);
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: docRef.id 
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error submitting application:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}