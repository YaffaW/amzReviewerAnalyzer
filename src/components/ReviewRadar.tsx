import { Card, DonutChart, BarChart, Title } from '@tremor/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function ReviewRadar({ report }: { report: any }) {
  // 数据结构示例
  const mockData = {
    overallSentiment: 2.8, // 平均星级（1-5）
    topComplaints: [
      { name: '电池续航', value: 42 },
      { name: '包装破损', value: 38 },
      { name: '充电问题', value: 25 },
    ],
    sentimentTrend: [
      { month: '1月', '差评率': 12 },
      { month: '2月', '差评率': 18 },
      { month: '3月', '差评率': 15 },
    ],
    suggestedFixes: [
      "更换电池供应商 (当前批次: DL-2024Q1)",
      "增加包装缓冲层厚度至5mm",
    ]
  };

  const data = report || mockData;

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 问题分布图 */}
      <Card>
        <Title>差评原因分布</Title>
        <DonutChart
          data={data.topComplaints}
          category="value"
          index="name"
          colors={['rose', 'amber', 'blue']}
          className="mt-6 h-64"
        />
      </Card>

      {/* 趋势分析 */}
      <Card>
        <Title>差评月度趋势</Title>
        <BarChart
          data={data.sentimentTrend}
          index="month"
          categories={['差评率']}
          colors={['red']}
          className="mt-6 h-64"
        />
      </Card>

      {/* 优化建议 */}
      <Card className="lg:col-span-2">
        <div className="flex items-start">
          <ExclamationCircleIcon className="h-6 w-6 text-amber-500 mr-2" />
          <Title>产品改进建议</Title>
        </div>
        <ul className="mt-4 space-y-2">
          {data.suggestedFixes.map((fix, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>{fix}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}