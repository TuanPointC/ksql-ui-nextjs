"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import KSQLStreamDetailRawData from './KSQLStreamDetailRawData';
import Loader from '@/components/Loader/Loader';
import './KSQLStreamDetails.scss';
import axios from 'axios';



export default function page() {
  const codeRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rawDataOpen, setRawDataOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const streamName = params['stream-name'];

  hljs.registerLanguage('sql', sql);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responses = await axios.post(`/api/query`, {
          query: `DESCRIBE "${streamName}";`
        });
        const response = JSON.parse(responses?.data?.result)[0];
        setData(response);
        setLoading(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [loading, data]);

  if (data === null || loading) {
    return (
      <Box p={4} className="ksql-stream-details">
        <Loader loading={loading} className="loader" color='var(--text-color-black)' />
      </Box>
    );
  }

  return (
    <Box p={4} className="ksql-stream-details">
      <KSQLStreamDetailRawData
        isOpen={rawDataOpen}
        data={data}
        onClose={() => setRawDataOpen(false)}
        className="raw-data-editor"
      />
      <div className='overplay' style={rawDataOpen ? { 'display': '' } : { 'display': 'none' }}></div>
      <Typography variant="h4" gutterBottom>
        Stream: {data?.sourceDescription.name}
        <IconButton
          aria-label="delete"
          size="large"
          onClick={(e) => {
            e.stopPropagation();
            setRawDataOpen(true)
            console.log('Raw data button clicked');
          }}>
          {rawDataOpen ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
        </IconButton>
      </Typography>

      <Card variant="outlined" sx={{ mb: 4 }} className='stream-metadata-card'>
        <CardContent>
          <Typography variant="h6">Stream Metadata</Typography>
          <Grid container spacing={2} mt={1}>
            <Grid><strong>Topic:</strong> {data?.sourceDescription.topic}</Grid>
            <Grid><strong>Partitions:</strong> {data?.sourceDescription.partitions}</Grid>
            <Grid><strong>Replication:</strong> {data?.sourceDescription.replication}</Grid>
            <Grid><strong>Key Format:</strong> {data?.sourceDescription.keyFormat}</Grid>
            <Grid><strong>Value Format:</strong> {data?.sourceDescription.valueFormat}</Grid>
            <Grid><strong>Type:</strong> {data?.sourceDescription.type}</Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4 }} className='stream-description-card'>
        <CardContent>
          <Typography variant="h6">Fields</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.sourceDescription.fields.map((field, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{field.name}</TableCell>
                    <TableCell>{field.schema?.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4 }} className='stream-queries-card'>
        <CardContent>
          <Typography variant="h6">Read Queries</Typography>
          {data?.sourceDescription.readQueries.map((query, idx) => (
            <Box key={idx} mb={2}>
              <Typography variant="subtitle2">Query ID: {query.id}</Typography>
              <pre>
                <code ref={codeRef} className="language-sql">
                  {query.queryString}
                </code>
              </pre>
              <Chip
                label={`State: ${query.state}`}
                size="small"
                color={query.state === 'RUNNING' ? 'success' : 'default'}
                sx={{ mt: 1 }}
              />
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card variant="outlined" className='stream-cluster-card'>
        <CardContent>
          <Typography variant="h6">Cluster Statistics</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Host</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.sourceDescription?.clusterStatistics?.map((stat, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{stat.name}</TableCell>
                    <TableCell>{stat.host}</TableCell>
                    <TableCell>{Number(stat.value).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

