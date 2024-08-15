import React, { Dispatch, SetStateAction } from "react";
import { WalletCard } from "./WalletCard";
import { AnimatePresence } from "framer-motion";
type Props = {
  wallets: Wallet[];
  setWallets: Dispatch<SetStateAction<Wallet[]>>;
};
const WalletList = ({ wallets, setWallets }: Props) => {
  return (
    <div className="text-white grid grids-col-1 sm:grid-cols-3 gap-6 my-8 z-10">
      <AnimatePresence>
        {wallets.length > 0 &&
          wallets
            .sort((a, b) => 1)
            .map((wallet, index) => (
              <div key={wallet.id}>
                <WalletCard
                  wallet={wallet}
                  index={index}
                  setWallets={setWallets}
                  wallets={wallets}
                />
              </div>
            ))}
      </AnimatePresence>
    </div>
  );
};

export default WalletList;
