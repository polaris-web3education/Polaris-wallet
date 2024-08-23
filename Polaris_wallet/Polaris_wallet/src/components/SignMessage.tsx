import { useCallback, useEffect, useMemo, useState } from "react";
import type { Hex } from "viem";
import { useAccount, usePublicClient, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import StyledButton from "../styles/StyledButton";
import Image from "next/image";

export function SignMessage() {
  const account = useAccount();
  const client = usePublicClient();
  const [signature, setSignature] = useState<Hex | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean | undefined>(undefined);

  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess: (sig) => {
        setSignature(sig);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    },
  });

  const message = useMemo(() => {
    return new SiweMessage({
      domain: document.location.host,
      address: account.address,
      chainId: account.chainId,
      uri: document.location.origin,
      version: "1",
      statement: "Coinbase Smart Wallet Sign Message Example",
      nonce: "12345678",
    });
  }, [account.address]);

  const checkValid = useCallback(async () => {
    if (!signature || !account.address) return;

    client
      .verifyMessage({
        address: account.address,
        message: message.prepareMessage(),
        signature,
      })
      .then((v) => setValid(v));
  }, [signature, account]);

  useEffect(() => {
    if (signature) {
      checkValid();
    }
  }, [signature, account]);

  const handleSignMessage = () => {
    setLoading(true);
    signMessage({ message: message.prepareMessage() });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <StyledButton
        onClick={handleSignMessage}
        disabled={loading}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Signing..." : "Sign the message"}
      </StyledButton>

      {signature && (
        <div className="mt-4 text-center">
          <p className="text-gray-400">Signature:</p>
          <p className="break-all text-sm text-gray-300">{signature}</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <span className="text-gray-400">Is valid: </span>
        {valid !== undefined && (
          <span
            style={{
              color: valid ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {valid.toString()}
          </span>
        )}
      </div>
    </div>
  );
}
