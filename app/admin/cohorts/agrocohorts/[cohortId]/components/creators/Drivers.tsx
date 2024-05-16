import React, { FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus, X } from "lucide-react";

import RevenueDriversForm from "./revenue-drivers-form";
import RevenueShareDriversForm from "./revenue-share-drivers-form";
import {
  RevenueDriverResponse,
  RevenueShareDriverResponse,
} from "@/types/types";
import {
  createRevenueDriver,
  createRevenueShareDriver,
  getAllRevenueDrivers,
  getAllRevenueDriversByCohortId,
  getAllRevenueShareDrivers,
  getAllRevenueShareDriversByCohortId,
} from "@/actions/drivers-action";
import toast from "react-hot-toast";

type DriversProps = {
  cohortId: number;
};
const Drivers: FC<DriversProps> = ({ cohortId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenShare, setIsOpenShare] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [revenueShareDrivers, setRevenueShareDrivers] = useState<
    RevenueShareDriverResponse[]
  >([]);
  const [revenueDrivers, setRevenueDrivers] = useState<RevenueDriverResponse[]>(
    []
  );
  const [revenueShareDriversByCohortId, setRevenueShareDriversByCohortId] =
    useState<RevenueShareDriverResponse[]>([]);
  const [revenueDriversByCohortId, setRevenueDriversByCohortId] = useState<
    RevenueDriverResponse[]
  >([]);

  const [revenueShareDriver, setRevenueShareDriver] =
    useState<RevenueShareDriverResponse>();
  const [revenueDriver, setRevenueDriver] = useState<RevenueDriverResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllRevenueShareDrivers();
        setRevenueShareDrivers(res);
        const res2 = await getAllRevenueDrivers();
        setRevenueDrivers(res2);
        const res3 = await getAllRevenueShareDriversByCohortId(cohortId);
        setRevenueShareDriversByCohortId(res3);
        const res4 = await getAllRevenueDriversByCohortId(cohortId);
        setRevenueDriversByCohortId(res4);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated]);

  const AddRevenueDriverFromDefault = async (data: RevenueDriverResponse) => {
    try {
      setLoading(true);
      await createRevenueDriver({
        description: data.description,
        endingMonth: data.endingMonth,
        growthRate: data.growthRate,
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

  const AddRevenueShareDriverFromDefault = async (
    data: RevenueShareDriverResponse
  ) => {
    try {
      setLoading(true);
      await createRevenueShareDriver({
        description: data.description,
        months: data.months,
        type: data.type,
        receiptsRate: data.receiptsRate,
        variableTypePhase: data.variableTypePhase,
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
              Default Revenue Drivers
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
                Description
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Ending Month
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Growth Rate
              </div>
            </div>
          </div>
          <CollapsibleContent className="space-y-2">
            {revenueDrivers.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid grid-cols-3 gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.description}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.endingMonth} Months
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.growthRate}%
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => AddRevenueDriverFromDefault(item)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={isOpenShare}
          onOpenChange={setIsOpenShare}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-1">
            <h4 className="text-sm font-semibold text-cyan-500">
              Default Revenue Share Drivers
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid grid-cols-5 gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Description
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Type
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Variable Type Phase
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Months
              </div>
              <div className="rounded-md border px-4 py-2 font-semibold bg-gray-100 text-sm shadow-sm">
                Rate
              </div>
            </div>
          </div>
          <CollapsibleContent className="space-y-2">
            {revenueShareDrivers.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid grid-cols-5 gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.description}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.type}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.variableTypePhase}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.months} {item.months === 0 ? "" : "Months"}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.receiptsRate}%
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => AddRevenueShareDriverFromDefault(item)}
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
            <h4 className="text-sm font-semibold">Monthly Revenue Drivers</h4>
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
                Description
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Ending Month
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Growth Rate
              </div>
            </div>
            <Button
              size="sm"
              className="bg-cyan-500"
              onClick={() => {
                setRevenueDriver(undefined);
                setAddNew("revenueDrivers");
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CollapsibleContent className="space-y-2">
            {revenueDriversByCohortId.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid grid-cols-3 gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.description}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.endingMonth} Months
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.growthRate}%
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRevenueDriver(item);
                    setAddNew("revenueDrivers");
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
          {addNew === "revenueDrivers" && (
            <RevenueDriversForm
              cohortId={cohortId}
              setAddNew={setAddNew}
              revenueDriver={revenueDriver}
              updated={updated}
              setUpdated={setUpdated}
              setLoading={setLoading}
              loading={loading}
            />
          )}
        </Collapsible>
        <Collapsible
          open={isOpenShare}
          onOpenChange={setIsOpenShare}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-1">
            <h4 className="text-sm font-semibold">
              Monthly Revenue Share Drivers
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid grid-cols-5 gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Description
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Type
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Variable Type Phase
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Months
              </div>
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Rate
              </div>
            </div>
            <Button
              size="sm"
              className="bg-cyan-500"
              onClick={() => {
                setRevenueShareDriver(undefined);
                setAddNew("revenueShareDrivers");
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CollapsibleContent className="space-y-2">
            {revenueShareDriversByCohortId.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid grid-cols-5 gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.description}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.type}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.variableTypePhase}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.months} {item.months === 0 ? "" : "Months"}
                  </div>
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.receiptsRate}%
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRevenueShareDriver(item);
                    setAddNew("revenueShareDrivers");
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
          {addNew === "revenueShareDrivers" && (
            <RevenueShareDriversForm
              cohortId={cohortId}
              setAddNew={setAddNew}
              revenueShareDriver={revenueShareDriver}
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

export default Drivers;
