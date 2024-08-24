import { useState } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { erc20Abi, parseEther } from "viem";
import { Button } from "./Button";

export const SendPolarisToken = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { address } = useAccount();

  const tokenAddress = "0xAaf6A734114437b719c28cfd44c0b2B515eD29be"; // Polarisトークンのコントラクトアドレスを設定してください

  const { writeContract, isError } = useWriteContract();

  const { data: balance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address!],
  });

  const handleSend = async () => {
    if (!recipient || !amount) return;

    try {
      await writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipient as `0x${string}`, parseEther(amount)],
      });
    } catch (error) {
      console.error("送金エラー:", error);
    }
  };

  if (isError) {
    alert("送金に失敗しました");
  }

  return (
    <div>
      <h2>Polarisトークン送金</h2>
      <p>
        残高: {balance ? parseFloat(balance.toString()) / 1e18 : "0"} POLARIS
      </p>
      <input
        type="text"
        placeholder="受取人アドレス"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="送金額"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button onClick={handleSend}>送金</Button>
    </div>
  );
};
