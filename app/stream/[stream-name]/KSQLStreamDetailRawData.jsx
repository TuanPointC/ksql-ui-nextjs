import { useEffect, useRef } from 'react';
import JsonViewer from '@/components/JsonViewer/JsonViewer';
import './KSQLStreamDetailRawData.scss';


const KSQLStreamDetailRawData = ({ isOpen, data, onClose }) => {
  const modalRef = useRef(null);

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
        <JsonViewer response={data} theme="light"/>
      </div>
    </pre>
  );
}

export default KSQLStreamDetailRawData;