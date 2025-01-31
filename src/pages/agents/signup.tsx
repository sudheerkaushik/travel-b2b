import AgentLoginForm from "@/app/components/agents/login";
import AgentSignupForm from "@/app/components/agents/signup";
import React from "react";

const SignupPage = () => {
  const handleSignup = async (data: { email: string; password: string; agentName: string }) => {
    const response = await fetch("/api/agents/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Signup successful!");
    } else {
      alert("Signup failed.");
    }
  };

  return <AgentSignupForm onSubmit={handleSignup} />;
};

const LoginPage = () => {
  const handleLogin = async (data: { email: string; password: string }) => {
    const response = await fetch("/api/agents/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Login successful!");
    } else {
      alert("Login failed.");
    }
  };

  return <AgentLoginForm onSubmit={handleLogin} />;
};

export { SignupPage, LoginPage };
