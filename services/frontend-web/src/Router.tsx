import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { BlogPage } from './pages/Blog/Blog.page';
import { GamePage } from './pages/Game/Game.page';
import { NotFound404Page } from './pages/NotFound404.page';
import { Layout } from './components/Layout';
import { Fullstack_Journey_Part1 } from './pages/Blog/posts/one';

export const ROUTES: RouteObject[] = [
  {
    id: 'Home',
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    id: 'Blog',
    path: '/blog',
    element: (
      <Layout>
        <BlogPage />
      </Layout>
    ),
  },
  {
    id: 'Game',
    path: '/game',
    element: (
      <Layout>
        <GamePage />
      </Layout>
    ),
  },
  {
    id: 'NotFound404',
    path: '*',
    element: (
      <Layout>
        <NotFound404Page />
      </Layout>
    ),
  },
];

const router = createBrowserRouter(ROUTES);

export function Router() {
  return <RouterProvider router={router} />;
}
