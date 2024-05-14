import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  forecastedAnnualIncome: z.coerce.number(),
  forecastedTotalAnnualFarmIncome: z.coerce.number(),
  forecastedTotalAnnualNonFarmIncome: z.coerce.number(),
  asset: z.coerce.number(),
  literacy: z.coerce.number(),
  behavior: z.coerce.number(),
  experience: z.coerce.number(),
});

const WeightForm = () => {
  const [errorFarming, setErrorFarming] = useState("");
  const [errorSocial, setErrorSocial] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      forecastedAnnualIncome: 10,
      forecastedTotalAnnualFarmIncome: 8,
      forecastedTotalAnnualNonFarmIncome: 4,
      asset: 8,
      literacy: 5,
      behavior: 8,
      experience: 7,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    const {
      forecastedAnnualIncome,
      forecastedTotalAnnualFarmIncome,
      forecastedTotalAnnualNonFarmIncome,
      asset,
      literacy,
      behavior,
      experience,
    } = data;

    const firstFourTotal =
      forecastedAnnualIncome +
      forecastedTotalAnnualFarmIncome +
      forecastedTotalAnnualNonFarmIncome +
      asset;
    const nextThreeTotal = literacy + behavior + experience;
    if (firstFourTotal !== 30)
      setErrorFarming(
        "The sum for farmer business growth must not be greater than 30!"
      );
    if (nextThreeTotal !== 20)
      setErrorSocial(
        "The sum for farmer business growth must not be greater than 20!"
      );

    if (firstFourTotal === 30) {
      setErrorFarming("");
    }
    if (nextThreeTotal === 20) {
      setErrorSocial("");
    }

    // console.log("Form submitted with data:", data);
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <div className="text-red-500">{errorFarming}</div>
            <FormField
              control={form.control}
              name="forecastedAnnualIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forecasted Annual Income</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="forecastedTotalAnnualFarmIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forecasted Total Annual Farm Income</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="forecastedTotalAnnualNonFarmIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forecasted Total Annual Non Farm Income</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="asset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <div className="text-red-500">{errorSocial}</div>
            <FormField
              control={form.control}
              name="literacy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Literacy</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="behavior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behavior</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default WeightForm;
