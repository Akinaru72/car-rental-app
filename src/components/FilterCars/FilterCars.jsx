import styles from "./FilterCars.module.css";
import { useState } from "react";

const FilterCars = ({ onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <div className={styles.field}>
          <label htmlFor="brand">Car brand</label>
          <select
            id="brand"
            name="brand"
            value={localFilters.brand}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Choose a brand
            </option>
            <option value="Aston Martin">Aston Martin</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Bentley">Bentley</option>
            <option value="Buick">Buick</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Chrysler">Chrysler</option>
            <option value="GMC">GMC</option>
            <option value="HUMMER">HUMMER</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Kia">Kia</option>
            <option value="Lamborghini">Lamborghini</option>
            <option value="Land Rover">Land Rover</option>
            <option value="Lincoln">Lincoln</option>
            <option value="MINI">MINI</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Nissan">Nissan</option>
            <option value="Pontiac">Pontiac</option>
            <option value="Subaru">Subaru</option>
            <option value="Volvo">Volvo</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="priceInput">Price / 1 hour</label>
          <input
            id="priceInput"
            name="price"
            list="prices"
            value={localFilters.price ? `to $${localFilters.price}` : ""}
            placeholder="Choose a price"
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setLocalFilters((prev) => ({ ...prev, price: val }));
            }}
          />
          <datalist id="prices">
            <option value="30" />
            <option value="40" />
            <option value="50" />
            <option value="60" />
            <option value="70" />
            <option value="80" />
          </datalist>
        </div>
        <div className={styles.rangeGroup}>
          <div className={styles.field}>
            <label htmlFor="mileageFrom">Сar mileage / km</label>
            <input
              type="text"
              name="mileageFrom"
              placeholder="From"
              value={
                localFilters.mileageFrom
                  ? `From ${Number(localFilters.mileageFrom).toLocaleString(
                      "en-US"
                    )}`
                  : ""
              }
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setLocalFilters((prev) => ({
                  ...prev,
                  mileageFrom: onlyNumbers,
                }));
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="mileageTo" className={styles.hiddenLabel}>
              Mileage To
            </label>

            <input
              type="text"
              name="mileageTo"
              placeholder="To"
              value={
                localFilters.mileageTo
                  ? `To ${Number(localFilters.mileageTo).toLocaleString(
                      "en-US"
                    )}`
                  : ""
              }
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setLocalFilters((prev) => ({
                  ...prev,
                  mileageTo: onlyNumbers,
                }));
              }}
            />
          </div>
        </div>

        <button className={styles.button} onClick={handleApply}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterCars;
