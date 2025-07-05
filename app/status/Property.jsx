import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import './Property.scss';
import axios from 'axios';


const KSQLProperties = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responses = await axios.post(`http://localhost:3000/api/query`, {
          query: "SHOW PROPERTIES;"
        });
        const response = JSON.parse(responses?.data?.result)[0]?.properties;
        if (response && response.length > 0) {
          const propertiesData = response.map((prop, index) => ({
            id: index,
            name: prop.name,
            value: prop.value,
            scope: prop.scope,
            level: prop.level,
            editable: prop.editable
          }));
          setData(propertiesData);
        }
      } catch (error) {
        console.error('Error fetching KSQL server properties:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Box className="ksql-properties">
      <Box className='box-table' >
        <table>
          <thead>
            <tr>
              <th >Name</th>
              <th >Value</th>
              <th >Scope</th>
              <th >Level</th>
              <th>Editable</th>
            </tr>
          </thead>
          <tbody>
            {(
              data.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{row.name}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{row.value}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{row.scope}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>{row.level}</td>
                  <td style={{ padding: 8, border: '1px solid #ddd' }}>
                    {row.editable ?
                      <Chip label="True" color="info" size="small" /> :
                      <Chip label="False" color="secondary" size="small" />}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default KSQLProperties;
