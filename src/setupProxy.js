const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define the target API URL
const target = 'https://resultsza.co.za';

// Create a proxy middleware instance
const proxyMiddleware = createProxyMiddleware({
  target,
  changeOrigin: true, // Add this line to handle CORS
});

// Use the proxy middleware for all incoming requests
app.use('/', proxyMiddleware);

// Start the server
const port = 3000; // Choose any available port
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
