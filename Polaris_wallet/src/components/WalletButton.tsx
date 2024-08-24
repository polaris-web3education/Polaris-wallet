import React, { useCallback } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";

export function KyuzanWalletButton() {
  const { connectors, connect } = useConnect();
  const { status, address } = useAccount();
  const { disconnect } = useDisconnect();

  const createOrConnectCoinbaseSmartWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );

    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  const isConnected = status === "connected";

  return (
    <>
      <button
        onClick={createOrConnectCoinbaseSmartWallet}
        className={isConnected ? "inactive" : ""}
      >
        {isConnected
          ? "1. Wallet Connected"
          : "1. Create Wallet / Connect Wallet"}
      </button>
      {status === "connected" && (
        <>
          <div style={{ marginTop: "5px" }}> {address}</div>
          <button
            type="button"
            onClick={() => disconnect()}
            style={{ marginTop: "5px" }}
          >
            Disconnect
          </button>
        </>
      )}
    </>
  );
}
