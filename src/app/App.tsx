import React from 'react';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { router } from './routes';
import { store } from './store';
import 'react-day-picker/dist/style.css'; 

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

