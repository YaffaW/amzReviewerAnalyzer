"use client";
import { useState } from 'react';
import AsinForm from '@/components/AsinForm';
import ReviewRadar from '@/components/ReviewRadar';
import WatermarkExport from '@/components/WatermarkExport';
import Head from 'next/head';

export default function Home() {
  const [report, setReport] = useState<any>(null);
  const [isProUser] = useState(false); // 实际从用户系统获取

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>ReviewRadar - 亚马逊差评分析利器</title>
        <meta name="description" content="AI驱动竞品差评分析，提升产品评分" />
      </Head>

      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            用AI解码<span className="text-blue-600">亚马逊差评</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            输入竞品ASIN，3分钟获取差评痛点分布+改进方案
          </p>
        </div>

        {/* ASIN输入表单 */}
        <AsinForm onAnalysisComplete={setReport} />

        {/* 分析结果展示 */}
        {report && (
          <>
            <ReviewRadar report={report} />
            <WatermarkExport
              asin={report.asin}
              isProUser={isProUser}
            />

            {/* 升级提示（非Pro用户显示） */}
            {!isProUser && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <h3 className="font-bold text-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  解锁完整功能
                </h3>
                <p className="mt-2">
                  升级Pro版去除水印，获得实时竞品监控+AI改进建议生成
                </p>
                <button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                  立即升级 - $29/月
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}