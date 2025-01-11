// import "../../styles/components/agent-layout.scss";
import AgentNavigation from "@/app/components/agents/navbar";
import Link from "next/link";

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AgentNavigation />
      <section className="agent-layout">
        <header className="navbar navbar-light bg-light">
          <nav className="container">
            <Link href="/agents/search-trip">Search Trips</Link>
            <Link href="/agents/trip-list">Trip List</Link>
            <Link href="/agents/signup">Signup</Link>
          </nav>
        </header>
        <main className="content">{children}</main>
        <footer className="footer">
          <p>Agent Portal &copy; 2025</p>
        </footer>
      </section>
    </>
  );
}
