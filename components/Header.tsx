import React from "react";
import { Cover } from "./ui/cover";

const Header = () => {
  return (
    <div className="py-24 flex flex-col items-center justify-center gap-2">
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center  relative z-20 bg-clip-text text-transparent bg-gradient-to-b  from-neutral-800 via-white to-white ">
        <Cover>WalletForge</Cover> <br />
      </h1>
      <h2 className="text-white text-2xl font-semibold text-center">
        Generate & manage Hierarchical Deterministic (HD) Wallets{" "}
      </h2>
    </div>
  );
};

export default Header;
