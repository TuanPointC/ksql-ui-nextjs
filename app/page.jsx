import { redirect } from 'next/navigation';

const HomePage = () => {
  // Redirect to the /dashboard page
  redirect('/request');
}

export default HomePage;