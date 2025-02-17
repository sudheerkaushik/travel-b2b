// import "../../styles/components/agent-layout.scss";
import AgentNavigation from "@/app/components/agents/navbar";
import Link from "next/link";

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="agent-layout">
      <AgentNavigation />
        <main className="content">{children}</main>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col">
                <p>Agent Portal &copy; 2025</p>

              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
