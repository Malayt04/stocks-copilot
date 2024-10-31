"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const formSchema = z.object({
  investmentAmount: z.number().min(100, "Minimum investment is $100"),
  riskTolerance: z.number().min(1).max(10),
  investmentType: z.enum(["stocks", "crypto", "both"]),
  investmentHorizon: z.number().min(1, "Minimum investment horizon is 1 year"),
})

export function UserPreferencesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentAmount: 1000,
      riskTolerance: 5,
      investmentType: "both",
      investmentHorizon: 5,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Here you would typically send the form data to your AI agent
    console.log(values)
    setTimeout(() => setIsSubmitting(false), 2000) // Simulating API call
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="investmentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Amount ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>Enter the amount you want to invest</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="riskTolerance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk Tolerance (1-10)</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormDescription>1 = Low risk, 10 = High risk</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="investmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose your preferred investment type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="investmentHorizon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Horizon (years)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormDescription>Enter your investment time horizon in years</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Get Recommendations"}
        </Button>
      </form>
    </Form>
  )
}