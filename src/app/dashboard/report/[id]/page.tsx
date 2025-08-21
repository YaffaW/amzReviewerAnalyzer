// import { Title, BarChart, Card, Text, Badge } from "@tremor/react";
// export default async function ReportPage(params) {
//   const { data: report } = await supabase
//     .from('analysis_results')
//     .select('result')
//     .eq('id', params.id)
//     .single();

//   // 使用Tremor.so图表库进行数据可视化
//   return (
//     <div>
//       <Title>问题分布</Title>
//       <BarChart
//         data={report.result.problems}
//         index="label"
//         categories={['count']}
//         colors={['blue']}
//       />
//       <div>
//         <Title>总结</Title>
//         <p>{report.result.summary}</p>
//       </div>
//       {/* 显示原始引用和情感分析 */}
//       {report.result.problems.map((problem, idx) => (
//         <Card key={idx}>
//           <Text>{problem.label}</Text>
//           <Badge color={problem.sentiment === 'negative' ? 'red' : 'yellow'}>
//             {problem.sentiment}
//           </Badge>
//           <blockquote>"{problem.quote}"</blockquote>
//         </Card>
//       ))}
//     </div>
//   );
// }
export default function ReportPage() {
  return (<></>)
}