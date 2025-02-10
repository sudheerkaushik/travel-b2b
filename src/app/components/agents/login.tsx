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
                  onSubmit={handleLogin}
                  className="w-full max-w-md bg-white p-6 rounded shadow-md"
                >
                  {/* <h2 className="text-2xl font-semibold mb-6">Login</h2> */}
                  <div className="mb-4">
                    <div className="col-auto">
                      <label className="block text-gray-700">Email</label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded mt-1"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="col-auto">
                      <label className="block text-gray-700">Password</label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded mt-1"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                  <button
                    type="submit"
                    className="w-full btn btn-sm btn-primary btn-block text-white p-2 rounded hover:bg-blue-600"
                  >
                    Login
                  </button>
                  </div>
                </form>
              </div>
              <p>Don't have an account? <a href="/agents/signup">Sign Up Here</a> </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AgentLoginForm;
