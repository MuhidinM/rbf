import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus, X } from "lucide-react";
// import RiskForm from "./risk-form";
import { RiskResponse } from "@/types/types";
import { getAllRisks } from "@/actions/risk-action";
import { Separator } from "@/components/ui/separator";
import WeightFormGeneral from "./weight-form-general";
import WeightForm from "./weight-form";

const Weight1 = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [risks, setRisks] = useState<RiskResponse[]>([]);
  const [risk, setRisk] = useState<RiskResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="grid gap-4 w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
        <div className="flex items-center justify-between space-x-4 px-1">
          <h4 className="text-sm font-semibold">Weight (50%)</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex space-x-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              Farmer Business Growth
            </div>
            <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
              Social Capital
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
        <CollapsibleContent className="space-y-2 mt-2">
          <div className="flex space-x-2">
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                30 Percent
              </div>
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                20 Percent
              </div>
            </div>
            <Button size="icon" variant="outline" disabled={loading}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CollapsibleContent>
        <div className="mt-2">
          {addNew === "risks" && <WeightFormGeneral />}
        </div>
      </Collapsible>
      <Separator />
      <WeightForm />
    </div>
  );
};

export default Weight1;
