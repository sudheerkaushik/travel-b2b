import React, { useState, useEffect } from "react";
import { setCookie, deleteCookie, getCookie } from "../../lib/cookie";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/router";

const AgentLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useUser();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/agents/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      // setCookie("token", data.token, 1); // Save the token for 24 hours
      // alert("Login Successful!");
      console.log(data);
      document.cookie = `token=${data.token}; Path=/;`;
      dispatch({ type: "LOGIN", payload: { name: data.name, email: data.email } });
      router.push("/");

      // Auto-logout after 24 hours
      setTimeout(() => {
        deleteCookie("token");
        alert("Session expired. Please log in again.");
        window.location.reload(); // Redirect to login
      }, 24 * 60 * 60 * 1000); // 24 hours in ms
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      console.log("No active session. Redirect to login if required.");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AgentLoginForm;
