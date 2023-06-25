import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import NotFound from './components/NotFound';


    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "*",
          element: <NotFound></NotFound>,
        },
      ]);

      

export default router;