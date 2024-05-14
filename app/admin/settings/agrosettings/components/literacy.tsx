import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus } from "lucide-react";
import { SocialResponse } from "@/types/types";
import AgroForm from "./agro-form";
import { getAll } from "@/actions/farmerBusinessGrowth";

const Literacy = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [largestWeight, setLargestWeight] = useState<number>(0);
  const [literacies, setLiteracies] = useState<SocialResponse[]>([]);
  const [literacy, setLiteracy] = useState<SocialResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAll("api/educations/default");
        setLiteracies(res);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated]);
  // console.log(Literacies);
  return (
    <div className="grid w-full gap-4">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between px-1 space-x-4">
          <h4 className="text-sm font-semibold">Forecasted Annual Income</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="w-4 h-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex space-x-2">
          <div className="grid w-full grid-cols-2 gap-2">
            <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
              Name
            </div>
            <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
              Description
            </div>
          </div>
          <Button
            size="icon"
            className="bg-cyan-500"
            disabled={loading}
            onClick={() => {
              setLiteracy(undefined);
              setAddNew("returnCapTable");
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <CollapsibleContent className="space-y-2">
          {literacies && literacies.length > 0 ? (
            literacies.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid w-full grid-cols-2 gap-2">
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.name}
                  </div>
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.description}
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  disabled={loading}
                  onClick={() => {
                    setLiteracy(item);
                    setAddNew("returnCapTable");
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex justify-center mx-auto">No data available</div>
          )}
        </CollapsibleContent>
        {/* {addNew === "returnCapTable" && (
          <AgroForm
            setAddNew={setAddNew}
            updated={updated}
            setUpdated={setUpdated}
            setLoading={setLoading}
            loading={loading}
            agroData={literacy}
            largestWeight={8}
            type="api/annualFarmingIncomes"
          />
        )} */}
      </Collapsible>
    </div>
  );
};

export default Literacy;
