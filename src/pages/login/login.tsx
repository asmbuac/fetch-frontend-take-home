import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import BlobOne from '@/assets/svgs/blob-1';
import FetchLogo from '@/assets/svgs/fetch-logo';
import LoginFormCard from './login-form';
import LoginDogGraphic from './login-dog-graphic';

const Login = () => {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dogs-for-adoption', { replace: true });
  }, [user, navigate]);

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <BlobOne
        width={600}
        fillOpacity={0.5}
        className="absolute -bottom-96 -left-52 z-0 -rotate-[120deg]"
      />
      <div className="z-10 flex w-full items-center justify-evenly gap-6">
        <div className="z-20 flex flex-col items-center gap-4 py-6 pl-0 md:pl-6">
          <FetchLogo />
          <LoginFormCard />
        </div>
        <LoginDogGraphic />
      </div>
    </div>
  );
};

export default Login;
