"use client";

import { NumberInput } from "@/components/shared/NumberInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { type BannerType, bannerDict, bannerTypes } from "@/lib/schemas/banner";
import { pullEstimateSchema } from "@/lib/schemas/pull-estimate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { type TypeOf, z } from "zod";
import { pullEstimateFormAtom } from "./store";

export function PullForm() {
  const form = useForm({
    resolver: zodResolver(pullEstimateSchema),
    defaultValues: pullEstimateSchema.parse(undefined),
  });
  const setForm = useSetAtom(pullEstimateFormAtom);
  const vert = form.watch("currentEidolon");

  function onSubmit(values: TypeOf<typeof pullEstimateSchema>) {
    setForm(values);
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-2 md:flex"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="pityCurrentCount"
          render={({ field }) => (
            <FormItem className="col-span-3">
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
            <FormItem className="col-span-3">
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
          name="banner"
          render={() => (
            <FormItem className="col-span-3">
              <FormLabel>Banner</FormLabel>
              <Select
                defaultValue="SSRDoll"
                onValueChange={(key: BannerType) => {
                  form.setValue("banner", bannerDict[key]);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bannerTypes.options.map((banner) => (
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
                <Switch
                  checked={field.value}
                  className="block"
                  onCheckedChange={field.onChange}
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
              <FormLabel>Owned</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value > -1}
                  className="block"
                  onCheckedChange={(to) => field.onChange(to ? 0 : -1)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {vert > -1 ? (
          <FormField
            control={form.control}
            name="currentEidolon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fortification</FormLabel>
                <FormControl>
                  <NumberInput
                    className="h-10 w-full"
                    min={0}
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ) : null}
        <Button className="col-span-3 place-self-center md:place-self-end">
          Calculate
        </Button>
      </form>
    </Form>
  );
}
