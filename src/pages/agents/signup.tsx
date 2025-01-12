import { signup } from "@/app/components/actions/auth";
import React, { useActionState, useState } from "react";


interface SignupState {
  errors?: {
    email?: string;
    password?: string[];
    name?: string;
  };
}

const Signup = () => {
  const [state, action, pending] = useActionState<SignupState>(signup, undefined);
  // const [state, action, pending] = useActionState(signup, undefined)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agentName, setName] = useState(""); // Default role can be "agent"

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/agents/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, agentName }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful! Please log in.");
    } else {
      alert(`Signup failed: ${data.message || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
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
          {state?.errors?.email && <p>{state.errors.email}</p>}
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
           {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700">
            Name
          </label>
          <input
            id="agentName"
            type="text"
            value={agentName}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
           {state?.errors?.name && <p>{state.errors.name}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
