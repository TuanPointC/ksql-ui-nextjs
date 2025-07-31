import { useEffect, useRef } from 'react';
import JsonViewer from '@/components/JsonViewer/JsonViewer';
import './KSQLStreamDetailRawData.scss';
import { useThemeStore } from '@/store';


const KSQLStreamDetailRawData = ({ isOpen, data, onClose }) => {
  const modalRef = useRef(null);
  const { theme } = useThemeStore();

  useEffect(() => { }, [isOpen, data]);
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <pre
      className={isOpen ? 'raw-data-editor visible' : 'raw-data-editor'}>
      <div ref={modalRef}>
        <JsonViewer response={data} theme={theme === 'dark' ? '' : 'light'} />
      </div>
    </pre>
  );
}

export default KSQLStreamDetailRawData;