// app/api/check-email/route.js
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(JSON.stringify({ 
      error: 'Email is required' 
    }), { status: 400 });
  }

  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(applicationsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    return new Response(JSON.stringify({ 
      exists: !querySnapshot.empty 
    }), { status: 200 });
  } catch (error) {
    console.error('Error checking email:', error);
    return new Response(JSON.stringify({ 
      error: 'Error checking email',
      details: error.message 
    }), { status: 500 });
  }
}