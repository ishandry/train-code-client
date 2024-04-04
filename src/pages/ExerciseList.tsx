import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";

import { ExerciseStatus } from "../models";

const CURRENT_URL = import.meta.env.VITE_APP_CURRENT_URL;

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { getCoachExercisesApi } from "../api";
import { AvatarBar } from "../components/shared";
import ExerciseForm from "../components/Exercises/ExerciseForm";

const ExerciseList: React.FC = () => {
  const { data: exercises, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
  });

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getExercises = async () => {
    const coachId = localStorage.getItem("coachId");
    return await getCoachExercisesApi({ id: coachId || "" });
  };

  const handleCopyClick = (id: string) => {
    navigator.clipboard.writeText(`${CURRENT_URL}/exercise/${id}`);
    setOpenSnackBar(true);
  };

  const handleCloseSnackbar = (_: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <ExerciseForm onAdded={() => setModalIsOpen(false)} />
      </Modal>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginTop: "40px",
            width: "80%",
            display: "grid",
            gridTemplateRows: "150px",
            gridAutoRows: "150px",
            gridTemplateColumns: `repeat(4, minmax(150px, 1fr))`,
            gridRowGap: "20px",
            gridColumnGap: "10px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            Create new exercise
          </Button>
          <Snackbar
            open={openSnackBar}
            autoHideDuration={2200}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Alert onClose={(e) => handleCloseSnackbar(e)} severity="success">
              Link copied to clipboard!
            </Alert>
          </Snackbar>
          {exercises && exercises?.length > 0 ? (
            exercises.map((e) => {
              const dueDate = new Date(e.dueDate);
              return (
                <Button
                  key={e.id}
                  onClick={() => handleCopyClick(e.id)}
                  sx={{
                    border: "1px solid",
                    borderRadius: "5px",
                    paddingInline: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    textTransform: "none",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      background: "#a3eb945a",
                      color: "black",
                      paddingInline: "10px",
                      borderRadius: "7px",
                    }}
                  >
                    {"Status: " + getTextStatus(e.status)}
                  </Box>
                  <IconButton
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCopyClick(e.id);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                  <Box
                    sx={{
                      minHeight: "30%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        userSelect: "none",
                      }}
                    >
                      {e.description}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        userSelect: "none",
                      }}
                    >
                      {dueDate.toLocaleDateString("en-US", {
                        weekday: "long", // Full weekday name (e.g., "Monday")
                        year: "numeric", // Full numeric representation of the year (e.g., "2022")
                        month: "long", // Full month name (e.g., "January")
                        day: "numeric", // Numeric day of the month (e.g., "1")
                      })}
                    </Typography>
                  </Box>
                  <AvatarBar
                    name={e.client.firstName}
                    surname={e.client.lastName}
                  />
                </Button>
              );
            })
          ) : isLoading ? (
            <CircularProgress />
          ) : (
            <h3>No exercises</h3>
          )}
        </Box>
      </Box>
    </>
  );
};

function getTextStatus(status: ExerciseStatus) {
  switch (status) {
    case ExerciseStatus.pending:
      return "Pending";
    case ExerciseStatus.done:
      return "Done";
    case ExerciseStatus.missed:
      return "Missed";
    default:
      return "Unknown";
  }
}

export default ExerciseList;
