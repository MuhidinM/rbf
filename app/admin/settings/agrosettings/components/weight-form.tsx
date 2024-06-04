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
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  accountBalance: z.coerce.number(),
  accountDuration: z.coerce.number(),
  forecastedAnnualIncome: z.coerce.number(),
  forecastedTotalAnnualFarmIncome: z.coerce.number(),
  forecastedTotalAnnualNonFarmIncome: z.coerce.number(),
  asset: z.coerce.number(),
  literacy: z.coerce.number(),
  behavior: z.coerce.number(),
  experience: z.coerce.number(),
});

const WeightForm = () => {
  const [errorAccount, setErrorAccount] = useState("");
  const [errorFarming, setErrorFarming] = useState("");
  const [errorSocial, setErrorSocial] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountBalance: 35,
      accountDuration: 15,
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
      accountBalance,
      accountDuration,
      forecastedAnnualIncome,
      forecastedTotalAnnualFarmIncome,
      forecastedTotalAnnualNonFarmIncome,
      asset,
      literacy,
      behavior,
      experience,
    } = data;

    const accountTotal = accountBalance + accountDuration;

    const farmingTotal =
      forecastedAnnualIncome +
      forecastedTotalAnnualFarmIncome +
      forecastedTotalAnnualNonFarmIncome +
      asset;

    const socialTotal = literacy + behavior + experience;

    if (accountTotal !== 50)
      setErrorAccount("The sum for Accounts must be 50!");
    if (farmingTotal !== 30)
      setErrorFarming("The sum for farmer business growth must be 30!");
    if (socialTotal !== 20)
      setErrorSocial("The sum for social capital must be 20!");

    if (accountTotal === 30) {
      setErrorAccount("");
    }
    if (farmingTotal === 20) {
      setErrorSocial("");
    }
    if (socialTotal === 20) {
      setErrorSocial("");
    }

    // console.log("Form submitted with data:", data);
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <div className="text-red-500">{errorAccount}</div>
            <FormField
              control={form.control}
              name="accountBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Balance</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Duration</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
        <Separator />
        <Button type="submit" className="flex bg-cyan-500 hover:bg-cyan-600">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default WeightForm;
