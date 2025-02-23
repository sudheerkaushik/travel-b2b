import AgentCard from "@/app/components/agents/agent details";
import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";

const AgentList = () => {
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
    <div className="container-fluid py-3">
      {agents.length > 0 ? (
        agents.map((agent) => (
          <div className="row justify-content-center mb-4">
            <AgentCard agent={agent} />
          </div>
        ))) : (
        <div className="alert alert-info">Loading</div>
      )
      }
    </div>
  );
}
AgentList.layout = AdminLayout;

export default AgentList;
