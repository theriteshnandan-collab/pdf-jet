import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Only protect /api/v1/pdf
    if (request.nextUrl.pathname.startsWith('/api/v1/pdf')) {

        // 2. Check for Authorization Header
        const authHeader = request.headers.get('authorization');

        // NOTE: In a real app, we would check Supabase/Postgres.
        // For this "Brick", we accept any key starting with "re_" (Pattern matching).
        // This allows the Demo/Laboratory to work without a full DB setup yet.
        const isValidKey = authHeader && authHeader.startsWith('Bearer re_');

        if (!isValidKey) {
            return NextResponse.json(
                { error: "Unauthorized", message: "Missing or invalid API Key. Please visit the Vault." },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/v1/:path*',
};
