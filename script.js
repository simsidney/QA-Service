import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '35s', target: 500 },
    { duration: '10s', target: 1500 },
    { duration: '3m', target: 1500 },
    { duration: '35s', target: 500 },
    { duration: '10s', target: 100 },
    { duration: '5s', target: 0 },
  ]
};


export default function () {
  let res = http.get('http://localhost:33212/qa/question/?product_id=10');
  check(res, {'status was 200': r => r.status == 200})
  sleep(1);
}