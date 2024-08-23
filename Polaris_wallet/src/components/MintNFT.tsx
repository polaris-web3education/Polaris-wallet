import { useAccount, useWriteContract } from "wagmi";
import { abi, address } from "@/contracts/mintable-erc721";

export function MintNFT() {
  const { isConnected } = useAccount();
  const { writeContract, isPending, isSuccess } = useWriteContract();
  const { address: userAddress } = useAccount();

  if (!isConnected) {
    return <div>ウォレットを接続してください。</div>;
  }

  return (
    <div>
      <h2>NFTをミント</h2>
      <button
        onClick={() => {
          console.log(userAddress);
          if (!userAddress) return;
          writeContract({
            abi,
            address,
            functionName: "safeMint",
            args: [userAddress],
          });
        }}
      >
        {isPending ? "ミント中..." : "NFTをミント"}
      </button>
      {isSuccess && <div>ミント成功！</div>}
    </div>
  );
}
