import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from './App';
import Layout from './layout';
import Upload from './components/upload/upload';
import ProductList from './components/productList/productList';
import Admin from './admin/admin';
import EditPage from './components/edit/edit';
import AdminProductList from './adminProductList/adminProductList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
       <Route path="" element={<ProductList/>}/>
       <Route path="upload" element={<Upload/>}/>
       <Route path="admin" element={<Admin/>}/>
       <Route path="edit" element={<EditPage/>}/>
       <Route path="adminProductList" element={<AdminProductList/>}/>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

