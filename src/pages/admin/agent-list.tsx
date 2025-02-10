import AgentCard from "@/app/components/agents/agent details";
import React, { useState, useEffect } from "react";

const AgentList = () => {
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await fetch("/api/agents/me"); // Fetch agent details
        if (!response.ok) throw new Error("Failed to fetch agent details");
        const data = await response.json();
        setAgent(data&& data);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      }
    };

    fetchAgentDetails();
  }, []);
  console.log(agent);

  return (
    <div className="container-fluid py-3">
      {agent ? <AgentCard agent={agent} /> : <p>Loading...</p>}
    </div>
  );
};

export default AgentList;
