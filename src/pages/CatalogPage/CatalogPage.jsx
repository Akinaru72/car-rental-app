import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, resetCars } from "../../redux/carsSlice";
import { selectCars, selectLoading, selectError } from "../../redux/selectors";
import CarCard from "../../components/CarCard/CarCard";
import styles from "./CatalogPage.module.css";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";
import FilterCars from "../../components/FilterCars/FilterCars";
import { useLocation } from "react-router-dom";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  });

  useEffect(() => {
    const initialFilters = {
      brand: "",
      price: "",
      mileageFrom: "",
      mileageTo: "",
    };

    dispatch(resetCars());
    setFilters(initialFilters);
    setPage(1);

    dispatch(fetchCars({ page: 1, filters: initialFilters })).then((action) => {
      const data = action.payload;
      if (data?.totalPages) {
        setTotalPages(data.totalPages);
      }
    });
  }, [location.key, dispatch]);

  useEffect(() => {
    if (
      page === 1 &&
      filters.brand === "" &&
      filters.price === "" &&
      filters.mileageFrom === "" &&
      filters.mileageTo === ""
    ) {
      return;
    }
    dispatch(fetchCars({ page, filters })).then((action) => {
      const data = action.payload;
      if (data?.totalPages) {
        setTotalPages(data.totalPages);
      }
    });
  }, [dispatch, page, filters]);

  const handleApplyFilters = (newFilters) => {
    dispatch(resetCars());
    setFilters(newFilters);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasMore = totalPages ? page < totalPages : true;

  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      <FilterCars onApplyFilters={handleApplyFilters} />

      <div className={styles.cardsContainer}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {cars.length > 0 && hasMore && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default CatalogPage;
