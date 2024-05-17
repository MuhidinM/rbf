import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Edit, Plus } from "lucide-react";
import { AccountResponse } from "@/types/types";
import {
  createData,
  getAll,
  getAccountDurationById,
} from "@/actions/agro-setting";
import AccountForm from "./forms/account-form";
import toast from "react-hot-toast";

const AccountDuration = ({ cohortId }: { cohortId: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [addNew, setAddNew] = useState("");
  // const [largestWeight, setLargestWeight] = useState<number>(0);
  const [accountDurations, setAccountDurations] = useState<AccountResponse[]>(
    []
  );
  const [accountDurationsDefault, setAccountDurationsDefault] = useState<
    AccountResponse[]
  >([]);
  const [accountDuration, setAccountDuration] = useState<AccountResponse>();
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAccountDurationById(
          `api/accountDurations/cohort/${cohortId}`
        );
        setAccountDurations(res);
        const res2 = await getAll("api/accountDurations/default");
        setAccountDurationsDefault(res2);
      } catch (error) {
        // @ts-ignore
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updated, cohortId]);

  const AddFromDefault = async (data: AccountResponse) => {
    try {
      setLoading(true);
      await createData("api/accountDurations", {
        maxMonth: data.maxMonth,
        minMonth: data.minMonth,
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

  // console.log("accountDuration", accountDuration);
  // console.log("accountDurationsDefault", accountDurationsDefault);
  // console.log("accountDurations", accountDurations);
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
              Default Account Duration
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="w-4 h-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid w-full grid-cols-4 gap-2">
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                Maximum Month
              </div>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                Minimum Month
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
            {accountDurationsDefault.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid w-full grid-cols-4 gap-2">
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.maxMonth}
                  </div>
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.minMonth}
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
            <h4 className="text-sm font-semibold">Account Duration</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="w-4 h-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex space-x-2">
            <div className="grid w-full grid-cols-4 gap-2">
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                Maximum Month
              </div>
              <div className="px-4 py-2 text-sm font-semibold bg-gray-100 border rounded-md shadow-sm">
                Minimum Month
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
                setAccountDuration(undefined);
                setAddNew("returnCapTable");
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <CollapsibleContent className="space-y-2">
            {accountDurations.map((item) => (
              <div className="flex space-x-2" key={item.id}>
                <div className="grid w-full grid-cols-4 gap-2">
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.maxMonth}
                  </div>
                  <div className="px-4 py-2 font-mono text-sm border rounded-md shadow-sm">
                    {item.minMonth}
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
                    setAccountDuration(item);
                    setAddNew("returnCapTable");
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CollapsibleContent>
          {addNew === "returnCapTable" && (
            <AccountForm
              cohortId={cohortId}
              setAddNew={setAddNew}
              updated={updated}
              setUpdated={setUpdated}
              setLoading={setLoading}
              loading={loading}
              agroData={accountDuration}
              largestWeight={8}
              type="api/accountDurations"
            />
          )}
        </Collapsible>
      </div>
    </>
  );
};

export default AccountDuration;
