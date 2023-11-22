import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { router } from './Router';
import { SWRCustomConfig } from './components/SWRCustomConfig';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <SWRCustomConfig>
        <RouterProvider router={router} />
        <ToastContainer
          theme="dark"
          autoClose={3000}
          hideProgressBar={true}
        />
      </SWRCustomConfig>
    </NextUIProvider>
  </React.StrictMode>,
)
