import React, { useState, createContext, useEffect } from "react";
import { connect, Contract, WalletConnection, utils } from "near-api-js";
import { CONTRACT_NAME, testnetConfig } from "./contract/config";

export const ConnectContext = createContext({
  accountId: "",
  walletConnection: null,
  contract: null,
  login: () => {},
  logout: () => {},
  utils,
});

const ConnectProvider = ({ children }) => {
  const [accountId, setAccountId] = useState("");
  const [walletConnection, setWalletConnection] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    (async () => {
      await connectNearWallet();
    })();
  }, []);

  const connectNearWallet = async () => {
    const _near = await connect(testnetConfig);
    const _walletConnection = new WalletConnection(_near);
    const _accountId = _walletConnection.getAccountId();
    const _contract = await new Contract(
      _walletConnection.account(),
      CONTRACT_NAME,
      {
        viewMethods: ["get_random_token_by_collection", "get_collections"], // view methods do not change state but usually return a value
        changeMethods: ["add_collection", "add_nfts_to_collection", "nft_mint"], // change methods modify state
      }
    );
    setWalletConnection(_walletConnection);
    setAccountId(_accountId);
    setContract(_contract);
  };
  const login = () => {
    walletConnection.requestSignIn(CONTRACT_NAME);
  };
  const logout = () => {
    walletConnection.signOut();
    window.location.reload(window.location.origin);
  };

  return (
    <ConnectContext.Provider
      value={{
        accountId,
        walletConnection,
        contract,
        login,
        logout,
        utils
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export default ConnectProvider;
