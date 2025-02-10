import React, { useState } from "react";

interface SignupProps {
  onSubmit: (data: { email: string; password: string; agentName: string }) => void;
  errors?: {
    email?: string;
    password?: string[];
    name?: string;
  };
}

const AgentSignupForm: React.FC<SignupProps> = ({ onSubmit, errors }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agentName, setAgentName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, agentName });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4 p-0">
              <img src="../img/about.jpg" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-6 offset-md-1">
              <div className="card-body">
                <h2 className="card-title">Agent Login</h2>
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
                >

                  <div className="mb-4 row align-content-center align-items-center">
                    <div className="col-2">
                      <label htmlFor="email" className="block text-gray-700">
                        Email
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded mt-1"
                      />
                      {errors?.email && <p>{errors.email}</p>}
                    </div>
                  </div>

                  <div className="mb-4 row align-content-center align-items-center">
                    <div className="col-2">
                      <label htmlFor="password" className="block text-gray-700">
                        Password
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded mt-1"
                      />
                      {errors?.password && (
                        <div>
                          <p>Password must:</p>
                          <ul>
                            {errors.password.map((error) => (
                              <li key={error}>- {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 row align-content-center align-items-center">
                    <div className="col-2">
                      <label htmlFor="agentName" className="block text-gray-700">
                        Name
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        id="agentName"
                        type="text"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        required
                        className="w-full p-2 border rounded mt-1"
                      />
                      {errors?.name && <p>{errors.name}</p>}
                    </div>
                  </div>

                  <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-sm btn-secondary btn-block p-2 rounded hover:bg-blue-600"
                  >
                    Signup
                  </button>
                  </div>
                </form>
              </div>
              <p>Already have an account? <a href="/agents/login">Login Here</a> </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AgentSignupForm;
