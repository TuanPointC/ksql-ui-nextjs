import axiosInstance from '@/libs/axios';

const cleanedQuery = (inputQuery) => {
  if (!inputQuery) return '';

  const cleaned = inputQuery.replace(/^\s*--.*$/gm, '');

  return cleaned.trim();
};

const queryCommand = async (query) => {

  const fixedQuery = cleanedQuery(query);

  const endpoint = fixedQuery.toUpperCase().startsWith('SELECT') ? '/query' : '/ksql';
  const ksqlPayload = { ksql: fixedQuery };


  try {
    const response = await axiosInstance.post(`${endpoint}`, ksqlPayload, {
      headers: { 'Content-Type': 'application/json' },
    });

    return typeof response.data === 'string'
      ? response.data
      : JSON.stringify(response.data, null, 2);
  }
  catch (error) {
    return ({ 'Error executing query': error?.response?.data });
  }

};

export async function POST(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  const body = await req.json();
  const query = body?.query || '';
  try {
    const result = await queryCommand(query);
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error || 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


