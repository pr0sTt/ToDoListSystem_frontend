import React from 'react';
import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Board } from './components/Board';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Board,
      },
    ],
  },
]);
