// "use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AgroCohortResponse } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createData, deleteData, editData } from "@/actions/agro-cohorts";
import AccountDuration from "./creators/AccountDuration";
import Experience from "./creators/Experience";
import AccountBalance from "./creators/AccountBalance";
import Fainc from "./creators/Fainc";
import Ftainc from "./creators/Ftainc";
import Ftaninc from "./creators/Ftaninc";
import Asset from "./creators/Asset";

const steps = [
  {
    id: "1",
    fields: ["name", "description"],
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },
  {
    id: "7",
  },
  {
    id: "8",
  },
  {
    id: "9",
  },
  {
    id: "10",
  },
  {
    id: "11",
  },
];
const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

interface LevelFormProps {
  initialData: AgroCohortResponse | null;
}

type LevelFormValues = z.infer<typeof formSchema>;

export const MainForm: React.FC<LevelFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [cohortId, setCohortId] = useState(0);

  const delta = currentStep - previousStep;

  const params = useParams();
  const router = useRouter();

  const title = initialData?.id ? "Edit Cohort" : "Create Cohort";
  const description = initialData?.id ? "Edit a Cohort" : "Add a new Cohort";
  const toastMessage = initialData?.id ? "Cohort updated." : "Cohort created";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData?.id
      ? {
          name: initialData?.name,
          description: initialData?.description,
        }
      : {
          name: "",
          description: "",
        },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
      });
      setCohortId(initialData.id);
    }
  }, [initialData]);

  const makeApiRequest = async (data: LevelFormValues) => {
    console.log(initialData?.id);
    try {
      setLoading(true);
      const res = initialData?.id
        ? await editData(`api/cohorts/${initialData?.id}`, data)
        : await createData("api/cohorts", data);
      setCohortId(res.id);
      toast.success(toastMessage);
    } catch (error) {
      console.error("Error making API request", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const next = useCallback(async () => {
    try {
      // Trigger form validation
      const isValid = await form.trigger();

      if (isValid && currentStep < steps.length - 1) {
        // If it's the first step, make the API request
        if (currentStep === 0) {
          if (!cohortId) {
            await makeApiRequest(form.getValues());
          }
        }
        setPreviousStep((step) => step + 1);
        setCurrentStep((step) => step + 1);
      }
    } catch (error) {
      console.error("Error during form validation", error);
    }
  }, [form, currentStep, initialData]);

  const prev = useCallback(() => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  }, [currentStep]);

  const onDelete = async () => {
    try {
      setLoading(true);
      // await deleteCohort(Number(initialData?.id));
      await deleteData(`api/cohorts/${Number(initialData?.id)}`);
      router.refresh();
      router.push(`/admin/cohorts/agrocohorts`);
      toast.success("Cohort deleted.");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData?.id && (
          <Button
            variant="destructive"
            disabled={loading}
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <section className="inset-0 flex flex-col justify-between">
        {/* steps */}
        <nav aria-label="Progress">
          <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            {steps.map((step, index) => (
              <div key={step.id} className="md:flex-1">
                {currentStep > index ? (
                  <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-cyan-500 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-6 dark:after:border-gray-700">
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    </span>
                  </li>
                ) : currentStep === index ? (
                  <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-cyan-500 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                      <span className="me-2 whitespace-nowrap">{step.id}</span>
                    </span>
                  </li>
                ) : (
                  <li className="flex items-center">
                    <span className="me-2 whitespace-nowrap">{step.id}</span>
                  </li>
                )}
              </div>
            ))}
          </ol>
        </nav>

        {/* Form */}
        {currentStep === 0 && (
          <Form {...form}>
            <h1 className="mt-4">hello</h1>
            <form className="grid gap-4 mt-10 md:grid-cols-2">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cohort Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description:</FormLabel>
                    <FormControl>
                      <Input placeholder="Description here ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div>
            </form>
          </Form>
          // </motion.div>
        )}

        {currentStep === 1 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AccountDuration cohortId={cohortId} />
            </motion.div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AccountBalance cohortId={cohortId} />
            </motion.div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Fainc cohortId={cohortId} />
            </motion.div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Ftainc cohortId={cohortId} />
            </motion.div>
          </div>
        )}
        {currentStep === 5 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Ftaninc cohortId={cohortId} />
            </motion.div>
          </div>
        )}
        {currentStep === 6 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Asset cohortId={cohortId} />
            </motion.div>
          </div>
        )}
        {currentStep === 7 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* <AccountDuration cohortId={cohortId} /> */}
            </motion.div>
          </div>
        )}
        {currentStep === 8 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* <AccountDuration cohortId={cohortId} /> */}
            </motion.div>
          </div>
        )}
        {currentStep === 9 && (
          <div className="mt-10">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Experience cohortId={cohortId} />
            </motion.div>
          </div>
        )}
        <form className="w-full mt-8">
          {currentStep === 10 && (
            <>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thank you for your submission.
              </p>
            </>
          )}
        </form>

        {/* Navigation */}
        <div className="pt-5 mt-8">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
