import React, { useState } from "react";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import Alert from "@/app/components/common/alert";
import AgentLoginForm from "@/app/components/agents/login";

const AgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/agents/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.href = "/agents/trip-list";
      console.log("Login Successful!");
      setAlertMessage(`Welcome, ${data.name}!`);
  } else {
      setAlertMessage(data.message || "Login failed");
      // alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
       {alertMessage && (
        <Alert
          message={alertMessage}
          type="success" // Use "error" if needed
          duration={3000} // Auto-hide after 3 seconds
          onClose={() => setAlertMessage(null)}
        />
      )}
    <AgentLoginForm />
    </div>
  );
};

export default AgentLogin;
