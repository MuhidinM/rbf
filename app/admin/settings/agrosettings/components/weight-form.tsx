import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL_AGRO;

const formSchema = z.object({
  accountBalance: z.coerce.number(),
  accountDuration: z.coerce.number(),
  forecastedAnnualIncome: z.coerce.number(),
  forecastedTotalAnnualFarmIncome: z.coerce.number(),
  forecastedTotalAnnualNonFarmIncome: z.coerce.number(),
  asset: z.coerce.number(),
  literacy: z.coerce.number(),
  illiterate: z.coerce.number(),
  behavior: z.coerce.number(),
  moderateBehavior: z.coerce.number(),
  badBehavior: z.coerce.number(),
  experience: z.coerce.number(),
});

const WeightForm = () => {
  const [errorAccount, setErrorAccount] = useState("");
  const [errorFarming, setErrorFarming] = useState("");
  const [errorSocial, setErrorSocial] = useState("");
  const [maxEducation, setMaxEducation] = useState(0);
  const [maxBehavior, setMaxBehavior] = useState(0);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountBalance: 0,
      accountDuration: 0,
      forecastedAnnualIncome: 0,
      forecastedTotalAnnualFarmIncome: 0,
      forecastedTotalAnnualNonFarmIncome: 0,
      asset: 0,
      literacy: 0,
      illiterate: 0,
      behavior: 0,
      moderateBehavior: 0,
      badBehavior: 0,
      experience: 0,
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  useEffect(() => {
    fetch(`${API_URL}api/weights`)
      .then((response) => response.json())
      .then((data) => {
        const defaultValues = {
          accountBalance:
            data.find((item) => item.scoringDataType === "AVERAGEDAILYBALANCE")
              ?.weight || 0,
          accountDuration:
            data.find((item) => item.scoringDataType === "ACCOUNTAGE")
              ?.weight || 0,
          forecastedAnnualIncome:
            data.find(
              (item) => item.scoringDataType === "ANNUALFURTUFARMINGINCOME"
            )?.weight || 0,
          forecastedTotalAnnualFarmIncome:
            data.find((item) => item.scoringDataType === "ANNUALFARMINGINCOME")
              ?.weight || 0,
          forecastedTotalAnnualNonFarmIncome:
            data.find(
              (item) => item.scoringDataType === "ANNUALNONFARMINGINCOME"
            )?.weight || 0,
          asset:
            data.find((item) => item.scoringDataType === "ASSET")?.weight || 0,
          literacy:
            data.find((item) => item.scoringDataType === "LITERATE")?.weight ||
            0,
          behavior:
            data.find((item) => item.scoringDataType === "GOODBEHAVIOUR")
              ?.weight || 0,
          experience:
            data.find((item) => item.scoringDataType === "FARMINGEXPERIENCE")
              ?.weight || 0,
          badBehavior:
            data.find((item) => item.scoringDataType === "BADBEHAVIOUR")
              ?.weight || 0,
          moderateBehavior:
            data.find((item) => item.scoringDataType === "MODERATEBEHAVIOUR")
              ?.weight || 0,
          illiterate:
            data.find((item) => item.scoringDataType === "ILLITERATE")
              ?.weight || 0,
        };
        form.reset(defaultValues);
        setMaxEducation(defaultValues.literacy);
        setMaxBehavior(defaultValues.behavior);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching weights:", error));
  }, []);

  const onSubmit = async (data) => {
    const {
      accountBalance,
      accountDuration,
      forecastedAnnualIncome,
      forecastedTotalAnnualFarmIncome,
      forecastedTotalAnnualNonFarmIncome,
      asset,
      literacy,
      illiterate,
      moderateBehavior,
      badBehavior,
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
    if (accountTotal !== 50) {
      setErrorAccount("The sum for Accounts must be 50!");
      return;
    } else {
      setErrorAccount("");
    }

    if (farmingTotal !== 30) {
      setErrorFarming("The sum for farmer business growth must be 30!");
      return;
    } else {
      setErrorFarming("");
    }

    if (socialTotal !== 20) {
      setErrorSocial("The sum for social capital must be 20!");
      return;
    } else {
      setErrorSocial("");
    }

    if (illiterate >= maxEducation) {
      setErrorSocial("Illiterate weight must be less than literate");
      return;
    } else {
      setErrorSocial("");
    }
    if (moderateBehavior >= maxBehavior || badBehavior >= maxBehavior) {
      setErrorSocial(
        "Moderate behavior or Bad behavior weight must be less than Good behavior"
      );
      return;
    } else {
      setErrorSocial("");
    }

    const updateWeight = async (id, scoringDataType, weight) => {
      const response = await fetch(`${API_URL}api/weights/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scoringDataType, weight }),
      });
      return response.json();
    };

    try {
      const weights = await fetch(`${API_URL}api/weights`).then((res) =>
        res.json()
      );

      const updates = [
        { scoringDataType: "AVERAGEDAILYBALANCE", weight: accountBalance },
        { scoringDataType: "ACCOUNTAGE", weight: accountDuration },
        {
          scoringDataType: "ANNUALFURTUFARMINGINCOME",
          weight: forecastedAnnualIncome,
        },
        {
          scoringDataType: "ANNUALFARMINGINCOME",
          weight: forecastedTotalAnnualFarmIncome,
        },
        {
          scoringDataType: "ANNUALNONFARMINGINCOME",
          weight: forecastedTotalAnnualNonFarmIncome,
        },
        { scoringDataType: "ASSET", weight: asset },
        { scoringDataType: "FARMINGEXPERIENCE", weight: experience },
        { scoringDataType: "LITERATE", weight: literacy },
        { scoringDataType: "GOODBEHAVIOUR", weight: behavior },
        { scoringDataType: "ILLITERATE", weight: illiterate },
        { scoringDataType: "MODERATEBEHAVIOUR", weight: moderateBehavior },
        { scoringDataType: "BADBEHAVIOUR", weight: badBehavior },
      ];

      await Promise.all(
        updates.map(async (update) => {
          const weightData = weights.find(
            (item) => item.scoringDataType === update.scoringDataType
          );
          if (weightData) {
            await updateWeight(
              weightData.id,
              update.scoringDataType,
              update.weight
            );
          }
        })
      );
      toast.success("Data updated successfully");
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating weights:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
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
                  <FormLabel>Literate</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="illiterate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Illiterate</FormLabel>
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
                  <FormLabel>Good Behavior</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moderateBehavior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Moderate Behavior</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="badBehavior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bad Behavior</FormLabel>
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
