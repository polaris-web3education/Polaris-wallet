import React, { useCallback } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import PolarisLogo from "../../public/Polaris-logo.png";
import Image from "next/image";
import StyledButton from "@/styles/StyledButton";

export function PolarisWalletButton() {
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
      <StyledButton
        onClick={createOrConnectCoinbaseSmartWallet}
        className={isConnected ? "inactive" : ""}
      >
        <Image
          src={PolarisLogo}
          alt="Polaris Logo"
          width={24}
          height={24}
          style={{ marginRight: "6px" }}
        />
        {isConnected
          ? "Wallet Connected"
          : "Create Wallet / Connect Wallet"}
      </StyledButton>
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
