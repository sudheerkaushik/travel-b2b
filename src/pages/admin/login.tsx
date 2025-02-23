import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const AgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/agents/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Login Successful!");
    } else {
      console.log(data.message);
    }
  };

  return (
    <Container className="py-5">
      <h2>Agent Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default AgentLogin;
// import React, { useState } from "react";
// import console.log from "@/app/components/common/console.log";
// import AdminLoginForm from "@/app/components/admin/login";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [console.logMessage, setconsole.logMessage] = useState<string | null>(null);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const response = await fetch("/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       window.location.href = "/admin/dashboard";
//       console.log("Login Successful!");
//       setconsole.logMessage(`Welcome, ${data.name}!`);
//     } else {
//       setconsole.logMessage(data.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       {console.logMessage && (
//         <console.log
//           message={console.logMessage}
//           type="success" // Use "error" if needed
//           duration={3000} // Auto-hide after 3 seconds
//           onClose={() => setconsole.logMessage(null)}
//         />
//       )}
//       <AdminLoginForm />
//     </div>
//   );
// };

// export default AdminLogin;