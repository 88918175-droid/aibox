// 一个简单的边缘函数示例
export default async function handleRequest(request, context) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 路由处理
  if (path === '/' || path === '/index.html') {
    return serveHTML(indexHtml);
  }
  
  if (path === '/admin.html') {
    return serveHTML(adminHtml);
  }
  
  if (path === '/Albox.html') {
    return serveHTML(alboxHtml);
  }

  // API 示例
  if (path === '/api/hello') {
    return new Response(JSON.stringify({ message: 'Hello from EdgeOne!' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Not Found', { status: 404 });
}

function serveHTML(html) {
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// 这里你需要把你的 HTML 内容放进来
const indexHtml = `<!DOCTYPE html>
<html>
<head><title>主页</title></head>
<body><h1>欢迎</h1></body>
</html>`;

const adminHtml = `<!DOCTYPE html>
<html>
<head><title>管理后台</title></head>
<body><h1>管理后台</h1></body>
</html>`;

const alboxHtml = `<!DOCTYPE html>
<html>
<head><title>Albox</title></head>
<body><h1>Albox 功能页</h1></body>
</html>`;