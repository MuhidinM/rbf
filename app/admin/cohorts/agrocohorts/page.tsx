"use client";

import { AgroCohortResponse } from "@/types/types";
import CohortClient from "./components/client";
import { useEffect, useMemo, useState } from "react";
import { getAll } from "@/actions/agro-cohorts";

const Page = () => {
  const [cohorts, setCohorts] = useState<AgroCohortResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAll("api/cohorts");
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

  const formattedCohorts = useMemo(() => {
    return cohorts.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      createdDate: item.createdDate,
      updatedAt: item.updatedAt,
    }));
  }, [cohorts]);
  return (
    <div>
      <CohortClient data={formattedCohorts} />
    </div>
  );
};

export default Page;
