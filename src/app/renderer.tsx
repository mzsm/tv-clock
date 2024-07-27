/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../components/textClock/textClock'
import '../index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])
const root = createRoot(document.getElementById('app')!)
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
/*
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const body = document.querySelector('p')

    body.addEventListener('mouseenter', (e) => {
      body.classList.add(e.metaKey ? 'draggable' : 'transparent')
    }, false)
    body.addEventListener('mouseleave', () => {
      body.classList.remove('transparent', 'draggable')
    }, false)
  }
}
*/
