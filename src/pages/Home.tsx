import { useAuth } from '@/api';

export const Home = (): JSX.Element => {
  const { user } = useAuth();
  console.log(user);

  return <div></div>;
};
