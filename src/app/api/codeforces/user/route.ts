import { NextResponse } from 'next/server';

const CF_API_BASE = 'https://codeforces.com/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get('handle');

  if (!handle) {
    return NextResponse.json(
      { error: 'Handle parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${CF_API_BASE}/user.info?handles=${handle}`);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.comment || 'Failed to fetch user info');
    }

    return NextResponse.json(data.result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}