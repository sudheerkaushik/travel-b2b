
import React, { useState, useEffect, useActionState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { deleteCookie, getCookie } from "@/app/lib/cookie";
import { signup } from "@/app/actions/auth";


const SignupPage = () => {
  const [state, action, pending] = useActionState(signup, undefined)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { dispatch } = useUser();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/agents/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
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
          <form action={action} className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}
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
            <button disabled={pending} type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Already have an account?</h3>
            <p>
              Sign in to your account and start using our platform with full access.
            </p>
            <Link href="/agents/login" className="link-light text-decoration-none">
              <button className="btn transparent" id="sign-in-btn">
                Sign In
              </button>
            </Link>
          </div>
          <Image
            src="/img/log.svg" // Adjust the path if needed
            alt="Logo"
            width={500}  // Adjust width as needed
            height={500} // Adjust height as needed
            className="image"
          />
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
        color: #111;
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
        background-image: linear-gradient(-45deg, #7ab730 0%, #f4f4f4 100%);
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

      .container.sign-up-mode .signin-signup {
        left: 25%;
      }
    `}</style>
    </div>
  );
};


export default SignupPage;
