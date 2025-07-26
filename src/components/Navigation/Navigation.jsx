import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getLinkStyle = ({ isActive }) => clsx(css.link, isActive && css.active);

const Navigation = () => {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        Rental<span className={css.logoAccent}>Car</span>
      </div>

      <nav className={css.nav}>
        <NavLink to="/" className={getLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={getLinkStyle}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
