import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import { getCoachesApi } from "../api";

import CoachList from "../components/Coaches/CoachList";

const Home: React.FC = () => {
  const { data: coaches, isLoading } = useQuery({
    queryKey: ["coaches"],
    queryFn: () => getCoachesApi(),
  });

  const navigate = useNavigate();

  const coachClickHandler = (id: string) => {
    localStorage.setItem("coachId", id);
    navigate("/exercise-list");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <CoachList coaches={coaches} onCoachClick={coachClickHandler} />
      )}
    </Box>
  );
};

export default Home;
