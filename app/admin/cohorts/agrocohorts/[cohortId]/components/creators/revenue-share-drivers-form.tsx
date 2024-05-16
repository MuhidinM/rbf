import {
  createRevenueShareDriver,
  deleteRevenueShareDriver,
  editRevenueShareDriver,
} from "@/actions/drivers-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RevenueShareDriverResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trash, X } from "lucide-react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  description: z.string().min(1).max(50),
  type: z.string().min(1).max(50),
  variableTypePhase: z.coerce.number().max(50),
  months: z.coerce.number().max(50),
  receiptsRate: z.coerce.number().min(1).max(50),
  cohortId: z.coerce.number().optional(),
});

type RevenueShareDriversFormProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  revenueShareDriver: RevenueShareDriverResponse | undefined;
  cohortId: number;
};

const RevenueShareDriversForm: FC<RevenueShareDriversFormProps> = ({
  setAddNew,
  revenueShareDriver,
  updated,
  setUpdated,
  setLoading,
  loading,
  cohortId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: revenueShareDriver
      ? {
          description: revenueShareDriver.description,
          type: revenueShareDriver.type,
          variableTypePhase: revenueShareDriver.variableTypePhase,
          months: revenueShareDriver.months,
          receiptsRate: revenueShareDriver.receiptsRate,
          cohortId: revenueShareDriver.cohortId,
        }
      : {
          description: "",
          type: "",
          variableTypePhase: 0,
          months: 0,
          receiptsRate: 0,
          cohortId: cohortId,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      revenueShareDriver
        ? await editRevenueShareDriver(values, revenueShareDriver.id)
        : await createRevenueShareDriver(values);
      setUpdated(!updated);
      toast.success(
        revenueShareDriver ? "Updated" : "Revenue Share Driver Created"
      );
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
      revenueShareDriver &&
        (await deleteRevenueShareDriver(revenueShareDriver.id));
      setUpdated(!updated);
      toast.success(revenueShareDriver ? "Updated" : "Removed");
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
            <div className="grid grid-cols-5 gap-2 w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variableTypePhase"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Variable Type Phase"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="months"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Months" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receiptsRate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Receipt Rate"
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
            {revenueShareDriver && (
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
              type="button"
              disabled={loading}
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

export default RevenueShareDriversForm;
