import {
  CoachInfoDto,
  ClientInfoDto,
  CoachExerciseDto,
  ClientExerciseDto,
} from "./entities";

export type getCoachesResponse = CoachInfoDto[];

export type getClientsResponse = ClientInfoDto[];

export interface PostExerciseResponse {
  coachId: string;
  due: Date;
  description: string;
  clientId: string;
}

export type GetCoachExercisesResponse = CoachExerciseDto[];
export type GetClientExercisesResponse = ClientExerciseDto;

export type MarkAsDoneResponse = ClientExerciseDto;
