
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, getCookie } from "../../lib/cookie";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";

interface DecodedToken {
  email: string;
  name: string; // Assuming the token contains the user's name
}

const AgentNavigation = () => {
   const router = useRouter();
  const { dispatch } = useUser();
  // Removed the unused "state"

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      try {
        console.log("Token from cookiessss:", token);
        // const decoded: DecodedToken = jwtDecode(token);
        // console.log("Decoded token:", decoded); 
        setUserName(token);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserName(null);
      }
    }
  }, [router.pathname]);

  const handleLogout = () => {
    deleteCookie("token");
    document.cookie = "token=; Path=/; Max-Age=0;";
    dispatch({ type: "LOGOUT" });
    router.reload();
  };

  return (
    <>
      <div className="container-fluid bg-light pt-3 d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center">
                <p>
                  <i className="fa fa-envelope mr-2"></i>info@nodeascend.com
                </p>
                <p className="text-body px-3">|</p>
                <p>
                  <i className="fa fa-phone-alt mr-2"></i>+91-9582818240
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
              <div className="d-inline-flex align-items-center">
                <a className="text-primary px-3" href="">
                  <FontAwesomeIcon className="fab fa-facebook-f" icon={"function"} />
                </a>
                <a className="text-primary px-3" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="text-primary px-3" href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="text-primary px-3" href="">
                  <i className="fab fa-instagram"></i>
                </a>
                <a className="text-primary pl-3" href="">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid position-relative nav-bar p-0"
        style={{ zIndex: "1000" }}
      >
        <div className="container-lg position-relative p-0 px-lg-3">
          <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-lg py-3 py-lg-0 pl-3 pl-lg-5">
            <Link href="/" className="navbar-brand">
              <h1 className="m-0 text-primary">
                <span className="text-dark">TRAVEL</span>ER
              </h1>
            </Link>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0 d-flex align-items-center">
                <Link href="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link href="/agents/trip-list" className="nav-item nav-link mr-2">
                  Trips
                </Link>
                {userName ? (
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {userName}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
                        {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  
                ) : (
                  <Link
                    href="/agents/login"
                    className="nav-item nav-link text-blue-500 rounded hover:bg-gray-100"
                  >
                    Agent Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AgentNavigation;
