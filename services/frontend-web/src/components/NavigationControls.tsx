import { To, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../Router';
import { SegmentedControl } from '@mantine/core';

export function NavigationControls() {
  const navigate = useNavigate();
  const location = useLocation();
  const routes = ROUTES.filter((r) => r.path !== '*');
  console.log(routes);
  const data = routes.map(({ id }) => id ?? '');

  return (
    <SegmentedControl
      size="md"
      // radius="xl"
      data={data}
      withItemsBorders={false}
      onChange={(id) => {
        console.log(id);
        const route = routes.filter((route) => route.id === id).at(0)!;
        navigate(route.path as To);
      }}
      defaultValue={routes[0].id}
      value={routes.filter(({ path }) => path === location.pathname).at(0)?.id ?? null}
      style={{
        position: 'absolute',
        bottom: '0%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: '"Press Start 2P", system-ui',
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: '20px',
      }}
      fw={200}
      fz={1}
    />
  );
}
18;