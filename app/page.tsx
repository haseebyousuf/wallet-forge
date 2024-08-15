"use client";
import { GenerateWallet } from "@/components/GenerateWallet";
import Header from "@/components/Header";
import WalletList from "@/components/WalletList";
import { useEffect, useState } from "react";

export default function Home() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  useEffect(() => {
    const storedWallets = localStorage.getItem("wallets");
    if (storedWallets) {
      setWallets(JSON.parse(storedWallets));
    }
  }, []);
  return (
    <main className="flex w-screen min-h-screen flex-col items-center gap-2 ">
      <Header />
      <GenerateWallet wallets={wallets} setWallets={setWallets} />
      <WalletList wallets={wallets} setWallets={setWallets} />
    </main>
  );
}
