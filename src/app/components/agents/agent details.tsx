import React, { useEffect, useState } from "react";

const AgentCard = () => {
  interface Agent {
    id: string;
    agentName: string;
    role: string;
    email: string;
  }

  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await fetch("/api/agents/me"); // Fetch from API
        const data = await response.json();
        if (data) {
          setAgents(data);
          console.log("Agents fetched:", data);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgentDetails();
  }, []);

  return (
    <section className="container py-5">
      {agents.length > 0 ? (
        agents.map((agent) => (
          <div className="row justify-content-center mb-4" key={agent.id}>
            <div className="col-8">
              <div className="card shadow-lg" style={{ borderRadius: "1rem" }}>
                <div className="card-body">
                  <div className="d-flex">
                    <div className="flex-grow-1 ms-3">
                      <h5 className="card-title text-primary mb-2">{agent.agentName}</h5>
                      <p className="text-muted mb-3">{agent.role}</p>

                      <div className="d-flex flex-column bg-light rounded-3 p-3 mb-3">
                        <p className="small text-muted mb-1">Email</p>
                        <p className="mb-0 text-truncate">{agent.email}</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <p>hello</p>
    </section>
  );
};

export default AgentCard;
