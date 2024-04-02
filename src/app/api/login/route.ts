// api/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const cookieStore = cookies();
    const body = await request.json();
    const { email, password } = body;

    // Get user data from cookies or database
    const storedUserDataString = cookieStore.get('userData')?.value;
    if (storedUserDataString) {
        const storedUserData = JSON.parse(storedUserDataString);

        // Compare entered email and password with stored data
        if (email === storedUserData.email && password === storedUserData.password) {
            // Generate an access token or session token
            const accessToken = 'your_access_token';

            // Set the access token in a cookie
            cookieStore.set('accessToken', accessToken, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });

            return NextResponse.json({ success: true, message: 'Login successful!', accessToken });
        }
    }

    return NextResponse.json({ success: false, message: 'Invalid email or password.' });
}