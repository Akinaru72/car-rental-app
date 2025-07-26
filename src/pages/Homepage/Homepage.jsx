import css from "./Homepage.module.css";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <NavLink to="/catalog" className={css.button}>
          View Catalog
        </NavLink>
      </div>
    </div>
  );
};
export default Homepage;
