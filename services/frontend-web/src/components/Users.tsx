import { useQuery } from '@tanstack/react-query';

export function UserList() {
  let URL = 'http://localhost:30001/users';
  //URL = 'https://ticketing.dev/users';
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () => {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any custom headers if required by the backend
        },
        credentials: 'include',
      });
      return await response.json();
    },
  });
  console.log(data);
  return <>users</>;
}
