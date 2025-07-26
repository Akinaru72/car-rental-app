import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

import Navigation from "../Navigation/Navigation";
import Loader from "../../components/Loader/Loader";

import css from "./App.module.css";

const Homepage = lazy(() => import("../../pages/Homepage/Homepage"));
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const CarDetailsPage = lazy(() =>
  import("../../pages/CarDetailsPage/CarDetailsPage")
);

const App = () => {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
