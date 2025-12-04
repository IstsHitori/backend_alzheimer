export enum ACTIVITY_ERROR_MESSAGES {
  TITLE_REQUIRED = 'El título es obligatorio',
  TITLE_MUST_BE_STRING = 'El título debe ser un texto',
  TITLE_MAX_LENGTH = 'El título no puede exceder los 100 caracteres',
  DESCRIPTION_REQUIRED = 'La descripción es obligatoria',
  DESCRIPTION_MUST_BE_STRING = 'La descripción debe ser un texto',
  DESCRIPTION_MAX_LENGTH = 'La descripción no puede exceder los 100 caracteres',
  TYPE_REQUIRED = 'El tipo de actividad es obligatorio',
  TYPE_INVALID = 'El tipo de actividad no es válido',
  USERID_REQUIRED = 'El ID del usuario es obligatorio',
  USERID_MUST_BE_UUID = 'El ID del usuario debe ser un UUID válido',
}
