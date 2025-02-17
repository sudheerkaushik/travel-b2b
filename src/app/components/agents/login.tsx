// import React, { useState, useEffect } from "react";
// import { setCookie, deleteCookie, getCookie } from "../../lib/cookie";
// import { useUser } from "@/app/context/UserContext";
// import { useRouter } from "next/router";

// const AgentLoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { dispatch } = useUser();
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const response = await fetch("/api/agents/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();

//     if (response.ok) {
//       // setCookie("token", data.token, 1); // Save the token for 24 hours
//       // alert("Login Successful!");
//       console.log(data);
//       document.cookie = `token=${data.token}; Path=/;`;
//       dispatch({ type: "LOGIN", payload: { name: data.name, email: data.email } });
//       router.push("/");

//       // Auto-logout after 24 hours
//       setTimeout(() => {
//         deleteCookie("token");
//         alert("Session expired. Please log in again.");
//         window.location.reload(); // Redirect to login
//       }, 24 * 60 * 60 * 1000); // 24 hours in ms
//     } else {
//       alert(data.message);
//     }
//   };

//   useEffect(() => {
//     const token = getCookie("token");
//     if (!token) {
//       console.log("No active session. Redirect to login if required.");
//     }
//   }, []);

//   return (
//     <div className="container">
//       <div className="row mt-5">
//         <div className="card mb-3">
//           <div className="row g-0">
//             <div className="col-md-4 p-0">
//               <img src="../img/about.jpg" className="img-fluid rounded-start" alt="..." />
//             </div>
//             <div className="col-md-6 offset-md-1">
//               <div className="card-body">
//                 <h2 className="card-title">Agent Login</h2>
//                 <form
//                   onSubmit={handleLogin}
//                   className="w-full max-w-md bg-white p-6 rounded shadow-md"
//                 >
//                   {/* <h2 className="text-2xl font-semibold mb-6">Login</h2> */}
//                   <div className="mb-4">
//                     <div className="col-auto">
//                       <label className="block text-gray-700">Email</label>
//                     </div>
//                     <div className="col-auto">
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="w-full p-2 border rounded mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <div className="col-auto">
//                       <label className="block text-gray-700">Password</label>
//                     </div>
//                     <div className="col-auto">
//                       <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full p-2 border rounded mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-6">
//                   <button
//                     type="submit"
//                     className="w-full btn btn-sm btn-primary btn-block text-white p-2 rounded hover:bg-blue-600"
//                   >
//                     Login
//                   </button>
//                   </div>
//                 </form>
//               </div>
//               <p>Don't have an account? <a href="/agents/signup">Sign Up Here</a> </p>
//             </div>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default AgentLoginForm;
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
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />

          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Sign up to make your account and start using our platform with full access.
            </p>
            <a className="link-light text-decoration-none" href="/agents/signup">
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </a>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>

      </div>

      <style jsx>{`
             @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

        .container {
        margin-top: 100px;
          position: relative;
          width: 100%;
          background-color: #fff;
          min-height: 60vh;
          overflow: hidden;
        }

        .forms-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .signin-signup {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 75%;
          width: 50%;
          transition: 1s 0.7s ease-in-out;
          display: grid;
          grid-template-columns: 1fr;
          z-index: 5;
        }

        form {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0rem 5rem;
          transition: all 0.2s 0.7s;
          overflow: hidden;
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }

        form.sign-up-form {
          opacity: 0;
          z-index: 1;
        }

        form.sign-in-form {
          z-index: 2;
        }

        .title {
          font-size: 2.2rem;
          color: #444;
          margin-bottom: 10px;
        }

        .input-field {
          max-width: 380px;
          width: 100%;
          background-color: #f0f0f0;
          margin: 10px 0;
          height: 55px;
          border-radius: 55px;
          display: grid;
          grid-template-columns: 15% 85%;
          padding: 0 0.4rem;
          position: relative;
        }

        .input-field i {
          text-align: center;
          line-height: 55px;
          color: #acacac;
          transition: 0.5s;
          font-size: 1.1rem;
        }

        .input-field input {
          background: none;
          outline: none;
          border: none;
          line-height: 1;
          font-weight: 600;
          font-size: 1.1rem;
          color: #333;
        }

        .input-field input::placeholder {
          color: #aaa;
          font-weight: 500;
        }

        .btn {
          width: 150px;
          background-color: #7ab730;
          border: none;
          outline: none;
          height: 49px;
          border-radius: 49px;
          color: #fff;
          text-transform: uppercase;
          font-weight: 600;
          margin: 10px 0;
          cursor: pointer;
          transition: 0.5s;
        }

        .btn:hover {
          background-color: #f4f4f4;
          color: #101026;
        }

        .panels-container {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .container:before {
          content: "";
          position: absolute;
          height: 2000px;
          width: 2000px;
          top: -10%;
          right: 48%;
          transform: translateY(-50%);
          background-image: linear-gradient(-65deg, #7ab730 0%, #f4f4f4 100%);
          transition: 1.8s ease-in-out;
          border-radius: 50%;
          z-index: 6;
        }

        .image {
          width: 100%;
          transition: transform 1.1s ease-in-out;
          transition-delay: 0.4s;
        }

        .panel {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-around;
          text-align: center;
          z-index: 6;
        }

        .left-panel {
          pointer-events: all;
          padding: 3rem 17% 2rem 12%;
        }

        .right-panel {
          pointer-events: none;
          padding: 3rem 12% 2rem 17%;
        }

        .panel .content {
          color: #fff;
          transition: transform 0.9s ease-in-out;
          transition-delay: 0.6s;
        }

        .panel h3 {
          font-weight: 600;
          line-height: 1;
          font-size: 1.5rem;
        }

        .panel p {
          font-size: 0.95rem;
          padding: 0.7rem 0;
        }

        .btn.transparent {
          margin: 0;
          background: none;
          border: 2px solid #fff;
          width: 130px;
          height: 41px;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .right-panel .image,
        .right-panel .content {
          transform: translateX(800px);
        }

        /* ANIMATION */

        .container.sign-up-mode:before {
          transform: translate(100%, -50%);
          right: 52%;
        }

        .container.sign-up-mode .left-panel .image,
        .container.sign-up-mode .left-panel .content {
          transform: translateX(-800px);
        }

        .container.sign-up-mode .right-panel {
          pointer-events: all;
          transform: translateX(0);
        }

        .container.sign-up-mode .right-panel .image,
        .container.sign-up-mode .right-panel .content {
          transform: translateX(0);
        }

        .container.sign-up-mode .signin-signup {
          left: 25%;
        }

        .container.sign-up-mode form.sign-up-form {
          opacity: 1;
          z-index: 2;
        }

        .container.sign-up-mode form.sign-in-form {
          opacity: 0;
          z-index: 1;
        }

            `}</style>
    </div>
  );
};

export default AgentLoginForm;
