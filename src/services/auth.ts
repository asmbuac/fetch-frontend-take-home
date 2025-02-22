import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { FETCH_API } from '@/constants';

interface LoginArgs {
  name: string;
  email: string;
}

export const useLoginMutation = () => {
  const login = async (data: LoginArgs) => {
    const res = await axios.post(`${FETCH_API}/auth/login`, data);
    return res.data;
  };

  return useMutation<void, AxiosError, LoginArgs>({
    mutationKey: ['login'],
    mutationFn: login,
  });
};
