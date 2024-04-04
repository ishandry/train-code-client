import axios, { AxiosResponse } from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

import {
  GetCoachExercisesPayload,
  GetClientExercisesPayload,
  PostExercisePayload,
  GetClientExercisesResponse,
  PostExerciseResponse,
  GetCoachExercisesResponse,
  getCoachesResponse,
  CheckAsDonePayload,
  MarkAsDoneResponse,
} from "../models";

export const getCoachesApi = async (): Promise<
  getCoachesResponse | undefined
> => {
  try {
    const response: AxiosResponse<getCoachesResponse> = await axios.get(
      `${API_URL}/Coach`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching data: ${error}`);
  }
};

export const getCoachExercisesApi = async ({
  id,
}: GetCoachExercisesPayload): Promise<
  GetCoachExercisesResponse | undefined
> => {
  try {
    const response: AxiosResponse<GetCoachExercisesResponse> = await axios.get(
      `${API_URL}/Exercises/coach/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching data: ${error}`);
  }
};

export const getClientExerciseApi = async ({
  id,
}: GetClientExercisesPayload): Promise<
  GetClientExercisesResponse | undefined
> => {
  try {
    const response: AxiosResponse<GetClientExercisesResponse> = await axios.get(
      `${API_URL}/Exercises/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching data: ${error}`);
  }
};

export const postExerciseApi = async (
  payload: PostExercisePayload,
): Promise<PostExerciseResponse | undefined> => {
  // payload to query params:
  let params = "";
  params += `?coachId=${payload.coachId}`;
  params += `&due=${payload.due.toISOString()}`;
  params += `&description=${payload.description}`;
  params += `&clientId=${payload.clientId}`;

  try {
    const response: AxiosResponse<PostExerciseResponse> = await axios.post(
      `${API_URL}/Exercises${params}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching data: ${error}`);
  }
};

export const postMarkAsDoneApi = async (
  payload: CheckAsDonePayload,
): Promise<MarkAsDoneResponse | undefined> => {
  try {
    const response: AxiosResponse<MarkAsDoneResponse> = await axios.post(
      `${API_URL}/Exercises/done/${payload.id}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching data: ${error}`);
  }
};
