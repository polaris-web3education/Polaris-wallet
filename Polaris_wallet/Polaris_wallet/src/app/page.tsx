"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { KyuzanWalletButton } from "@/components/PolarisWalletButton";
import { SignMessage } from "@/components/SignMessage";
import { KomyX } from "@/components/PolarisX";
import { MintNFT } from "@/components/MintNFT";
import Header from "@/app/Header";
import Footer from "@/app/Footer";

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
        minHeight: "100vh",
        backgroundColor: "#1A1A1A",
        color: "#FFFFFF",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Header />
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <KyuzanWalletButton
            style={{
              backgroundColor: "#007BFF",
              color: "#FFFFFF",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          />
        </div>

        {account.status === "connected" && (
          <>
            <div
              style={{
                marginBottom: "40px",
                backgroundColor: "#2A2A2A",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MintNFT />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <button
                onClick={toggleSignMessage}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#007BFF",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007BFF")
                }
              >
                {showSignMessage ? "Hide Sign Message" : "Show Sign Message"}
              </button>
            </div>
            {showSignMessage && (
              <div style={{ marginBottom: "40px" }}>
                <SignMessage />
              </div>
            )}
          </>
        )}

        <div
          style={{
            marginBottom: "40px",
            backgroundColor: "#2A2A2A",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <KomyX />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
