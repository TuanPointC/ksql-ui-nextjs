import axiosInstance from '@/libs/axios';

export async function GET() {
  const response = await axiosInstance.get(`/info`);

  return new Response(JSON.stringify(response.data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}