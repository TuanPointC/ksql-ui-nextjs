"use client";

import {useCommandStore} from '@/store';
import Alert from '@mui/material/Alert';
import './History.scss';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FastForwardIcon from '@mui/icons-material/FastForward';
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css'; 
import { useRef, useEffect } from 'react';
hljs.registerLanguage('sql', sql);

const page = () => {
  const { commands, removeCommand } = useCommandStore()
  const [alertVisible, setAlertVisible] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  const queryCommand = (command) => {
    window.location.href = '/request?query=' + encodeURIComponent(command);
  };

  return (
    <div className="history-container">
      <h4 className='header-history'>History Requests</h4>
      <Alert
        severity="success"
        className='alert'
        style={alertVisible ? { opacity: '100%' } : { opacity: '0%' }}>Copied!
      </Alert>
      <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {commands.length > 0 ? (
          [...commands].reverse().map((command, index) => (
            <div
              key={index}
              className="history-item"
              onClick={() => handleCopy(command)}
              title="Click to copy"
            >
              <pre>
                <code ref={codeRef} className="language-sql">
                  {command}
                </code>
              </pre>

              <div className="history-item-actions">
                <IconButton aria-label="request" size="large" style={{ color: 'green' }} onClick={(e) => {
                  e.stopPropagation();
                  queryCommand(command);
                }}>
                  <FastForwardIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="large" style={{ color: 'red' }} onClick={(e) => {
                  e.stopPropagation();
                  removeCommand(command);
                }}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>

            </div>
          ))
        ) : (
          <div className="no-history">No history available</div>
        )}
      </div>
    </div>
  );
}

export default page;