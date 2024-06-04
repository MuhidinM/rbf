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
    <div className="grid w-full gap-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
        <div className="flex items-center justify-between px-1 space-x-4">
          <h4 className="text-sm font-semibold">Weight (100%)</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="w-4 h-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex space-x-2">
          <div className="grid w-full grid-cols-3 gap-2">
            <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
              Saving Culture
            </div>
            <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
              Farmer Business Growth
            </div>
            <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
              Social Capital
            </div>
          </div>
        </div>
        <CollapsibleContent className="mt-2 space-y-2">
          <div className="flex space-x-2">
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                50 Percent
              </div>
              <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                30 Percent
              </div>
              <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                20 Percent
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <WeightForm />
    </div>
  );
};

export default Weight1;
