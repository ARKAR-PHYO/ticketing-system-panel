import { Box } from "@mui/material";
import Image from "next/image";
import SignInForm from "@/components/templates/auth/sign-in-form";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const metadata = {
  title: "Login",
};

const SignIn = () => {
  return (
    <Box className="flex items-center justify-center h-screen">
      <Box className="flex-auto max-w-xl pl-36">
        <Box className="h-auto w-44">
          <Image
            src={"/logo/ResQMe-Logo-white.png"}
            width={4500}
            height={4500}
            alt="ResQMe-Logo"
          />
        </Box>
        <Box className="mt-10 space-y-5 text-white">
          <p className="text-5xl font-bold">Hi, Welcome Back!</p>
          <p className="text-xl font-light">
            Empower your organization. Lead with confidence and unlock success.
          </p>
        </Box>
      </Box>

      <SignInForm />
    </Box>
  );
};

export default SignIn;
