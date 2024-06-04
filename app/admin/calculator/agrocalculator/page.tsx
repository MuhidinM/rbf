"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Check, X } from "lucide-react";

const AgroCalculator = () => {
  const percentage = 66;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <CircularProgressbarWithChildren
              value={percentage}
              strokeWidth={5}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: "round",
                pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                trailColor: "#f5f5f5",
              })}
            >
              <div
                className="font-bold text-[#3e98c7] text-xl"
                // style={{ fontSize: 20, fontWeight: "bold", color: "#3e98c7" }}
              >
                {`${percentage}%`}
              </div>
              <div className="text-[#999] mt-2 text-sm">Percentage</div>
            </CircularProgressbarWithChildren>
            <div className="flex flex-col items-center gap-8">
              {/* <div className="">some text</div> */}
              <div className="flex items-center w-full max-w-sm space-x-2">
                <Input type="number" placeholder="Account Number" />
                <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                  Calculate
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 pl-8">
          <div className="">
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Account Number:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                1022200133436
              </span>
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Loan Application Amount:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                21000.9
              </span>
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Average Daily Balance:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                21000
              </span>
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Annual Farm Income:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                334200
              </span>
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Farming Experience:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                2
              </span>
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Asset:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                2
              </span>
            </h2>
            <h2 className="pb-2 mb-2 text-lg font-light text-gray-900 dark:text-white">
              Literate: <Check className="inline-flex" color="green" />
              {/* <span className="inline-block space-y-1 font-semibold text-gray-500 dark:text-gray-400">
              </span> */}
            </h2>
          </div>
          <div className="">
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Annual Non-Farm Income:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                523432
              </span>
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Annual Future Farm Income:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                42132
              </span>
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Account Age:{" "}
              <span className="max-w-md space-y-1 font-semibold text-gray-500 dark:text-gray-400">
                10
              </span>
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Has Credit History:{" "}
              <Check className="inline-flex" color="green" />
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Has Default History: <X className="inline-flex" color="red" />
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Has Paid Regularly:{" "}
              <Check className="inline-flex" color="green" />
            </h2>
            <h2 className="mb-2 text-lg font-light text-gray-900 dark:text-white">
              Has Penalty History: <X className="inline-flex" color="red" />
            </h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgroCalculator;
