import React from "react";
import { Box, Typography } from "@mui/material";

import { AvatarBar } from "../shared";

interface CoachListProps {
  coaches: any;
  onCoachClick: (id: string) => void;
}

const CoachList: React.FC<CoachListProps> = ({ coaches, onCoachClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "10px",
      }}
    >
      {coaches.map((coach: any) => (
        <Box
          onClick={() => onCoachClick(coach.id)}
          key={coach.id}
          sx={{
            display: "flex",
            width: "200px",
            flexDirection: "column",
            backgroundColor: "lightgray",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "15px",
          }}
        >
          <Typography>Coach</Typography>
          <Typography
            sx={{ fontSize: "1.5rem" }}
          >{`${coach.firstName} ${coach.lastName}`}</Typography>
          <Typography>Clients: </Typography>
          {coach.clients.map((client: any) => (
            <Box sx={{ marginBottom: "10px" }}>
              <AvatarBar
                key={client.id}
                name={client.firstName}
                surname={client.lastName}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default CoachList;
