// api/signup/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Simulating a database or persistent storage
let users: { username: any; email: any; password: any; }[] = [];

export async function POST(request: Request) {
    const cookieStore = cookies();
    const body = await request.json();
    const { username, email, password } = body;

    // Check if user already exists
    const existingUserData = users.find(
        (user) => user.username === username || user.email === email
    );

    if (existingUserData) {
        return NextResponse.json({
            success: false,
            message: 'User with the same username or email already exists.',
        });
    }

    // Store user data
    const userData = { username, email, password };
    users.push(userData);

    // Store user data in a cookie
    cookieStore.set('userData', JSON.stringify(userData), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ success: true, message: 'Signup successful!' });
}