import http from 'http';
const options = { hostname: 'localhost', port: 3001, path: '/book/books', method: 'GET' };
const req = http.request(options, res=>{
  let data='';
  res.on('data', c=> data+=c);
  res.on('end', ()=> { console.log('status', res.statusCode); console.log('body', data); });
});
req.on('error', console.error); req.end();
