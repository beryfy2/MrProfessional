const http = require('http');

const req = http.get('http://localhost:5000/api/nav-items', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const json = JSON.parse(data);
      console.log('Is Array:', Array.isArray(json));
      console.log('Data:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('Not JSON:', data.substring(0, 100));
    }
  });
});

req.on('error', (e) => {
  console.error('Error Object:', e);
});
