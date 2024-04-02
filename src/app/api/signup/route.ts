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

  // Store data to local storage
  localStorage.setItem('userData', JSON.stringify(body));

  return NextResponse.json({ message: 'POST request received', body });
}

// Add other HTTP method handlers as needed
