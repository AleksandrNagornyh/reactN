import { NavLink } from "react-router";

function AdminHeader() {

  return (
    <div className="header">
      <NavLink className="link" to="/">Главная</NavLink>
      <NavLink className="link" to="/adminBlog">Добавить блог</NavLink>
      <NavLink className="link" to="/adminExample">Добавить пример</NavLink>
      <NavLink className="link" to="/adminService">Добавить услугу</NavLink>
    </div>
  );
}

export default AdminHeader;