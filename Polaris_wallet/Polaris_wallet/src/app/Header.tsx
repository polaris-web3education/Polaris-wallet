import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: "20px", backgroundColor: "#333", color: "#fff", width: "100%", textAlign: "center" }}>
      <nav>
        <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", gap: "15px", margin: 0, padding: 0 }}>
          <li><Link href="/" style={{ color: "white" }}>Home</Link></li>
          <li><Link href="sendtoken" style={{ color: "white" }}>wallet</Link></li>
          <li><Link href="https://github.com/polaris-web3education/Polaris-wallet" style={{ color: "white" }}>About</Link></li>
          <li><Link href="https://x.com/Shibuya_Polaris" style={{ color: "white" }}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}


