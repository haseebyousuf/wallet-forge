"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction } from "react";
import {
  generateEthereumWallet,
  generateSolWallet,
} from "@/lib/generateWallets";
import toast from "react-hot-toast";

const formSchema = z.object({
  secretPhrase: z.string(),
  walletType: z.enum(["SOL", "ETH"]),
});

type Props = {
  wallets: Wallet[];
  setWallets: Dispatch<SetStateAction<Wallet[]>>;
};

export function GenerateWallet({ wallets, setWallets }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secretPhrase: "",
      walletType: "SOL",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const mnemonic = values.secretPhrase.trim();
      const walletType = values.walletType;
      let newWallet: Wallet | undefined =
        walletType === "SOL"
          ? generateSolWallet(mnemonic)
          : generateEthereumWallet(mnemonic);
      if (!newWallet) {
        toast.error("Invalid Mnemonic!");
        return;
      }
      const updatedWallets = [...wallets, newWallet];
      setWallets(updatedWallets);
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      toast.success("New Wallet Added!");
      form.reset();
    } catch (error) {}
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-4 sm:space-y-0 sm:w-[80%] w-[80%] flex items-center justify-between flex-col sm:flex-row gap-1 sm:gap-4  z-20"
      >
        <FormField
          control={form.control}
          name="secretPhrase"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormControl>
                <Input
                  placeholder="Enter a secret phrase (or leave empty)"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="walletType"
          render={({ field }) => (
            <FormItem className="w-full 4 flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wallet Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem disabled value="empty">
                    Wallet Type
                  </SelectItem>
                  <SelectItem value="SOL">Solana</SelectItem>
                  <SelectItem value="ETH">Ethereum</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 w-full sm:w-auto"
        >
          Generate Wallet
        </Button>
      </form>
    </Form>
  );
}
