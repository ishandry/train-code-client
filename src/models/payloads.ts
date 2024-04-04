export interface GetCoachExercisesPayload {
  id: string;
}

export interface GetClientExercisesPayload {
  id: string;
}

export interface PostExercisePayload {
  coachId: string;
  due: Date;
  description: string;
  clientId: string;
}

export interface CheckAsDonePayload {
  id: string;
}
