import styles from "./CarCard.module.css";

import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/carsSlice";
import { NavLink } from "react-router-dom";

import HeartIcon from "../../assets/HeartIcon";

const CarCard = ({ car }) => {
  const {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
  } = car;

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cars.favorites || []);
  const isFavorite = favorites.includes(id);

  const [city, country] = address.split(",").map((part) => part.trim());

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={`${brand} ${model}`} className={styles.image} />
        <button className={styles.favoriteBtn} onClick={toggleFavorite}>
          <HeartIcon isActive={isFavorite} />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.row1}>
          <span className={styles.title}>
            {brand}
            <span className={styles.model}> {model}</span>, {year}
          </span>
          <span className={styles.price}>${rentalPrice}</span>
        </div>
        <div className={styles.row}>
          <span>{city}</span>
          <span className={styles.dot}>|</span>
          <span>{country}</span>
          <span className={styles.dot}>|</span>
          <span>{rentalCompany}</span>
        </div>
        <div className={styles.row}>
          <span>{type}</span>
          <span className={styles.dot}>|</span>
          <span>{mileage.toLocaleString("en-US").replace(/,/g, " ")} km</span>
        </div>
        <NavLink
          to={`/catalog/${id}`}
          state={{ car }}
          className={styles.buttonCatalog}
        >
          Read More
        </NavLink>
      </div>
    </div>
  );
};

export default CarCard;
