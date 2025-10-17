import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Info from "./Components/Info/Info";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import Calculator from "./Components/Calculator/Calculator";
import Contacts from "./Components/Contacts/Contacts";
import Gallery from "./Components/Gallery/Gallery";
import Blogs from "./Components/Blogs/Blogs";
import Blog from "./Components/Blog/Blog";
import AdminService from "./AdminComponents/AdminService/AdminService";
import AdminExample from "./AdminComponents/AdminExample/AdminExample";
import AdminBlog from "./AdminComponents/AdminBlog/AdminBlog";

const router = createBrowserRouter([
  {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Info />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/services",
      element: <Services />
    },
    {
      path: "/calculate",
      element: <Calculator />
    },
    {
      path: "/contacts",
      element: <Contacts />
    },
    {
      path: "/gallery",
      element: <Gallery />
    },
    {
      path: "/blogs",
      element: <Blogs />
    },
    {
      path: "/blogs/:id",
      element: <Blog />
    }
  ]},
  {
    path: "/adminService",
    element: <AdminService />
  },
  {
    path: "/adminExample",
    element: <AdminExample />
  },
  {
    path: "/adminBlog",
    element: <AdminBlog />
  },
]);

function App() {
  return (<>
    <RouterProvider router={router} />
  </>);
}
  
export default App;