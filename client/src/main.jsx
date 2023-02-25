import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'
// Import our pages
import Homepage from './pages/Homepage/Homepage'

// Create a router object for our RouterProvider
const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
