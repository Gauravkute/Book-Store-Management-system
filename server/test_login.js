import fs from 'fs';
import http from 'http';

async function loginAndVerify(){
  const body = JSON.stringify({ username: 'admin', password: 'admin@123', role: 'admin' });
  const loginOptions = {
    hostname: 'localhost',
    port: 3001,
    path: '/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  };

  const cookie = await new Promise((resolve, reject)=>{
    const req = http.request(loginOptions, (res)=>{
      let data = '';
      res.on('data', chunk=> data += chunk);
      res.on('end', ()=>{
        const setCookie = res.headers['set-cookie'];
        resolve({setCookie, body: data});
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });

  console.log('Login response body:', cookie.body);
  console.log('Set-Cookie header:', cookie.setCookie);

  if(!cookie.setCookie) return;

  const verifyOptions = {
    hostname: 'localhost',
    port: 3001,
    path: '/auth/verify',
    method: 'GET',
    headers: {
      'Cookie': cookie.setCookie.join('; ')
    }
  };

  const verify = await new Promise((resolve, reject)=>{
    const req = http.request(verifyOptions, (res)=>{
      let data = '';
      res.on('data', chunk=> data += chunk);
      res.on('end', ()=> resolve({statusCode: res.statusCode, body: data}));
    });
    req.on('error', reject);
    req.end();
  });

  console.log('Verify response:', verify);
}

loginAndVerify().catch(err=>console.error(err));
