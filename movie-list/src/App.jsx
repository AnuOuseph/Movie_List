import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import axios from 'axios';

import NavBar from './components/navbar/NavBar'
import Favorites from './pages/Favorites'
import Movies from './pages/Movies'
import './App.css'

export const Instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
});

function App() {

  const Layout = ()=>{
    return(
      <div>
        <NavBar />
        <Outlet/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Movies/>
        },
        {
          path: "/my-favorites",
          element: <Favorites/>
        },
      ]
    },
  ]);

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
