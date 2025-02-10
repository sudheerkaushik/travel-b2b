import React from "react";

const AgentCard = ({ agent }) => {
  return (
    <section className="w-100 px-4 py-5" style={{ borderRadius: ".5rem .5rem 0 0" }}>
      <div className="row d-flex justify-content-center">
        <div className="col col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{ borderRadius: 15 }}>
            <div className="card-body p-4">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    src={agent.profileImage || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
                    alt="Agent Profile"
                    className="img-fluid"
                    style={{ width: 180, borderRadius: 10 }}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-1">{agent.agentName}</h5>
                  <p className="mb-2 pb-1">{agent.role || "Agent"}</p>
                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2 bg-body-tertiary">
                    <div>
                      <p className="small text-muted mb-1">Email</p>
                      <p className="mb-0">{agent.email}</p>
                    </div>
                    <div className="px-3">
                      <p className="small text-muted mb-1">Phone</p>
                      <p className="mb-0">{agent.phone || "N/A"}</p>
                    </div>
                  </div>
                  {/* Add more agent details here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentCard;
