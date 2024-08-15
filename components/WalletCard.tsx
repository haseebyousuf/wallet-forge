"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeIcon, Trash2 } from "lucide-react";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

type Props = {
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
  wallet: Wallet;
  index: number;
  wallets: Wallet[];
};
export function WalletCard({ wallet, index, setWallets, wallets }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className=" w-[340px] sm:w-[450px] dark border-gray-500">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="">
              <CardTitle>Wallet #{index + 1}</CardTitle>
              <CardDescription>
                {wallet.type === "ETH" ? "Ethereum" : "Solana"}
              </CardDescription>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const updatedWallets = wallets.filter(
                  (w) => w.id !== wallet.id
                );
                setWallets([...updatedWallets]);
                localStorage.setItem("wallets", JSON.stringify(updatedWallets));
                toast.success("Wallet Deleted!");
              }}
            >
              <Trash2 className="h-3  w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div>
            <h1 className="font-bold text-lg">Mnemonic</h1>
            <p className="text-slate-500 break-all">{wallet.mnemonic}</p>
          </div>
          <div className=" ">
            <h1 className="font-bold text-lg mb-2">Public Key</h1>
            <Card2 title={wallet.publicKey} icon={<EyeIcon />}>
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-sky-600"
                colors={[[125, 211, 252]]}
              />
            </Card2>
          </div>

          <div className=" ">
            <h1 className="font-bold text-lg mb-2">Private Key</h1>
            <Card2 title={wallet.privateKey} icon={<EyeIcon />}>
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-sky-600"
                colors={[[125, 211, 252]]}
              />
            </Card2>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-black dark:text-white group-hover/canvas-card:text-white "
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

const Card2 = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto h-[8rem] p-4 relative "
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 h-full">
        <div className="text-center group-hover/canvas-card:-translate-y-6 group-hover/canvas-card:opacity-0 transition duration-200 w-full  h-full flex justify-center items-center">
          {icon}
        </div>
        <h2 className=" dark:text-white text-md sm:text-lg  opacity-0 group-hover/canvas-card:opacity-100  z-10 text-black  font-bold break-all group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-24 transition duration-200 ">
          {title}
        </h2>
      </div>
    </div>
  );
};
