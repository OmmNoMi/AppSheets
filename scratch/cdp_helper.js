// Node.js script using native WebSocket in Node 24 to communicate with Chrome DevTools Protocol
const fs = require('fs');
const path = require('path');

async function getPages() {
  const res = await fetch('http://127.0.0.1:9222/json');
  return await res.json();
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) {
            cb.reject(new Error(JSON.stringify(msg.error)));
          } else {
            cb.resolve(msg.result);
          }
        }
      };
    });
  }

  async send(method, params = {}) {
    const callId = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(callId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: callId, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async captureScreenshot(outputPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outputPath, Buffer.from(res.data, 'base64'));
    return outputPath;
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

async function main() {
  const action = process.argv[2] || 'status';
  const pages = await getPages();
  const appPage = pages.find(p => p.type === 'page' && (p.url.includes('appsheet.com') || p.title.includes('AppSheet'))) || pages.find(p => p.type === 'page');

  if (!appPage) {
    console.error('No AppSheet page found. Open pages:', pages);
    process.exit(1);
  }

  console.log(`Connected to page: "${appPage.title}" (${appPage.url})`);
  const client = new CDPClient(appPage.webSocketDebuggerUrl);
  await client.connect();

  try {
    if (action === 'status') {
      const url = await client.evaluate('window.location.href');
      const title = await client.evaluate('document.title');
      console.log(JSON.stringify({ title, url }, null, 2));
    } else if (action === 'screenshot') {
      const outPath = process.argv[3] || 'C:\\Users\\hardi\\AppSheets\\.agents\\screenshot.png';
      await client.captureScreenshot(outPath);
      console.log(`Screenshot saved to: ${outPath}`);
    } else if (action === 'eval') {
      const expr = process.argv.slice(3).join(' ');
      const result = await client.evaluate(expr);
      console.log('Result:', JSON.stringify(result, null, 2));
    } else if (action === 'eval-file') {
      const filePath = process.argv[3];
      const code = fs.readFileSync(filePath, 'utf-8');
      const result = await client.evaluate(code);
      console.log('Result:', JSON.stringify(result, null, 2));
    }
  } finally {
    client.close();
  }
}

main().catch(err => {
  console.error('CDP Error:', err);
  process.exit(1);
});
