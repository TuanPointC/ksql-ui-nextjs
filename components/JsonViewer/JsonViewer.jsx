"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false, // Prevent server-side rendering
});

const JsonViewer = ({ response, theme }) => {
  useEffect(() => {
  }, [response]);
  return (
    <div>
      <ReactJson
        src={response ?? {}}
        className='response'
        style={{ height: 'calc(100vh - 20px)', overflow: 'auto', width: '100%' }}
        theme={theme ? theme : "monokai"}
      />
    </div>
  );
}

export default JsonViewer;