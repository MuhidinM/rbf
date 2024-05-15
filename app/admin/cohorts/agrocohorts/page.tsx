"use client";

import { CohortResponse, CohortType } from "@/types/types";
import CohortClient from "./components/client";
import { useEffect, useMemo, useState } from "react";
import { getAllCohorts } from "@/actions/cohorts-actions";

const Page = () => {
  const [cohorts, setCohorts] = useState<CohortResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllCohorts();
        // Check if the response is an array before mapping
        if (Array.isArray(res)) {
          setCohorts(res);
        } else {
          throw new Error("Invalid data format: expected an array");
        }
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updated]);

  const formattedclients = useMemo(() => {
    return cohorts.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      maxFacilityTerm: item.maxFacilityTerm,
      createdDate: item.createdDate,
      updatedAt: item.updatedAt,
    }));
  }, [cohorts]);
  return (
    <div>
      <CohortClient data={formattedclients} />
    </div>
  );
};

export default Page;
