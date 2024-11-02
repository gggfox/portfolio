import { serverStateClient } from '@/state/server.state';

export function SharedTest() {
  const { data, isLoading, error } = serverStateClient.getPosts.useQuery(['posts']);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data?.status !== 201 || error) {
    return <div>Error</div>;
  }

  return <div>{data.body}</div>;
}
