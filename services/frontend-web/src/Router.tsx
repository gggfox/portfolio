import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { BlogPage } from './pages/Blog/Blog.page';
import { GamePage } from './pages/Game/Game.page';
import { NotFound404Page } from './pages/NotFound404.page';
import { Layout } from './components/Layout';
import { Fullstack_Journey_Part1 } from './pages/Blog/posts/one';
import { Fullstack_Journey_Part2 } from './pages/Blog/posts/two';

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
        <Outlet />
      </Layout>
    ),
    children: [
      {
        id: 'child1',
        path: '1',
        element: <Fullstack_Journey_Part1 />,
      },
      {
        id: 'child2',
        path: '2',
        element: <Fullstack_Journey_Part2 />,
      },
      {
        id: 'NotFoundBlog',
        path: '*', // This catches any invalid child routes under /blog/*
        element: <NotFound404Page />,
      },
      // {
      //   id: 'child',
      //   path: ':id',
      //   element: <Fullstack_Journey_Part1 />,
      // },
    ],
    errorElement: (
      <Layout>
        <NotFound404Page />
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
    errorElement: (
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
