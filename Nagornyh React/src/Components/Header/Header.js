import { NavLink } from "react-router";
import { useState } from "react";

function Header() {
  const [opened, setOpened] = useState(false);
  const active = `header ${opened ? "active" : ""}`;
  

  return (
    <header className={active}>
      <span className="mobile-header" style={{display: !opened ? "none" : "inline-block" }} onClick={() => setOpened(false)}>🔼</span>
      <span className="mobile-header" style={{display: opened ? "none" : "inline-block" }} onClick={() => setOpened(true)}>🔽</span>
      <NavLink className="link" to="/">Главная</NavLink>
      <NavLink className="link" to="/about">Мероприятия</NavLink>
      <NavLink className="link" to="/services">Меню</NavLink>
      <NavLink className="link" to="/calculate">Оформить заказ</NavLink>
      <NavLink className="link" to="/contacts">Контакты</NavLink>
      <NavLink className="link" to="/gallery">Каталог товаров</NavLink>
      <NavLink className="link" to="/blogs">Блог</NavLink>
    </header>
  );
}

export default Header;