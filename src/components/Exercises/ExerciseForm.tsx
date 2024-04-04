import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { PostExercisePayload, CoachInfoDto } from "../../models";
import { postExerciseApi, getCoachesApi } from "../../api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AvatarBar from "../shared/AvatarBar";

type ValuesType = Omit<PostExercisePayload, "coachId">;

const validationSchema = yup.object({
  description: yup.string().required("Description is required"),
  due: yup.date().required("Due date is required"),
  clientId: yup.string().required("Client is required"),
});

const ExerciseForm: React.FC = ({ onAdded }: {onAdded: () => void}) => {
    const queryClient = useQueryClient();
  const { data: coaches, isLoading } = useQuery({
    queryKey: ["coaches"],
    queryFn: () => getCoachesApi(),
  });

  const [currentCoach, setCurrentCoach] = useState<CoachInfoDto>();
  const [clientOptions, setClientOptions] = useState<
    { value: string; label: string }[]
  >([]);


  const { mutateAsync: postExerciseMutation } = useMutation({
    mutationFn: postExerciseApi,
    onSuccess: () => {
        queryClient.invalidateQueries(["exercises"]);
        onAdded();
    }
  });

  useEffect(() => {
    if (coaches) {
      const coachId = localStorage.getItem("coachId");
      const coach = coaches.find((c) => c.id === coachId);
      if (coach) {
        setCurrentCoach(coach);
      }
    }
  }, [coaches]);

  useEffect(() => {
    if (currentCoach) {
      const options = currentCoach.clients.map((c) => ({
        value: c.id,
        label: `${c.firstName} ${c.lastName}`,
      }));
      setClientOptions(options);
    }
  }, [currentCoach]);

  const formik = useFormik({
    initialValues: {
      description: "",
      due: new Date(),
      clientId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: ValuesType) => {
        await postExerciseMutation({
        ...values,
        coachId: localStorage.getItem("coachId") || "",
      });
      formik.resetForm();
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        borderRadius: "15px",
        backgroundColor: "lightgray",
        width: "350px",
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "60px 20px",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "20px", flexDirection: "column" }}
      >
        <TextField
          fullWidth
          variant="filled"
          size="small"
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <DatePicker
          selected={formik.values.due}
          onChange={(date: any) => formik.setFieldValue("due", date)}
        />
        <TextField
          select
          sx={{ minWidth: "300px"}}
          fullWidth
          variant="filled"
          id="clientId"
          size="small"
          name="clientId"
          value={formik.values.clientId}
          onChange={formik.handleChange}
          SelectProps={{
            native: true,
          }}
          error={formik.touched.clientId && Boolean(formik.errors.clientId)}
          helperText={formik.touched.clientId && formik.errors.clientId}
        >
            <option value={""}>
              Choose a client
            </option>
          {clientOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ExerciseForm;
