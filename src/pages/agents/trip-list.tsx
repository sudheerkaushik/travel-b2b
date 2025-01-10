import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token; // Assuming token is stored in a cookie

  if (!token) {
    return {
      redirect: {
        destination: "/agents/login",
        permanent: false,
      },
    };
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    return { props: {} }; // Allow access to the page
  } catch {
    return {
      redirect: {
        destination: "/agents/login",
        permanent: false,
      },
    };
  }
};

export default function TripsPage() {
  return <div>Your Trips</div>;
}
