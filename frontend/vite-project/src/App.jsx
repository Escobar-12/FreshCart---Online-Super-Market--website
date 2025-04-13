import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Logout from "./pages/Logout.jsx"
import MainLayout from "./Layout/MainLayout.jsx"
import AllProducts from './pages/AllProducts.jsx';


const Roles = {
  User: 2000,
  Editor: 3000,
  Admin: 4000,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element:<AllProducts/>,},
      // { path: 'saved', element:<SavedPosts/>,},
      // { path: 'posts/:slug', element: <Post /> },
      // {path: 'author/:authorId', element: <AuthorPage />},
      // {
      //   path: 'admin',
      //   element: <RequireAuth allowedRoles={[Roles.Admin]} />,
      //   children: [{ index: true, element: <Admin /> }],
      // },
      // {
      //   path: 'addpost',
      //   element: <RequireLogged />,
      //   children: [{ index: true, element: <AddPost /> }],
      // },
      // {
      //   path : 'notallowed',
      //   element: <notAllowed/>
      // },
      {
        path: '/logout',
        element: <Logout /> 
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
