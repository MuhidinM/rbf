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
import { AccountResponse } from "@/types/types";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Check, Trash, X } from "lucide-react";
import { createData, deleteWithId, editData } from "@/actions/agro-setting";

type AgroFromProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  agroData: AccountResponse | undefined;
  largestWeight: number;
  type: string;
  cohortId: number;
};

const AccountForm: FC<AgroFromProps> = ({
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
    maxMonth: z.coerce.number(),
    minMonth: z.coerce.number(),
    minWeight: z.coerce.number(),
    description: z.coerce.string(),
    updatedAt: z.coerce.string(),
    cohortId: z.coerce.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: agroData
      ? {
          maxMonth: agroData.maxMonth,
          minMonth: agroData.minMonth,
          minWeight: agroData.minWeight,
          description: agroData.description,
          cohortId: cohortId,
        }
      : {
          maxMonth: 0,
          minMonth: 0,
          minWeight: 0,
          description: "",
          cohortId: cohortId,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      setLoading(true);
      agroData
        ? await editData(`${type}/${agroData.id}`, values)
        : await createData(type, values);
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
            <div className={"grid w-full gap-2 grid-cols-4"}>
              <FormField
                control={form.control}
                name="minMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Balance Threshold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxMonth"
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

export default AccountForm;
