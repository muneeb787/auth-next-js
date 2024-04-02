import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Handle GET request
  return NextResponse.json({ message: 'GET request received' });
}

export async function POST(request: Request) {
  // Handle POST request
  const body = await request.json();
  // Do something with the request body
  console.log(body);

  // Retrieve data from local storage
  const storedUserDataString = localStorage.getItem('userData');
  if (storedUserDataString) {
    const storedUserData = JSON.parse(storedUserDataString);

    // Compare stored data with received data
    if (storedUserData && storedUserData.username === body.username && storedUserData.email === body.email) {
      // User is logged in
      console.log('User is logged in');
      return NextResponse.json({ message: 'User is logged in', isLoggedIn: true });
    }
  }

  // User is not logged in
  console.log('User is not logged in');
  return NextResponse.json({ message: 'User is not logged in', isLoggedIn: false });
}

// Add other HTTP method handlers as needed
