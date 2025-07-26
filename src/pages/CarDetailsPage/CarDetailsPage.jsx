import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCars } from "../../redux/selectors";
import styles from "./CarDetailsPage.module.css";
import { AiOutlineCheckCircle, AiOutlineSetting } from "react-icons/ai";
import { BsCalendar4Week, BsCarFront, BsFuelPump } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const CarDetailsPage = () => {
  const { id } = useParams();
  const cars = useSelector(selectCars);
  const car = cars.find((car) => car.id === id);

  if (!car) return <p>Car not found</p>;

  const [_, city, country] = car.address.split(",").map((str) => str.trim());

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBlock}>
        <div className={styles.leftColumn}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={styles.image}
          />

          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Book your car now</h2>
            <p className={styles.formSubtitle}>
              Stay connected! We are always ready to help you.
            </p>

            <form className={styles.form}>
              <input
                type="text"
                placeholder="Name*"
                className={styles.input}
                required
              />
              <input
                type="email"
                placeholder="Email*"
                className={styles.input}
                required
              />
              <input type="date" className={styles.input} />
              <textarea
                placeholder="Comment"
                className={styles.textarea}
              ></textarea>
              <button type="submit" className={styles.button}>
                Send
              </button>
            </form>
          </div>
        </div>

        <div className={styles.textBlock}>
          <p className={styles.row}>
            {car.brand} {car.model}, {car.year}{" "}
            <span className={styles.idText}>Id: {car.id.slice(-4)}</span>
          </p>
          <p className={styles.rowTwo}>
            <IoLocationOutline />
            {city}, {country} <span className={styles.dot}></span> Mileage:{" "}
            {car.mileage.toLocaleString("en-US").replace(/,/g, " ")} km
          </p>
          <p className={styles.price}>${car.rentalPrice}</p>
          <p className={styles.description}>{car.description}</p>
          <div className={styles.conditions}>
            {car.rentalConditions && car.rentalConditions.length > 0 && (
              <>
                <h3 className={styles.subtitle}>Rental Conditions:</h3>
                <ul className={styles.list}>
                  {car.rentalConditions.map((condition, idx) => (
                    <li key={idx}>
                      <AiOutlineCheckCircle style={{ marginRight: 8 }} />
                      {condition}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h3 className={styles.subtitle}>Car Specifications:</h3>
            <ul className={styles.list}>
              <li>
                <BsCalendar4Week style={{ marginRight: 8 }} />
                Year: {car.year}
              </li>
              <li>
                <BsCarFront style={{ marginRight: 8 }} />
                Type: {car.type}
              </li>
              <li>
                <BsFuelPump style={{ marginRight: 8 }} />
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li>
                <AiOutlineSetting style={{ marginRight: 8 }} />
                Engine Size: {car.engine}
              </li>
            </ul>

            {car.accessories && car.accessories.length > 0 && (
              <>
                <h3 className={styles.subtitle}>
                  Accessories and functionalities:
                </h3>
                <ul className={styles.list}>
                  {car.accessories.map((item, idx) => (
                    <li key={idx}>
                      <AiOutlineCheckCircle style={{ marginRight: 8 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
