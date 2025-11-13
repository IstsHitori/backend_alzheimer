export enum PATIENT_ERROR_MESSAGES {
  FULL_NAME_REQUIRED = 'El nombre completo es obligatorio.',
  FULL_NAME_STRING = 'El nombre completo debe ser una cadena de texto.',

  BIRTH_DATE_REQUIRED = 'La fecha de nacimiento es obligatoria.',
  BIRTH_DATE_VALID = 'La fecha de nacimiento debe ser una fecha válida.',

  GENDER_REQUIRED = 'El género es obligatorio.',
  GENDER_VALID = 'El género seleccionado no es válido.',

  EDUCATION_LEVEL_REQUIRED = 'El nivel educativo es obligatorio.',
  EDUCATION_LEVEL_VALID = 'El nivel educativo seleccionado no es válido.',

  INVALID_RISK_LEVEL = 'El nivel de riesgo no es válido.',

  CONDITION_STRING = 'Cada condición médica del paciente debe ser un codigo de 4 dígitos alfanumerico',
  CONDITION_REQUIRED = 'El nombre de la condición médica medico es requerido',
  CONDITIONS_ARRAY = 'El historial de condiciones medicas debe ser una lista',

  CURRENT_MEDICATION_STRING = 'El expediente del medicamento debe ser un string  ',
  CURRENT_MEDICATION_REQUIRED = 'El expediente del medicamento es obligatorio ',
  CURRENT_MEDICATION_ARRAY = 'Los medicamentos del paciente debe ser una lista',
  CURRENT_MEDICATION_MAX_LENGTH = 'El expediente del medicamento debe ser de un tamaño máximo de 10',

  FAMILY_MEDICATION_STRING = 'Cada condición médica familiar debe ser un codigo de 4 dígitos alfanumerico',
  FAMILY_MEDICATION_REQUIRED = 'La condición médica familiar es boligatoria',
  FAMILY_BACKGROUND_ARRAY = 'Las condiciones médicas de los familiares deben ser una lista',
  FAMILY_MEDICATION_MAX_LENGTH = 'El expediente del medicamento del familiar debe ser de un tamaño máximo de 10',

  SYMPTOMS_OBJECT = 'Los síntomas no son válidos',

  HAS_ALZHEIMER_BOOLEAN = 'El valor del alzheimer familiar debe ser un booleano',
  HAS_DEMENTIAL_BOOLEAN = 'El valor de la demencia familiar debe ser un booleano',
  MEMORY_LOSS_BOOLEAN = 'El valor de pérdida de memoria debe ser un booleano',
  LENGUAGE_PROBLEMS_BOOLEAN = 'El valor de problemas de lenguaje debe ser un booleano',
  DIFFICULTY_WITH_TASKS_BOOLEAN = 'El valor de dificultad con tareas debe ser un booleano',
  DISORIENTATION_BOOLEAN = 'El valor de desorientación debe ser un booleano',
  PERSONALITY_CHANGES_BOOLEAN = 'El valor de cambios de personalidad debe ser un booleano',
  TEMPORAL_CONFUSION_BOOLEAN = 'El valor de confusión temporal debe ser un booleano',
  COG_EVALUATION_NOT_FOUND = 'Evaluación cognitiva no encontrada',
  PATIENT_NOT_FOUND = 'Paciente no encontrado',

  MMSE_REQUIRED = 'El puntaje MMSE es obligatorio.',
  MMSE_NUMBER = 'El puntaje MMSE debe ser un número.',
  MOCA_REQUIRED = 'El puntaje MoCA es obligatorio.',
  MOCA_NUMBER = 'El puntaje MoCA debe ser un número.',
  MMSE_MIN = 'El puntaje MMSE debe ser al menos 0.',
  MMSE_MAX = 'El puntaje MMSE no debe exceder 30.',
  MOCA_MIN = 'El puntaje MoCA debe ser al menos 0.',
  MOCA_MAX = 'El puntaje MoCA no debe exceder 30.',

  WEIGHT_REQUIRED = 'El peso es obligatorio.',
  WEIGHT_NUMBER = 'El peso debe ser un número.',
  WEIGHT_MIN = 'El peso debe ser al menos 0.',
  SIZE_REQUIRED = 'La talla es obligatoria.',
  SIZE_DECIMAL = 'La talla debe ser un número decimal.',
  SIZE_MIN = 'La talla debe ser al menos 0.',
  TENSION_REQUIRED = 'La tensión es obligatoria.',
  TENSION_DECIMAL = 'La tensión debe ser un número decimal.',
  TENSION_MIN = 'La tensión debe ser al menos 0.',
}
