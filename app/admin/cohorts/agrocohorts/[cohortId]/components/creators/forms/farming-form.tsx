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
import { Response } from "@/types/types";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Check, Trash, X } from "lucide-react";
import { create, deleteWithId, edit } from "@/actions/agro-setting";
import { cn } from "@/lib/utils";

type AgroFromProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  agroData: Response | undefined;
  largestWeight: number;
  type: string;
  cohortId: number;
};

const FarmingForm: FC<AgroFromProps> = ({
  setAddNew,
  agroData,
  updated,
  setUpdated,
  setLoading,
  loading,
  largestWeight,
  type,
  cohortId,
}) => {
  const formSchema = z.object({
    balanceThreshold: z.coerce.number(),
    minWeight: z.coerce.number(),
    description: z.coerce.string(),
    updatedAt: z.coerce.string(),
    minBalanceThreshold: z.coerce.number(),
    cohortId: z.coerce.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: agroData
      ? {
          balanceThreshold: agroData.balanceThreshold,
          minWeight: agroData.minWeight,
          description: agroData.description,
          minBalanceThreshold: agroData.minBalanceThreshold || 0,
          cohortId: cohortId,
        }
      : {
          balanceThreshold: 0,
          minWeight: 0,
          minBalanceThreshold: 0,
          description: "",
          cohortId: cohortId,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      setLoading(true);
      const dataToSend =
        type === "api/assets"
          ? values
          : {
              balanceThreshold: values.balanceThreshold,
              minWeight: values.minWeight,
              description: values.description,
              updatedAt: values.updatedAt,
            };

      agroData
        ? await edit(`${type}/${agroData.id}`, dataToSend)
        : await create(type, dataToSend);
      setUpdated(!updated);
      toast.success(
        agroData ? "Updated Successfully!" : "Created Successfully!"
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
      agroData && (await deleteWithId(`${type}/${agroData.id}`));
      setUpdated(!updated);
      toast.success("Deleted Successfully!");
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
          <div className="flex flex-1 w-full space-x-2">
            <div
              className={cn(
                "grid w-full gap-2 ",
                type === "api/assets" ? "grid-cols-4" : "grid-cols-3"
              )}
            >
              <FormField
                control={form.control}
                name="balanceThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === "api/assets" && (
                <FormField
                  control={form.control}
                  name="minBalanceThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Min Balance Threshold"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
            </div>
            <Button
              size="icon"
              type="submit"
              disabled={loading}
              variant="outline"
            >
              <Check className="w-4 h-4" />
            </Button>
            {agroData && (
              <Button
                size="icon"
                disabled={loading}
                type="button"
                variant="destructive"
                onClick={() => onDelete()}
              >
                <Trash className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="icon"
              disabled={loading}
              type="button"
              variant="outline"
              onClick={() => setAddNew("")}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FarmingForm;
