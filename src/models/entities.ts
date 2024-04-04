export interface ClientInfoDto {
  id: string;
  firstName: string;
  lastName: string;
}

export interface CoachInfoDto {
  id: string;
  firstName: string;
  lastName: string;
  clients: ClientInfoDto[];
}

export enum ExerciseStatus
{
    pending = 0,
    done = 1,
    missed = 2
}

export interface CoachExerciseDto {
    id: string;
    dueDate: Date;
    description: string;
    status: ExerciseStatus;
    client: ClientInfoDto;
}

export type ClientExerciseDto = Omit<CoachExerciseDto, 'client'>;
