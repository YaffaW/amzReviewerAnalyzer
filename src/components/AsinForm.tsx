import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AsinForm({ onAnalysisComplete }: {
  onAnalysisComplete: (data: any) => void
}) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ asin: string }>();

  const onSubmit: (data: { asin: string }) => Promise<void> = async (data) => {
    try {
      // 调用本地API路由（避免前端直接暴露SP-API密钥）
      const res = await axios.post('/api/analyze', {
        asin: data.asin.toUpperCase().trim(),
        region: 'US' // 默认美国站
      });
      onAnalysisComplete(res.data);
    } catch (error: any) {
      alert('分析失败: ' + error.response?.data?.error || '服务异常');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          {...register('asin', {
            required: 'ASIN不能为空',
            pattern: {
              value: /^[A-Z0-9]{10}$/,
              message: 'ASIN格式错误（10位字母数字）'
            }
          })}
          placeholder="输入竞品ASIN (如 B08N5WRWNW)"
          className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? '分析中...' : '开始分析'}
        </button>
      </div>
    </form>
  );
}