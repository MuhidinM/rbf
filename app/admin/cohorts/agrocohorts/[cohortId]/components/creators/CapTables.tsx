import React, { FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus } from "lucide-react";

import { CapTableResponse } from "@/types/types";
import CapTableFrom from "./cap-table-form";
import {
  createReturnCapTable,
  getAllReturnCapTables,
  getAllReturnCapTablesByCohortId,
} from "@/actions/cap-table-actions";
import toast from "react-hot-toast";

type CapTableProps = {
  cohortId: number;
};
const CapTables: FC<CapTableProps> = ({ cohortId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [capTables, setCapTables] = useState<CapTableResponse[]>([]);
  const [capTablesDefault, setCapTablesDefault] = useState<CapTableResponse[]>(
    []
  );
  const [capTable, setCapTable] = useState<CapTableResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllReturnCapTablesByCohortId(cohortId);
        setCapTables(res);
        const res2 = await getAllReturnCapTables();
        setCapTablesDefault(res2);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated, cohortId]);

  const AddFromDefault = async (data: CapTableResponse) => {
    try {
      setLoading(true);
      await createReturnCapTable({
        month: data.month,
        fixedRevenueShareRate: data.fixedRevenueShareRate,
        variableRevenueShareRate: data.variableRevenueShareRate,
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
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-1">
            <h4 className="text-sm font-semibold text-cyan-500">
              Default Cap Table
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Month
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Fixed Revenue Rate
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Variable Revenue Rate
              </div>
            </div>
          </div>
          <CollapsibleContent className="space-y-2">
            {capTablesDefault.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid grid-cols-3 gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.month} Months
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.fixedRevenueShareRate}x of Principal
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.variableRevenueShareRate}x of Principal
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
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-1">
            <h4 className="text-sm font-semibold">Return Cap Table</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Month
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Fixed Revenue Rate
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Variable Revenue Rate
              </div>
            </div>
            <Button
              size="sm"
              className="bg-cyan-500"
              disabled={loading}
              onClick={() => {
                setCapTable(undefined);
                setAddNew("returnCapTable");
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CollapsibleContent className="space-y-2">
            {capTables.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid grid-cols-3 gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.month} Months
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.fixedRevenueShareRate}x of Principal
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.variableRevenueShareRate}x of Principal
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={loading}
                  onClick={() => {
                    setCapTable(item);
                    setAddNew("returnCapTable");
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
          {addNew === "returnCapTable" && (
            <CapTableFrom
              cohortId={cohortId}
              setAddNew={setAddNew}
              updated={updated}
              setUpdated={setUpdated}
              setLoading={setLoading}
              loading={loading}
              capTable={capTable}
            />
          )}
        </Collapsible>
      </div>
    </>
  );
};

export default CapTables;
