import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Removed unused: jwtDecode import adjusted (if needed) and deleteCookie removed.
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../lib/cookie";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";

interface DecodedToken {
  id: string;
  email: string;
  name: string; // Assuming the token contains the user's name
}

const AgentNavigation = () => {
  const { state, dispatch } = useUser();
  // Removed unused "user": const { user } = state;

  const [userName, setUserName] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserName(decoded.name);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserName(null);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear the token by setting Max-Age=0
    document.cookie = "token=; Path=/; Max-Age=0;";
    dispatch({ type: "LOGOUT" });
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
                  <FontAwesomeIcon className="fab fa-facebook-f" />
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
              <div className="navbar-nav ml-auto py-0">
                <Link href="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link
                  href="/agents/trip-list"
                  className="nav-item nav-link mr-2"
                >
                  Trips
                </Link>
                {userName ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                      className="bg-white text-blue-500 p-2 rounded hover:bg-gray-100 flex items-center"
                    >
                      <span>{userName}</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {dropdownVisible && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
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
