import {
  useAccount,
  useWriteContract,
  useReadContract,
  useReadContracts,
} from "wagmi";
import StyledButton from "../styles/StyledButton";
import Image from "next/image";
import { abi, address } from "@/contracts/mintable-erc721";
import { useState, useEffect } from "react";

export function MintNFT() {
  const { address: userAddress, isConnected } = useAccount();

  // States
  const [indexes, setIndexes] = useState<number[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { writeContract } = useWriteContract();

  const {
    data: dataBalance,
    refetch: refetchBalance,
    isFetched: isFetchedBalance,
  } = useReadContract({
    abi,
    address,
    functionName: "balanceOf",
    args: [userAddress],
  });

  const {
    data: dataTokenIds,
    refetch: refetchTokenIds,
    isFetched: isFetchedTokenIds,
  } = useReadContracts({
    contracts: indexes.map((i) => ({
      abi,
      address,
      functionName: "tokenOfOwnerByIndex",
      args: [userAddress, i],
    })),
  });

  useEffect(() => {
    if (isFetchedBalance) {
      const _balance = Number(dataBalance);
      setIndexes(Array.from({ length: _balance }, (_, i) => i));
    }
  }, [dataBalance, isConnected]);

  useEffect(() => {
    if (isFetchedTokenIds) {
      refetchTokenIds();
    }
  }, [indexes, refetchTokenIds]);

  useEffect(() => {
    if (isFetchedTokenIds) {
      setTokenIds(
        (dataTokenIds as unknown[]).map((dataTokenId) =>
          Number((dataTokenId as { result: bigint }).result)
        )
      );
    }
  }, [dataTokenIds]);

  const handleMintNFT = async () => {
    setLoading(true);
    setError(null);
    try {
      await writeContract(
        {
          abi,
          address,
          functionName: "safeMint",
          args: [userAddress],
        },
        {
          onSuccess: async () => {
            await refetchBalance();
            setLoading(false);
          },
          onError: (err) => {
            setError("Minting failed. Please try again.");
            setLoading(false);
          },
        }
      );
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <StyledButton
        onClick={handleMintNFT}
        disabled={loading || !isConnected}
        className="px-6 py-3 text-lg font-semibold text-blue-600 bg-white rounded-lg shadow hover:bg-gray-100 disabled:opacity-50"
      >
        {loading ? "Minting..." : "Mint NFT"}
      </StyledButton>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-8">
  {tokenIds.length > 0 ? (
    <ul className="space-y-4">
      {tokenIds.map((tokenId) => (
        <li key={tokenId} className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-800 font-bold">#{tokenId}</span>
          </div>
          <a
            href={`https://testnets.opensea.io/assets/base-sepolia/${address}/${tokenId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 text-blue-600"
          >
            View NFT (tokenId #{tokenId}) on OpenSea
          </a>
        </li>
      ))}
    </ul>
        ) : (
          <p className="text-gray-500">No NFTs minted yet.</p>
        )}
      </div>
    </div>
  );
}