// import inngest from 'inngest';
// inngest.createFunction(
//   { id: 'analyze-reviews' },
//   { event: 'analysis/start' },
//   async ({ event, step }) => {

//     // 步骤1: 获取用户Token
//     const refreshToken = await step.run('get-token', async () => {
//       const { data } = await supabase.from('user_tokens').select('refresh_token').eq('user_id', event.data.userId).single();
//       return data?.refresh_token;
//     });

//     // 步骤2: 通过代理抓取评论 (伪代码)
//     const reviews = await step.run('fetch-reviews', async () => {
//       return await scrapingBeeClient.get(
//         `https://www.amazon.com/product-reviews/${event.data.asin}`,
//         {
//           params: {
//             'render_js': 'false',
//             'premium_proxy': 'true', // 使用高级代理防封
//           }
//         }
//       );
//     });

//     // 步骤3: 调用AI进行分析
//     const analysisResult = await step.run('ai-analysis', async () => {
//       const prompt = `
// 你是一个专业的亚马逊产品经理。请分析以下产品评论，提炼出核心抱怨点和建议。
// 输出格式为JSON: {"problems": [{"label": "电池续航", "quote": "原文引用", "sentiment": "negative"}], "summary": "一段总结"}。
// 评论内容：
// ${reviews}
//       `;
//       const openai = new OpenAI();
//       const completion = await openai.chat.completions.create({
//         model: "gpt-4-turbo-preview",
//         messages: [{ role: "user", content: prompt }],
//         response_format: { type: "json_object" },
//       });
//       return JSON.parse(completion.choices[0].message.content);
//     });

//     // 步骤4: 将结果存入数据库
//     await step.run('save-result', async () => {
//       await supabase.from('analysis_results').insert({
//         user_id: event.data.userId,
//         asin: event.data.asin,
//         result: analysisResult,
//         status: 'completed',
//       });
//     });

//     // 步骤5: (可选) 发送完成通知邮件
//     await step.run('send-email', async () => {
//       await resend.emails.send({
//         from: 'notifications@yourdomain.com',
//         to: user.email,
//         subject: '您的分析报告已就绪',
//         html: `<p>点击查看：<a href="https://yourapp.com/dashboard/report/${reportId}">报告链接</a></p>`,
//       });
//     });
//   }
// );