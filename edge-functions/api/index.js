// ./edge-functions/api/index.js

// 使用 onRequestPost 处理 POST 请求，onRequestGet 处理 GET 请求
export function onRequestPost(context) {
  // 处理注册/保存数据
  return handleRequest(context.request, 'POST');
}

export function onRequestGet(context) {
  // 处理登录/读取数据
  return handleRequest(context.request, 'GET');
}

async function handleRequest(request, method) {
  // 启用 KV 存储，请确保已在项目中绑定命名空间名为 KV_DATA
  const KV = context.env.KV_DATA;

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
      return new Response(JSON.stringify({ ok: true }), {
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