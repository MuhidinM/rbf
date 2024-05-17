import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus } from "lucide-react";
import { Response } from "@/types/types";
import { create, getAll, getFarmingById } from "@/actions/agro-setting";
import toast from "react-hot-toast";
import FarmingForm from "./forms/farming-form";

const AccountBalance = ({ cohortId }: { cohortId: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  // const [largestWeight, setLargestWeight] = useState<number>(0);
  const [accountBalances, setAccountBalances] = useState<Response[]>([]);
  const [accountBalancesDefault, setAccountBalancesDefault] = useState<
    Response[]
  >([]);
  const [accountBalance, setAccountBalance] = useState<Response>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getFarmingById(
          `api/averageDailyBalances/cohort/${cohortId}`
        );
        setAccountBalances(res);
        const res2 = await getAll("api/averageDailyBalances/default");
        setAccountBalancesDefault(res2);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated, cohortId]);

  const AddFromDefault = async (data: Response) => {
    try {
      setLoading(true);
      await create("api/averageDailyBalances", {
        balanceThreshold: data.balanceThreshold,
        minWeight: data.minWeight,
        description: data.description,
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

  // console.log("AccountBalance", AccountBalance);
  // console.log("AccountBalancesDefault", AccountBalancesDefault);
  // console.log("AccountBalances", AccountBalances);
  return (
    <>
      <div className="grid w-full gap-4">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between px-1 space-x-4">
            <h4 className="text-sm font-semibold">
              Default Average Daily Balance
            </h4>
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
                Balance Threshold
              </div>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                Minimum Weight
              </div>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                Description
              </div>
            </div>
          </div>
          <CollapsibleContent className="space-y-2">
            {accountBalancesDefault.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.balanceThreshold}
                  </div>
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.minWeight}
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
                    AddFromDefault(item);
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="grid w-full gap-4">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between px-1 space-x-4">
            <h4 className="text-sm font-semibold">Average Daily Balance</h4>
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
                Balance Threshold
              </div>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                Minimum Weight
              </div>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                Description
              </div>
            </div>
            <Button
              size="sm"
              className="bg-cyan-500"
              disabled={loading}
              onClick={() => {
                setAccountBalance(undefined);
                setAddNew("returnCapTable");
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <CollapsibleContent className="space-y-2">
            {accountBalances.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.balanceThreshold}
                  </div>
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.minWeight}
                  </div>
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.description}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={loading}
                  onClick={() => {
                    setAccountBalance(item);
                    setAddNew("returnCapTable");
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
          {addNew === "returnCapTable" && (
            <FarmingForm
              cohortId={cohortId}
              setAddNew={setAddNew}
              updated={updated}
              setUpdated={setUpdated}
              setLoading={setLoading}
              loading={loading}
              agroData={accountBalance}
              largestWeight={8}
              type="api/averageDailyBalances"
            />
          )}
        </Collapsible>
      </div>
    </>
  );
};

export default AccountBalance;
