import { IsBoolean } from 'class-validator';
import { PATIENT_ERROR_MESSAGES } from '../constants/index';

export class CreateSymptomsPresentDto {
  @IsBoolean({ message: PATIENT_ERROR_MESSAGES.MEMORY_LOSS_BOOLEAN })
  memoryLoss: boolean;

  @IsBoolean({ message: PATIENT_ERROR_MESSAGES.LENGUAGE_PROBLEMS_BOOLEAN })
  lenguageProblems: boolean;

  @IsBoolean({ message: PATIENT_ERROR_MESSAGES.DIFFICULTY_WITH_TASKS_BOOLEAN })
  difficultyWithTasks: boolean;

  @IsBoolean({ message: PATIENT_ERROR_MESSAGES.DISORIENTATION_BOOLEAN })
  disorientation: boolean;

  @IsBoolean({ message: PATIENT_ERROR_MESSAGES.PERSONALITY_CHANGES_BOOLEAN })
  personalityChanges: boolean;

  @IsBoolean({ message: PATIENT_ERROR_MESSAGES.TEMPORAL_CONFUSION_BOOLEAN })
  temporalConfusion: boolean;
}
