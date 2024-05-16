import {
  createRevenueProjectionType,
  deleteRevenueProjectionType,
  editRevenueProjectionType,
} from "@/actions/types-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RevenueProjectionTypeResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trash, X } from "lucide-react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  type: z.string().min(1).max(50),
  cohortId: z.coerce.number().optional(),
});

type ProjectionTypeFormProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  revenueProjectionType: RevenueProjectionTypeResponse | undefined;
  cohortId: number;
};

const ProjectionTypeForm: FC<ProjectionTypeFormProps> = ({
  setAddNew,
  revenueProjectionType,
  updated,
  setUpdated,
  setLoading,
  loading,
  cohortId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: revenueProjectionType
      ? {
          type: revenueProjectionType.type,
          cohortId: revenueProjectionType.cohortId,
        }
      : {
          type: "",
          cohortId: cohortId,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      revenueProjectionType
        ? await editRevenueProjectionType(values, revenueProjectionType.id)
        : await createRevenueProjectionType(values);
      setUpdated(!updated);
      toast.success(
        revenueProjectionType ? "Updated" : "Revenue Projection Type Created"
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
      revenueProjectionType &&
        (await deleteRevenueProjectionType(revenueProjectionType.id));
      setUpdated(!updated);
      toast.success(revenueProjectionType ? "Updated" : "Removed");
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
            <div className="grid gap-2 w-full">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Projection Type" {...field} />
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
            {revenueProjectionType && (
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

export default ProjectionTypeForm;
