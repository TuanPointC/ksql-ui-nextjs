import ReactJson from 'react-json-view'

const JsonViewer = ({ response, theme }) => {
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