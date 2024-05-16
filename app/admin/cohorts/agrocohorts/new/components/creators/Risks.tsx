import React, { FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus, X } from "lucide-react";
import RiskForm from "./risk-form";
import { RiskResponse } from "@/types/types";
import {
  createRisk,
  getAllRisks,
  getAllRisksByCohortId,
} from "@/actions/risk-action";
import toast from "react-hot-toast";

type RisksProps = {
  cohortId: number;
};
const Risks: FC<RisksProps> = ({ cohortId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [risks, setRisks] = useState<RiskResponse[]>([]);
  const [risksByCohortId, setRisksByCohortId] = useState<RiskResponse[]>([]);
  const [risk, setRisk] = useState<RiskResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllRisks();
        setRisks(res);
        const res2 = await getAllRisksByCohortId(cohortId);
        setRisksByCohortId(res2);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated]);

  const AddFromDefault = async (data: RiskResponse) => {
    try {
      setLoading(true);
      await createRisk({
        type: data.type,
        percentage: data.percentage,
        cohortId: cohortId,
      });
      setUpdated(!updated);
      toast.success("Added");
      setAddNew("");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid gap-4 w-full border border-cyan-500 rounded p-3 mb-5">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-[600px] space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-1">
            <h4 className="text-sm font-semibold text-cyan-500">
              Default Risk
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Risk Type
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Percentage
              </div>
            </div>
          </div>
          <CollapsibleContent className="space-y-2">
            {risks.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.type}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.percentage}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={loading}
                  onClick={() => AddFromDefault(item)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="grid gap-4 w-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-[600px] space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-1">
            <h4 className="text-sm font-semibold">Risk</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Risk Type
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Percentage
              </div>
            </div>
            <Button
              size="icon"
              disabled={loading}
              className="bg-cyan-500"
              onClick={() => {
                setRisk(undefined);
                setAddNew("risks");
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CollapsibleContent className="space-y-2">
            {risksByCohortId.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.type}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.percentage}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={loading}
                  onClick={() => {
                    setRisk(item);
                    setAddNew("risks");
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
          {addNew === "risks" && (
            <RiskForm
              cohortId={cohortId}
              setAddNew={setAddNew}
              risk={risk}
              updated={updated}
              setUpdated={setUpdated}
              setLoading={setLoading}
              loading={loading}
            />
          )}
        </Collapsible>
      </div>
    </>
  );
};

export default Risks;
