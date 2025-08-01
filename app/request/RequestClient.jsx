"use client";

import Editor from '@monaco-editor/react';
import { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useCommandStore, useThemeStore } from '@/store';
import Loader from '../../components/Loader/Loader';
import JsonViewer from '../../components/JsonViewer/JsonViewer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { format } from 'sql-formatter';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

import './Request.scss';
import { useSearchParams } from 'next/navigation';

const RequestClient = () => {
  const [response, setResponse] = useState({});
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const { addCommands } = useCommandStore();
  const { theme } = useThemeStore();
  const [query, setQuery] = useState('');

  const searchParams = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam && queryParam.length > 0) {
      setQuery(queryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const container = containerRef.current;
      const left = leftRef.current;
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth = e.clientX - containerRect.left;
      if (newLeftWidth > 100 && newLeftWidth < containerRect.width - 100) {
        left.style.width = `${newLeftWidth}px`;
      }
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function showValue() {
    try {
      setLoading(true);
      const query = editorRef.current.getValue();
      addCommands(query);
      const data = await axios.post(`/api/query`, {
        query: query
      });
      const result = data?.data?.result ?? data;
      const responseData = typeof result === "string" ? JSON.parse(result) : result;
      setResponse(responseData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleFormatClick = () => {
    const editor = editorRef.current;
    const value = editor.getValue();
    const formatted = format(value, {
      language: 'sql',
      indent: '',
      uppercase: true,
    });
    editor.setValue(formatted);
  };

  return (
    <div className="request">
      <div className='editor-container' ref={containerRef}>
        <div className='left-block' ref={leftRef}>
          <Tooltip title="Run Query" placement="right" followCursor>
            <Button variant="text" onClick={showValue} className='button-submit'>
              <PlayArrowIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Format Query" placement="right" followCursor>
            <Button variant="text" onClick={handleFormatClick} className='button-format'>
              <AutoAwesomeIcon />
            </Button>
          </Tooltip>
          <Editor
            height="calc(100vh - 20px)"
            className='editor'
            defaultLanguage="sql"
            defaultValue=""
            onMount={handleEditorDidMount}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            fontSize={24}
            value={query}
          />
        </div>
        <div className='resizer' onMouseDown={() => setIsResizing(true)}></div>
        <div className='right-block-request'>
          <Loader loading={loading} color= "var(--text-color-black)"/>
          <JsonViewer response={response} theme={theme === 'dark' ? 'monokai': 'light'} />
        </div>
      </div>
    </div>
  );
}

export default RequestClient;
