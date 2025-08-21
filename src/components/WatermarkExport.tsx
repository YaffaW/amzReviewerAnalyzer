'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function WatermarkExport({ asin, isProUser }: {
  asin: string;
  isProUser: boolean;
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    setIsGenerating(true);
    try {
      // 调用导出API
      const res = await fetch(`/api/export?asin=${asin}`);
      const blob = await res.blob();

      // 创建下载链接
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ReviewRadar_Report_${asin}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('导出失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`mt-6 p-4 rounded-lg ${isProUser ? 'bg-green-50' : 'bg-amber-50'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">
            {isProUser ? '完整分析报告' : '试用版报告'}
          </h3>
          <p className="text-sm mt-1">
            {isProUser
              ? '可下载无水印PDF版本'
              : '导出报告将包含水印，升级Pro版解锁纯净版'}
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={isGenerating}
          className={`flex items-center px-4 py-2 rounded-md ${isProUser
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          {isGenerating ? '生成中...' : '导出报告'}
        </button>
      </div>
    </div>
  );
}