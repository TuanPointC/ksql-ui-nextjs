"use client";

import ReactJson from 'react-json-view'
import { useEffect } from 'react';

const JsonViewer = ({ response, theme }) => {
  useEffect(() => {
  }, [response]);
  return (
    <ReactJson
      src={response}
      className='response'
      style={{ height: 'calc(100vh - 20px)', overflow: 'auto', width: '100%' }}
      theme={theme ? theme : "monokai"}
    />
  );
}

export default JsonViewer;