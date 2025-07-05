const ksqlEndpoints = process.env.KSQL_ENDPOINTS || ['http://localhost:8088'];
import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: ksqlEndpoints[0].split('=')[1] || 'http://localhost:8088',
  timeout: 100000,
});

export default axiosInstance;