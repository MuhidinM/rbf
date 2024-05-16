"use client";
import { AgroCohortResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { MainForm } from "./components/MainForm";
import { get } from "@/actions/agro-cohorts";

const SizePage = async ({ params }: { params: { cohortId: string } }) => {
  const [cohort, setCohort] = useState<AgroCohortResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await get(`api/cohorts/${Number(params.cohortId)}`);
        if (res && typeof res === "object") {
          setCohort(res);
        } else {
          console.error("Invalid data format received");
        }
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-col shadow">
      <div className="flex-1 p-8 pt-6 space-y-4">
        {/* <LevelForm initialData={cohort ? cohort : null} /> */}
        <MainForm initialData={cohort ? cohort : null} />
      </div>
    </div>
  );
};

export default SizePage;
