import http from 'http';

const body = JSON.stringify({name: 'Test Book', author: 'Test Author', imageurl: 'http://example.com/image.jpg'});
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/book/add-test',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

const req = http.request(options, res=>{
  let data='';
  res.on('data', chunk=> data+=chunk);
  res.on('end', ()=>{
    console.log('status', res.statusCode);
    console.log('body', data);
  });
});
req.on('error', err=> console.error(err));
req.write(body);
req.end();
