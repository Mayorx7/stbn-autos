"use client";
import { AwaitedPageProps, FilterOptions, TaxonomyFiltersProps } from "@/config/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Select } from "../ui/select";
// TODO: Integrate with Supabase for taxonomy data
// import { endpoints } from "@/config/endpoints";
// import { api } from "@/lib/api-client";
import { MOCK_CARS } from "@/lib/mock-data";


const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { searchParams, handleChange } = props;

  const [makes, setMakes] = useState<FilterOptions<string, string>>([]);
  const [model, setmodel] = useState<FilterOptions<string, string>>([]);
  const [modelVariant, setmodelVariant] = useState<
    FilterOptions<string, string>
  >([]);

 useEffect(() => {
		// TODO: Integrate with Supabase for taxonomy data
		// (async function fetchMakesOptions() {
		// 	const params = new URLSearchParams();
		// 	for (const [k, v] of Object.entries(
		// 		searchParams as Record<string, string>,
		// 	)) {
		// 		if (v) params.set(k, v as string);
		// 	}

		// 	const url = new URL(endpoints.taxonomy, window.location.href);

		// 	url.search = params.toString();

		// 	const data = await api.get<{
		// 		makes: FilterOptions<string, string>;
		// 		models: FilterOptions<string, string>;
		// 		modelVariants: FilterOptions<string, string>;
		// 	}>(url.toString());

		// 	setMakes(data.makes);
		// 	setmodel(data.models);
		// 	setmodelVariant(data.modelVariants);
		// })();

		// Temporary mock - use brands from mock data
		const makeNames = [...new Set(MOCK_CARS.map((car) => car.make.name))].sort();
		setMakes(makeNames.map((name) => ({ label: name, value: name })));
		const selectedMake = searchParams?.make as string | undefined;
		const matchingCars = selectedMake ? MOCK_CARS.filter((car) => car.make.name === selectedMake) : MOCK_CARS;
		const models = [...new Set(matchingCars.map((car) => car.title.replace(/^\d{4}\s+/, "").replace(new RegExp(`^${car.make.name}\\s+`), "")))].sort();
		setmodel(models.map((name) => ({ label: name, value: name })));
		setmodelVariant([]);
	}, [searchParams]);

  
  return (
    <>
      <Select
        label="Make"
        name="make"
        value={(searchParams?.make as string) || ""}
        options={makes}
        onChange={handleChange}
      />
      <Select
        label="Model"
        name="model"
        value={(searchParams?.model as string) || ""}
        options={model}
        onChange={handleChange}
        disabled={!model.length}
      />
      <Select
        label="Model Variant"
        name="modelVariant"
        value={(searchParams?.modelVariant as string) || ""}
        options={modelVariant}
        onChange={handleChange}
        disabled={!modelVariant.length}
      />
    </>
  );
};

export default TaxonomyFilters;
