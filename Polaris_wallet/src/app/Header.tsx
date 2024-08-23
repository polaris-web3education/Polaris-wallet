// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: "20px", backgroundColor: "#333", color: "#fff", width: "100%", textAlign: "center" }}>
      <nav>
        <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", gap: "15px", margin: 0, padding: 0 }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

