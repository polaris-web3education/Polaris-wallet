import React, { useCallback, useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { Button } from "./Button";
import { QRCodeSVG } from "qrcode.react";

export function KyuzanWalletButton() {
  const { connectors, connect } = useConnect();
  const { status, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [showQR, setShowQR] = useState(false);

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
    <div className="flex flex-col items-center">
      <Button onClick={createOrConnectCoinbaseSmartWallet} className="mb-4">
        {isConnected ? "Wallet Connected" : "Create Wallet / Connect Wallet"}
      </Button>
      {status === "connected" && (
        <>
          <div className="flex items-center justify-center mb-4">
            <div className="mr-2 truncate max-w-xs">{address}</div>
            <Button
              onClick={() => setShowQR(true)}
              className="px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600"
            >
              QR表示
            </Button>
          </div>
          <Button type="button" onClick={() => disconnect()} className="mb-4">
            Disconnect
          </Button>
        </>
      )}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-7 flex flex-col items-center rounded-lg text-center">
            <QRCodeSVG value={address || ""} size={200} />
            <Button
              onClick={() => setShowQR(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-600"
            >
              閉じる
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
