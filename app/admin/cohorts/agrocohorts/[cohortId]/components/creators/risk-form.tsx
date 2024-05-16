import { createRisk, deleteRisk, editRisk } from "@/actions/risk-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trash, X } from "lucide-react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { RiskResponse } from "@/types/types";

const formSchema = z.object({
  type: z.string().min(1).max(50),
  percentage: z.coerce.number().min(1).max(500),
  cohortId: z.coerce.number().optional(),
});

type RiskFormProps = {
  updated: boolean;
  loading: boolean;
  setUpdated(updated: boolean): void;
  setLoading(loading: boolean): void;
  setAddNew(newState: string): void;
  risk: RiskResponse | undefined;
  cohortId: number;
};

const RiskForm: FC<RiskFormProps> = ({
  setAddNew,
  risk,
  updated,
  setUpdated,
  setLoading,
  loading,
  cohortId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: risk
      ? {
          type: risk.type,
          percentage: risk.percentage,
          cohortId: risk.cohortId,
        }
      : {
          type: "",
          percentage: 0,
          cohortId: cohortId,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      risk ? await editRisk(values, risk.id) : await createRisk(values);
      setUpdated(!updated);
      toast.success(risk ? "Updated" : "Risk Created");
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
      risk && (await deleteRisk(risk.id));
      setUpdated(!updated);
      toast.success(risk ? "Updated" : "Removed");
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
            <div className="grid grid-cols-2 gap-2 w-full">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Risk Type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Percentage"
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
            {risk && (
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

export default RiskForm;
