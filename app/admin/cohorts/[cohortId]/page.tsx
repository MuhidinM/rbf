"use client";
import { getCohort } from "@/actions/cohorts-actions";
import { CohortResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { MainForm } from "./components/MainForm";

const SizePage = async ({ params }: { params: { cohortId: string } }) => {
  const [cohort, setCohort] = useState<CohortResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getCohort(Number(params.cohortId));
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
