import { NextRequest } from 'next/server';
import { generatePdfReport } from '@/lib/pdfGenerator'; // 伪代码

export default async function GET(req: NextRequest) {
  const asin = req.nextUrl.searchParams.get('asin');
  if (!asin) return new Response('ASIN缺失', { status: 400 });

  try {
    // 1. 获取分析数据
    const analysisData = await fetchAnalysisData(asin);

    // 2. 生成带水印的PDF
    const pdfBuffer = await generatePdfReport(analysisData, {
      watermark: !req.user.isPro // 非Pro用户添加水印
    });

    // 3. 返回PDF文件
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ReviewRadar_${asin}.pdf"`
      }
    });

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}