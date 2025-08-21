// import { inngest } from '@/lib/inngest'; // 任务队列客户端
export function POST() { }
// export async function POST(request) {
//   const { asin, userId } = await request.json();

//   // 1. 验证用户权限和配额
//   const { data: user } = await supabase.from('users').select('plan_credits').eq('id', userId).single();
//   if (user.plan_credits < 1) {
//     return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
//   }

//   // 2. 扣减一次额度
//   await supabase.from('users').update({ plan_credits: user.plan_credits - 1 }).eq('id', userId);

//   // 3. 发送异步任务到队列，立即返回响应，避免HTTP超时
//   await inngest.send({
//     name: 'analysis/start',
//     data: { asin, userId },
//   });

//   return NextResponse.json({ status: 'processing' });
// }