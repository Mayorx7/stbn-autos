import { MultiStepFormSchema } from "@/app/schemas/form.schema";
import SelectDate from "@/components/reserve/SelectDate";
import SubmitDetails from "@/components/reserve/SubmitDetails";
import Welcome from "@/components/reserve/Welcome";
import { MultiStepFormEnum } from "@/config/types";
import { MOCK_CARS } from "@/lib/mock-data";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

const MAP_STEP_TO_COMPONENT = {
  [MultiStepFormEnum.WELCOME]: Welcome,
  [MultiStepFormEnum.SELECT_DATE]: SelectDate,
  [MultiStepFormEnum.SUBMIT_DETAILS]: SubmitDetails,
};

const ReservePage = () => {
  const { slug } = useParams();
  const [urlParams] = useSearchParams();
  const searchParams = Object.fromEntries(urlParams.entries());
  const params = { slug };
  const step = searchParams.step;

  const { data, success, error } = MultiStepFormSchema.safeParse({
    slug,
    step: Number(step),
  });

  if (!success) {
    console.error("Invalid data:", error);
    return <Navigate to="/inventory" replace />;
  }

  const car = MOCK_CARS.find((c) => c.slug === data.slug);

  if (!car) {
    return <Navigate to="/inventory" replace />;
  }

  const Component = MAP_STEP_TO_COMPONENT[data.step];
  return (
    <Component
      searchParams={searchParams}
      car={car}
      params={params}
    />
  );
};

export default ReservePage;
