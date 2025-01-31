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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6">Signup</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
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

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
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

      <div className="mb-4">
        <label htmlFor="agentName" className="block text-gray-700">
          Name
        </label>
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

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Signup
      </button>
    </form>
  );
};

export default AgentSignupForm;
