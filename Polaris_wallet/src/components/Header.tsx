import Link from "next/link";

export function Header() {
  return (
    <header
      style={{
        padding: "20px",
        backgroundColor: "#333",
        color: "#fff",
        width: "100%",
        textAlign: "center",
      }}
    >
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            gap: "15px",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link href="create wallet" style={{ color: "white" }}>
              Wallet
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/polaris-web3education/Polaris-wallet"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="https://x.com/Shibuya_Polaris"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
