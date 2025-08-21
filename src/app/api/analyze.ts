import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { asin, region } = await req.json();

  try {
    // 实际调用SP-API的代码（示例）
    const spApiResponse = await fetch('https://sellingpartnerapi.amazon.com/reviews', {
      method: 'POST',
      headers: {
        'x-amz-access-token': process.env.SP_API_ACCESS_TOKEN || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ asin, region })
    });

    if (!spApiResponse.ok) throw new Error('SP-API请求失败');

    const data = await spApiResponse.json();
    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '服务器错误' },
      { status: 500 }
    );
  }
}