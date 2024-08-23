"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { KyuzanWalletButton } from "@/components/PolarisWalletButton";
import { SignMessage } from "@/components/SignMessage";
import { KomyX } from "@/components/PolarisX";
import { MintNFT } from "@/components/MintNFT";
import Header from "@/app/Header"; // ヘッダーをインポート
import Footer from "@/app/Footer"; // フッターをインポート

function App() {
  const account = useAccount();
  const [showSignMessage, setShowSignMessage] = useState(false);

  const toggleSignMessage = () => {
    setShowSignMessage((prev) => !prev);
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
      <Header /> {/* ヘッダーを追加 */}
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
            </div>
            <div style={{ marginTop: "40px" }}>
              <button onClick={toggleSignMessage}>
                {showSignMessage
                  ? "(optional) Hide Sign Message"
                  : "(optional) Show Sign Message"}
              </button>
            </div>
            {showSignMessage && (
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
      <Footer /> {/* フッターを追加 */}
    </div>
  );
}

export default App;

