import "./css/main.css";
import { Outlet } from "react-router";
import Header from "./Components/Header/Header";

function Layout() {
  return (<>
    <Header />
    <div className="content">
    <Outlet />
    </div>
  </>);
}
  
export default Layout;