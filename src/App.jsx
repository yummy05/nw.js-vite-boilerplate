import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.png';
import viteLogo from './assets/vite.svg';
import nwLogo from './assets/nw.png';
import require from './require';

const fs = require('fs');
const nodeFetch = require('node-fetch');

const { version } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export default function App() {
  const [status, setStatus] = useState('');
  const [body, setBody] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const res = nodeFetch('https://jsonplaceholder.typicode.com/todos/1');
    res.then((r) => setStatus(r.status));
    res.then((r) => r.json()).then(setBody);
  }, []);

  return (
    <div className="h-screen flex flex-col space-y-5 items-center justify-center bg-slate-900 text-white">
      <div className="font-bold text-3xl">
        Vite & NW.JS
      </div>
      <div className="flex mt-10 space-x-5">
        <img className="h-32 hover:animate-spin" src={reactLogo} />
        <img className="h-32 hover:animate-spin" src={viteLogo} />
        <img className="h-32 hover:animate-spin" src={nwLogo} />
      </div>
      <div className="font-bold">
        Package Version:
        {' '}
        {version}
      </div>

      <div className="grid grid-cols-2">
        {
          Object.entries(process.versions).map(([key, value]) => (
            <div className="flex items-center space-x-2" key={key}>
              <div className="font-bold">{key}</div>
              <div>{value}</div>
            </div>
          ))
        }
      </div>
      <div>
        <div className="flex font-bold space-x-5 justify-center items-center">
          <div>
            Response Status:
            {' '}
            {status || 'Loading...'}
          </div>
          {
            body && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded"
                onClick={() => setShow(!show)}
              >
                {show ? 'Hide' : 'Show'}
                {' '}
                Body
              </button>
            )
}
        </div>
        {
          show && (
          <pre className="mt-2">
            {JSON.stringify(body)}
          </pre>
          )
        }
      </div>
    </div>
  );
}
