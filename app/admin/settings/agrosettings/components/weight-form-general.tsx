import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const WeightFormGeneral = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form>
          <div className="flex flex-1 space-x-2 w-full">
            <div className="grid grid-cols-2 gap-2 w-full">
              <FormField
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Farmer Business Growth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Social Capital"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button size="icon" type="submit" variant="outline">
              <Check className="h-4 w-4" />
            </Button>
            {/* {risk && (
              <Button
                size="icon"
                disabled={loading}
                type="button"
                variant="destructive"
                onClick={() => onDelete()}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )} */}
            <Button size="icon" type="button" variant="outline">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WeightFormGeneral;
