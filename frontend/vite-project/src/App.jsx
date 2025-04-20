import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Logout from "./pages/Logout.jsx"
import MainLayout from "./Layout/MainLayout.jsx"
import AllProducts from './pages/AllProducts.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AddAddressPage from './pages/AddAddressPage.jsx';
import MyOrdersPage from './pages/MyOrdersPage.jsx';
import SellerMainPage from './pages/SellerMainPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import AdminOrdersPage from './pages/AdminOrdersPage.jsx';


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
      { path: 'products/:product_id', element:<ProductPage/>,},
      { path: 'cart', element: <CartPage /> },
      {path: 'add-address', element: <AddAddressPage />},
      {path: 'my-orders', element: <MyOrdersPage />},
      {path: 'seller', element: <SellerMainPage />},
      {path: 'seller/product-list', element: <ProductListPage />},
      {path: 'seller/orders', element: <AdminOrdersPage />},
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
