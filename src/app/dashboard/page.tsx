// import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage(reports) {
  // const supabase = createClient();
  // const { data: reports, error } = await supabase
  //   .from('analysis_results')
  //   .select('id, asin, created_at, status')
  //   .order('created_at', { ascending: false });

  return (
    <div>
      <h1>您的分析报告</h1>
      <Link href="/analyze">新建分析</Link>
      <div>
        {reports?.map((report) => (
          <div key={report.id}>
            <span>ASIN: {report.asin}</span>
            <span>状态: {report.status}</span>
            <Link href={`/dashboard/report/${report.id}`}>查看</Link>
          </div>
        ))}
      </div>
    </div>
  );
}