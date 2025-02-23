import React, { useEffect, useState } from "react";

interface Agent {
  agentName: string;
  role: string;
  email: string;
}

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => {
  return (
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
  );
};

export default AgentCard;
