"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { KyuzanWalletButton } from "@/components/PolarisWalletButton";
import { SignMessage } from "@/components/SignMessage";
import { KomyX } from "@/components/PolarisX";
import { MintNFT } from "@/components/MintNFT";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SendPolarisToken } from "@/components/SendPolarisToken";
import { OwnedNfts } from "@/components/OwnedNfts";
import { Button } from "@/components/Button";

function App() {
  const account = useAccount();
  const [isShowSignMessage, setIsShowSignMessage] = useState(false);

  const toggleSignMessage = () => {
    setIsShowSignMessage((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}
      >
        <KyuzanWalletButton />
        {account.status === "connected" && (
          <>
            <div style={{ marginTop: "40px" }}>
              <MintNFT />
              <SendPolarisToken />
              <OwnedNfts />
            </div>
            <div style={{ marginTop: "40px" }}>
              <Button onClick={toggleSignMessage}>
                {isShowSignMessage
                  ? "(optional) Hide Sign Message"
                  : "(optional) Show Sign Message"}
              </Button>
            </div>
            {isShowSignMessage && (
              <div style={{ marginTop: "10px" }}>
                <SignMessage />
              </div>
            )}
          </>
        )}
        <div style={{ marginTop: "40px" }}>
          <KomyX />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
