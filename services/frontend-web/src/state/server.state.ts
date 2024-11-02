import { contract } from '@shared/test';
import { initQueryClient } from '@ts-rest/react-query';

export const serverStateClient = initQueryClient(contract, {
  baseUrl: import.meta.env.VITE_SERVER_URL,
  baseHeaders: {},
});
