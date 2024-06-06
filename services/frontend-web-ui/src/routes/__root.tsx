import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import App from '../common-components/App'

export const Route = createRootRoute({
  component: () => (
    <>
        <App/>
        {/* <TanStackRouterDevtools /> */}
    </>
  ),
})