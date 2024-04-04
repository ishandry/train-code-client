import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

interface AvatarBarProps {
  name: string;
  surname: string;
}

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = (i: number) => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase().padStart(6, "0");
  return `#${c}`;
};

const getAvatarColor = (name: string, surname: string) => {
  const hash = hashString(`${name}${surname}`);
  return intToRGB(hash);
};

const AvatarBar: React.FC<AvatarBarProps> = ({ name, surname }) => {
  const initials =
    name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
  const color = getAvatarColor(name, surname);
  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      width={190}
      gap="10px"
      sx={{
        padding: "5px",
        backgroundColor: "#e2dcdc6f",
        borderRadius: "4px",
        boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.521)",
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          backgroundColor: color,
        }}
      >
        {initials}
      </Avatar>
      <Typography>{`${name} ${surname}`}</Typography>
    </Box>
  );
};

export default AvatarBar;
