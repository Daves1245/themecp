import { NextResponse } from 'next/server';
import { mapApiVerdict } from '@/types/codeforces/Submission';

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
    const response = await fetch(`${CF_API_BASE}/user.status?handle=${handle}`);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.comment || 'Failed to fetch submissions');
    }

    // Map the API verdicts to our enum values
    const processedSubmissions = data.result.map((submission: any) => ({
      ...submission,
      verdict: submission.verdict ? mapApiVerdict(submission.verdict) : undefined
    }));

    return NextResponse.json(processedSubmissions);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}