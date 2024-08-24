import { useAccount, useWriteContract } from "wagmi";
import { abi, address } from "@/contracts/mintable-erc721";
import { Button } from "./Button";

export function MintNFT() {
  const { isConnected } = useAccount();
  const { writeContract, isPending, isSuccess } = useWriteContract();
  const { address: userAddress } = useAccount();

  if (!isConnected) {
    return <div>ウォレットを接続してください。</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">NFTをミント</h2>
      <Button
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
      </Button>
      {isSuccess && <div>ミント成功！</div>}
    </div>
  );
}
