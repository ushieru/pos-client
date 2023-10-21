import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from "react-router-dom";
import './index.css'
import { router } from './Router';
import { SWRCustomConfig } from './components/SWRCustomConfig';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <SWRCustomConfig>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={router} />
        </main>
      </SWRCustomConfig>
    </NextUIProvider>
  </React.StrictMode>,
)