import { NextResponse } from "next/server";
export async function middleware(request: { nextUrl: { pathname: string; }; cookies: { get: (arg0: string) => { (): any; new(): any; value: any; }; }; url: string | URL | undefined; }) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname == "/signup") {
    return NextResponse.next();
  }
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (accessToken && request.nextUrl.pathname == "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (accessToken && request.nextUrl.pathname == "/signup") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  let tokenPayload;
  try {
    if (accessToken) {
      const tokenParts = accessToken.split(".");
      const payloadBase64 = tokenParts[1];
      const decodedPayload = Buffer.from(payloadBase64, "base64").toString(
        "utf-8"
      );
      tokenPayload = JSON.parse(decodedPayload);
    }
  } catch (error) {
    console.error("Error decoding access token:", error);
  }
  return NextResponse.next();
}