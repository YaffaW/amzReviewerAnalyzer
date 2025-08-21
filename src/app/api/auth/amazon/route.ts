// app/api/auth/amazon/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { spapi_oauth_code } = await request.json();

  // 1. 用授权码换取Refresh Token
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', spapi_oauth_code);
  params.append('client_id', process.env.AMZ_CLIENT_ID);
  params.append('client_secret', process.env.AMZ_CLIENT_SECRET);

  try {
    const response = await fetch('https://api.amazon.com/auth/o2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    const data = await response.json();

    // 2. 将Refresh Token安全地关联到用户并存入数据库 (Supabase)
    const { error } = await supabase
      .from('user_tokens')
      .upsert({
        user_id: currentUser.id,
        refresh_token: data.refresh_token
      });

    if (error) throw new Error('Database storage failed');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}