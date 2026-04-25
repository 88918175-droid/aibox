// 处理 GET 请求（读取数据）
export function onRequestGet(context) {
  return handleRequest(context, 'GET');
}

// 处理 POST 请求（写入数据）
export function onRequestPost(context) {
  return handleRequest(context, 'POST');
}

async function handleRequest(context, method) {
  // 启用 KV 存储，请确保已在项目中绑定命名空间名为 KV_DATA
  const KV = context.env.KV_DATA;
  const request = context.request;

  if (method === 'GET') {
    const data = await KV.get('users');
    return new Response(data || '{}', {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (method === 'POST') {
    try {
      const body = await request.json();
      const old = JSON.parse(await KV.get('users') || '{}');
      Object.keys(body).forEach(key => {
        old[key] = body[key];
      });
      await KV.put('users', JSON.stringify(old));
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch(e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}