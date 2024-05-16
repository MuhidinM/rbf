import React, { FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus, X } from "lucide-react";
import ShareTypeForm from "./share-type-form";
import ProjectionTypeForm from "./projection-type-form";
import {
  RevenueProjectionTypeResponse,
  RevenueShareTypeResponse,
} from "@/types/types";
import {
  createRevenueProjectionType,
  createRevenueShareType,
  getAllRevenueProjectionTypes,
  getAllRevenueProjectionTypesByCohortId,
  getAllRevenueShareTypes,
  getAllRevenueShareTypesByCohortId,
} from "@/actions/types-action";
import toast from "react-hot-toast";

type TypeProps = {
  cohortId: number;
};
const Types: FC<TypeProps> = ({ cohortId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenShare, setIsOpenShare] = useState(true);
  const [addNew, setAddNew] = useState("");
  const [revenueProjectionTypes, setRevenueProjectionTypes] = useState<
    RevenueProjectionTypeResponse[]
  >([]);
  const [revenueShareTypes, setRevenueShareTypes] = useState<
    RevenueShareTypeResponse[]
  >([]);
  const [
    revenueProjectionTypesByCohortId,
    setRevenueProjectionTypesByCohortId,
  ] = useState<RevenueProjectionTypeResponse[]>([]);
  const [revenueShareTypesByCohortId, setRevenueShareTypesByCohortId] =
    useState<RevenueShareTypeResponse[]>([]);

  const [revenueProjectionType, setRevenueProjectionType] =
    useState<RevenueProjectionTypeResponse>();
  const [revenueShareType, setRevenueShareType] =
    useState<RevenueShareTypeResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllRevenueProjectionTypes();
        setRevenueProjectionTypes(res);
        const res2 = await getAllRevenueShareTypes();
        setRevenueShareTypes(res2);
        const res3 = await getAllRevenueProjectionTypesByCohortId(cohortId);
        setRevenueProjectionTypesByCohortId(res3);
        const res4 = await getAllRevenueShareTypesByCohortId(cohortId);
        setRevenueShareTypesByCohortId(res4);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated]);

  const AddRevenueProjectionFromDefault = async (
    data: RevenueProjectionTypeResponse
  ) => {
    try {
      setLoading(true);
      await createRevenueProjectionType({
        type: data.type,
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

  const AddShareTypeFromDefault = async (data: RevenueShareTypeResponse) => {
    try {
      setLoading(true);
      await createRevenueShareType({
        type: data.type,
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
      <div className="grid md:grid-cols-2 gap-4 w-full border border-cyan-500 rounded p-3 mb-5">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-1">
            <h4 className="text-sm font-semibold text-cyan-500">
              Default Projections Type
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Projection Type
              </div>
            </div>
          </div>
          <CollapsibleContent className="space-y-2">
            {revenueProjectionTypes.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.type}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => AddRevenueProjectionFromDefault(item)}
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
              Default Share Type
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Share Type
              </div>
            </div>
          </div>
          <CollapsibleContent className="space-y-2">
            {revenueShareTypes.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.type}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => AddShareTypeFromDefault(item)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="grid md:grid-cols-2 gap-4 w-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-1">
            <h4 className="text-sm font-semibold">Revenue Projections Type</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Projection Type
              </div>
            </div>
            <Button
              size="sm"
              className="bg-cyan-500"
              onClick={() => {
                setRevenueProjectionType(undefined);
                setAddNew("projectionType");
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CollapsibleContent className="space-y-2">
            {revenueProjectionTypesByCohortId.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.type}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRevenueProjectionType(item);
                    setAddNew("projectionType");
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
          {addNew === "projectionType" && (
            <ProjectionTypeForm
              cohortId={cohortId}
              setAddNew={setAddNew}
              revenueProjectionType={revenueProjectionType}
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
            <h4 className="text-sm font-semibold">Revenue Share Type</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid gap-2 w-full">
              <div className="rounded-md border px-4 py-1 h-8 font-semibold bg-gray-100 text-sm shadow-sm">
                Share Type
              </div>
            </div>
            <Button
              size="sm"
              className="bg-cyan-500"
              onClick={() => {
                setRevenueShareType(undefined);
                setAddNew("shareType");
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <CollapsibleContent className="space-y-2">
            {revenueShareTypesByCohortId.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid gap-2 w-full">
                  <div className="rounded-md border px-4 py-1 h-8 font-mono text-sm shadow-sm">
                    {item.type}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRevenueShareType(item);
                    setAddNew("shareType");
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
          {addNew === "shareType" && (
            <ShareTypeForm
              cohortId={cohortId}
              setAddNew={setAddNew}
              revenueShareType={revenueShareType}
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

export default Types;
