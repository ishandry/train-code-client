import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

import { getClientExerciseApi, postMarkAsDoneApi } from "../api";

import { ClientExerciseDto, ExerciseStatus } from "../models";

const Exercise: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();

  const [checked, setCheked] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<ClientExerciseDto>({
    queryKey: ["exercise"],
    queryFn: async (): Promise<ClientExerciseDto> => {
      const response = await getClientExerciseApi({ id: exerciseId || "" });
      if (response) {
        return response;
      } else {
        return {
          id: "",
          status: ExerciseStatus.pending,
          dueDate: new Date(),
          description: "",
        };
      }
    },
  });

  const { mutateAsync: postMarkAsDone } = useMutation({
    mutationFn: postMarkAsDoneApi,
    onSuccess: () => {
        queryClient.invalidateQueries(["exercise"]);
    }
  });

  useEffect(() => {
    if (
      data?.status === ExerciseStatus.done ||
      data?.status === ExerciseStatus.missed
    ) {
      setCheked(true);
    }
  }, [data]);

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      await postMarkAsDone({ id: exerciseId || "" });
    }
  };

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: "20px" }}>
        Greeting !
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "10px" }}
        >{`Exercise: ${data.description}`}</Typography>
        <Typography
          variant="h5"
          sx={{ marginBottom: "10px" }}
        >{`Due Date: ${new Date(data.dueDate).toLocaleDateString("en-US", {
          weekday: "long", // Full weekday name (e.g., "Monday")
          year: "numeric", // Full numeric representation of the year (e.g., "2022")
          month: "long", // Full month name (e.g., "January")
          day: "numeric", // Numeric day of the month (e.g., "1")
        })}`}</Typography>
        <Typography
          variant="h5"
          sx={{ marginBottom: "10px" }}
        >{`Time left: ${getTimeDifference(
          new Date(),
          new Date(data.dueDate),
        )}`}</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={data.status === ExerciseStatus.done}
              onChange={(event) => handleCheck(event)}
            />
          }
          label="Mark as done"
          sx={{ marginTop: "20px" }}
        />
      </Box>
    </Box>
  );
};

function getTimeDifference(startDate: Date, endDate: Date) {
  const difference = endDate.getTime() - startDate.getTime();

  let remainingTime = difference;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  remainingTime -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  remainingTime -= hours * (1000 * 60 * 60);

  const timeDifference = {
    days,
    hours,
  };

  return `${timeDifference.days} days, ${timeDifference.hours} hours`;
}

export default Exercise;
