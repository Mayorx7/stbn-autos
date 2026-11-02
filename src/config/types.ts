import { ChangeEvent } from "react";
import { MockCar } from "@/lib/mock-data";

type Params = {
    [x: string]: string | string[];
}
export type PageProps = {
    params?: Promise<Params>;
    searchParams?: Promise<{[x: string]:string | string[]|undefined}>;
}

export type AwaitedPageProps =  {
    params?: Awaited<PageProps['params']>;
    searchParams?: Awaited<PageProps['searchParams']>;
}

export type CarWithImages = MockCar;

export enum MultiStepFormEnum {
    WELCOME = 1,
    SELECT_DATE = 2,
    SUBMIT_DETAILS = 3,
}

export interface Favourites {
    ids: number[]
}

export interface TaxonomyFiltersProps extends AwaitedPageProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export type FilterOptions<Ltype, VType> = Array<{ label: Ltype; value: VType }>;

export interface MultiStepsFormComponentProps extends AwaitedPageProps {
    car: MockCar;
}

export type PrevState  = {
    success: boolean;
    message: string;
}

export type CarKeys = keyof Pick<
  MockCar,
  | "id"
  | "title"
  | "vrm"
  | "year"
  | "colour"
  | "price"
  | "createdAt"
  | "views"
  | "status"
>;

export type MockCustomer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  status: string;
  bookingDate: string | null;
  createdAt: string;
  updatedAt: string;
  slug: string | null;
};

export type CustomerWithCar = MockCustomer & {
  classified: { title: string; vrm: string } | null;
};

export type CustomerKeys =
  | keyof Pick<
      MockCustomer,
      | "id"
      | "email"
      | "mobile"
      | "firstName"
      | "lastName"
      | "updatedAt"
      | "createdAt"
      | "status"
      | "bookingDate"
    >
  | "classified";