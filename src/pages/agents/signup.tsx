// import AgentLoginForm from "@/app/components/agents/login";
import AgentSignupForm from "@/app/components/agents/signup";
import React from "react";

const SignupPage = () => {
  const handleSignup = async (data: { email: string; password: string; agentName: string }) => {
    const response = await fetch("/api/agents/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
const responseBody = await response.json();
    if (responseBody.ok) {
      console.log("Signup successful!");
    } else {
      console.log("Signup failed.");
    }
  };

  return <AgentSignupForm onSubmit={handleSignup} />;
};


export default SignupPage;
