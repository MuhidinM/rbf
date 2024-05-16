import React, { FC } from "react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createReturnCapTable,
  deleteReturnCapTable,
  editReturnCapTable,
} from "@/actions/cap-table-actions";
import { CapTableResponse } from "@/types/types";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Check, Trash, X } from "lucide-react";

const formSchema = z.object({
  month: z.coerce.number().min(1).max(50),
  fixedRevenueShareRate: z.coerce.number().min(1).max(50),
  variableRevenueShareRate: z.coerce.number().min(1).max(50),
  cohortId: z.coerce.number().optional(),
});

type CapTableFromProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  capTable: CapTableResponse | undefined;
  cohortId: number;
};

const CapTableFrom: FC<CapTableFromProps> = ({
  setAddNew,
  capTable,
  updated,
  setUpdated,
  setLoading,
  loading,
  cohortId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: capTable
      ? {
          month: capTable.month,
          fixedRevenueShareRate: capTable.fixedRevenueShareRate,
          variableRevenueShareRate: capTable.variableRevenueShareRate,
          cohortId: cohortId,
        }
      : {
          month: 0,
          fixedRevenueShareRate: 0,
          variableRevenueShareRate: 0,
          cohortId: cohortId,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      capTable
        ? await editReturnCapTable(values, capTable.id)
        : await createReturnCapTable(values);
      setUpdated(!updated);
      toast.success(capTable ? "Updated" : "Return Cap Table Created");
      setAddNew("");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      capTable && (await deleteReturnCapTable(capTable.id));
      setUpdated(!updated);
      toast.success(capTable ? "Updated" : "Removed");
      setAddNew("");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-1 space-x-2 w-full">
            <div className="grid grid-cols-3 gap-2 w-full">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fixedRevenueShareRate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Fixed Revenue Share Rate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variableRevenueShareRate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Variable Revenue Share Rate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              size="icon"
              type="submit"
              disabled={loading}
              variant="outline"
            >
              <Check className="h-4 w-4" />
            </Button>
            {capTable && (
              <Button
                size="icon"
                disabled={loading}
                type="button"
                variant="destructive"
                onClick={() => onDelete()}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              disabled={loading}
              type="button"
              variant="outline"
              onClick={() => setAddNew("")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CapTableFrom;
