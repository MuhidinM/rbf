import {
  createRevenueDriver,
  deleteRevenueDriver,
  editRevenueDriver,
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
import { RevenueDriverResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trash, X } from "lucide-react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  description: z.string().min(1).max(50),
  endingMonth: z.coerce.number().min(1).max(50),
  growthRate: z.coerce.number().min(1).max(50),
  cohortId: z.coerce.number().optional(),
});

type RevenueDriversFormProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  revenueDriver: RevenueDriverResponse | undefined;
  cohortId: number;
};

const RevenueDriversForm: FC<RevenueDriversFormProps> = ({
  setAddNew,
  revenueDriver,
  updated,
  setUpdated,
  setLoading,
  loading,
  cohortId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: revenueDriver
      ? {
          description: revenueDriver.description,
          endingMonth: revenueDriver.endingMonth,
          growthRate: revenueDriver.growthRate,
          cohortId: revenueDriver.cohortId,
        }
      : {
          description: "",
          endingMonth: 0,
          growthRate: 0,
          cohortId: cohortId
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      revenueDriver
        ? await editRevenueDriver(values, revenueDriver.id)
        : await createRevenueDriver(values);
      setUpdated(!updated);
      toast.success(revenueDriver ? "Updated" : "Revenue Driver Created");
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
      revenueDriver && (await deleteRevenueDriver(revenueDriver.id));
      setUpdated(!updated);
      toast.success(revenueDriver ? "Updated" : "Removed");
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
                name="endingMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ending Month"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="growthRate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Growth Rate"
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
            {revenueDriver && (
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
              variant="outline"
              type="button"
              disabled={loading}
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

export default RevenueDriversForm;
