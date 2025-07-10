const ksqlEndpoints = process.env.KSQL_ENDPOINTS.split(",").map(endpoint => endpoint.trim());
import axios from 'axios';


console.log(ksqlEndpoints[0].split('=')[1])
const axiosInstance = axios.create({
  baseURL: ksqlEndpoints[0].split('=')[1],
  timeout: 10000,
});

export default axiosInstance;