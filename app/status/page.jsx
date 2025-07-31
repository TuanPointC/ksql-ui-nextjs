"use client";

import React, { useState, useEffect } from 'react';
import './Status.scss';
import KSQLProperties from './Property';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';


const page = () => {

  const [info, setInfo] = useState({
    version: '',
    kafkaClusterId: '',
    ksqlServiceId: '',
    serverStatus: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        const info = await axios.get('/api/info')
        const data = await axios.post(`/api/query`, {
          query: "SHOW STATUS;"
        });
        if (data && data.length > 0) {
          const status = data[0];
          setInfo({
            version: status.version || '',
            kafkaClusterId: status.kafkaClusterId || '',
            ksqlServiceId: status.ksqlServiceId || '',
            serverStatus: status.serverStatus || ''
          });
        }

        const mockInfo = {
          version: info?.data?.KsqlServerInfo?.version,
          kafkaClusterId: info?.data?.KsqlServerInfo?.kafkaClusterId,
          ksqlServiceId: info?.data?.KsqlServerInfo?.ksqlServiceId,
          serverStatus: info?.data?.KsqlServerInfo?.serverStatus
        };
        setInfo(mockInfo);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="ksql-container">
        <div className="loading-spinner">
          <Loader loading={isLoading} color='var(--text-color-black)' />
        </div>
      </div>
    );
  }

  return (
    <div className="ksql-container">
      <h3 style={{ marginBottom: '10px' }}>Server Status</h3>
      <div className="card">
        <div className="info-row">
          <span className="label">Version:</span>
          <span className="value">{info.version}</span>
        </div>
        <div className="info-row">
          <span className="label">Kafka Cluster ID:</span>
          <span className="value">{info.kafkaClusterId}</span>
        </div>
        <div className="info-row">
          <span className="label">KSQL Service ID:</span>
          <span className="value">{info.ksqlServiceId}</span>
        </div>
        <div className="info-row">
          <span className="label">Server Status:</span>
          <span className={`value ${info.serverStatus === 'RUNNING' ? 'running' : 'stopped'}`}>
            {info.serverStatus}
          </span>
        </div>
      </div>


      <h3 style={{ marginBottom: '10px' }}>Server Properties</h3>
      <KSQLProperties />
    </div>
  );
}

export default page;