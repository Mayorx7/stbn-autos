import CarView from "@/components/car/car-view";
import { routes } from "@/config/routes";
import { MOCK_CARS } from "@/lib/mock-data";
import { Navigate, useParams } from "react-router-dom";

const CarPage = () => {
  const { slug: rawSlug } = useParams();
  const slug = rawSlug ? decodeURIComponent(rawSlug) : "";
  if (!slug) return <Navigate to="/inventory" replace />;

  const car = MOCK_CARS.find((c) => c.slug === slug);

  if (!car) return <Navigate to="/inventory" replace />;
  if (car.status === "SOLD") {
    return <Navigate to={routes.notAvailable(slug)} replace />;
  }

  return <CarView {...car} />;
};

export default CarPage;
