import React from "react";
import { ReactComponent as PurchaseIcon } from "../../assets/icons/purchase_icon.svg";
import { ReactComponent as ConnectIcon } from "../../assets/icons/connect_icon.svg";
import { ReactComponent as ListenIcon } from "../../assets/icons/listen_icon.svg";

const HowItWork = () => {
  return (
    <div className="min-w-how-it w-2/5">
      <div className="flex justify-between">
        <p className="text-xl leading-tight font-bold">How it works</p>
        <button className="py-2 px-4 text-sm leading-[18px] -tracking-[.03em] rounded-full bg-blue-400 font-semibold">
          Shop Artist NFTS
        </button>
      </div>

      <div className="flex bg-trackHover items-center justify-between px-16 py-8 rounded-xl mt-4.5">
        <div className="flex flex-col items-center space-y-3 text-lg">
          <PurchaseIcon />
          <div className="flex text-sm leading-[18px] font-normal space-x-1">
            <span className="text-sky-500 font-bold">1. </span>
            <span>Buy Artist NFT</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3 text-lg">
          <ConnectIcon />
          <div className="flex text-sm leading-[18px] font-normal space-x-1">
            <span className="text-sky-500 font-bold">2. </span>
            <span>Connect Wallet</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3 text-lg">
          <ListenIcon />
          <div className="flex text-sm leading-[18px] font-normal space-x-1">
            <p className="text-sky-500 font-bold">3. </p>
            <span>Listen!</span>
          </div>
        </div>
      </div>

      <p className="text-lg leading-tight font-bold mt-10">About</p>

      <p className="text-xs leading-normal font-medium antialiased mt-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, blanditiis
        consectetur dolores eaque enim eos, explicabo impedit, iste nisi
        repellat repudiandae suscipit tempora. Ducimus eius, eligendi ex
        expedita fugiat inventore laboriosam libero mollitia pariatur
        praesentium repudiandae, tempore ullam, vero voluptatum?
      </p>
    </div>
  );
};

export default HowItWork;
