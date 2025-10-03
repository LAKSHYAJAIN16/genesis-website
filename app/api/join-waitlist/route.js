// app/api/join-waitlist/route.js
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email is required' 
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'summerWaitlist'), {
      email: email.toLowerCase().trim(),
      joinedAt: serverTimestamp(),
      source: 'summer-program-2024'
    });
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: docRef.id 
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error joining waitlist:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
