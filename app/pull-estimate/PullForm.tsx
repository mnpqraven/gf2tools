"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  bannerTypeEnum,
  pullEstimateSchema,
} from "@/lib/schemas/pull-estimate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { pullEstimateFormAtom } from "./store";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/shared/NumberInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function PullForm() {
  const form = useForm({
    resolver: zodResolver(pullEstimateSchema),
    defaultValues: pullEstimateSchema.parse(undefined),
  });
  const setForm = useSetAtom(pullEstimateFormAtom);

  function onSubmit(values: TypeOf<typeof pullEstimateSchema>) {
    setForm(values);
  }

  return (
    <Form {...form}>
      <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pity</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => {
                    const next = z.coerce
                      .number()
                      .nonnegative()
                      .catch(0)
                      .parse(e.target.value);
                    field.onChange(next);
                  }}
                  type="number"
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pulls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pulls</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => {
                    const next = z.coerce
                      .number()
                      .nonnegative()
                      .catch(0)
                      .parse(e.target.value);
                    field.onChange(next);
                  }}
                  type="number"
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentEidolon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Current Fortification (choose -1 for unowned)
              </FormLabel>
              <FormControl>
                <NumberInput
                  className="h-10 w-10"
                  min={-1}
                  onValueChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dupe</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bannerTypeEnum.options.map((banner) => (
                    <SelectItem key={banner} value={banner}>
                      {banner}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nextGuaranteed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guaranteed</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  className="block"
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="place-self-end">Calculate</Button>
      </form>
    </Form>
  );
}
