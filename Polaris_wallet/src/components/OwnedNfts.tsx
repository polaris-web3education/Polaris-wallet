import { useAccount, useReadContract } from "wagmi";
import Image from "next/image";
import { abi, address } from "@/contracts/mintable-erc721";

export function OwnedNfts() {
  const { address: userAddress } = useAccount();
  const { data } = useReadContract({
    abi,
    address,
    functionName: "balanceOf",
    args: [userAddress],
  });

  console.log(data);

  if (!data) {
    return <div>NFTを保有していません</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">所有しているNFT</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 shadow-md">
          <Image
            src="https://ipfs.io/ipfs/QmVnxgB2HGe4EV4QWagMJK3J8ReavfHxfjDSy5v7gNuGGN"
            alt="Polaris NFT"
            objectFit="contain"
            width={250}
            height={200}
            className="rounded-md mb-2"
          />
          <p className="font-medium">Polaris</p>
          <p className="text-sm text-gray-600">A Polaris NFT!.</p>
        </div>
      </div>
    </div>
  );
}
