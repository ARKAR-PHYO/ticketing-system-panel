import { Box } from "@mui/material";
import Image from "next/image";
import background from "../../../../public/assets/images/sign-in_background.png";

type Props = {
  children: React.ReactNode;
};

const GuestAuthLayout = ({ children }: Props) => {
  return (
    <Box className="relative w-full h-screen bg-gray-800/90">
      <Box className="absolute inset-0 w-full max-h-screen transform -z-10 -scale-x-100">
        <Image
          src={background}
          alt="ResQMe-Logo"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
      {children}
    </Box>
  );
};

export default GuestAuthLayout;
