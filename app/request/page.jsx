import { Suspense } from 'react';
import Loader from '../../components/Loader/Loader';
import RequestClient from './RequestClient';

const Page = () => (
  <Suspense fallback={<Loader loading={true} />}>
    <RequestClient />
  </Suspense>
);

export default Page;