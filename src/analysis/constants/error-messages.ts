export enum ANALYSIS_ERROR_MESSAGES {
  // CreateAnalysisDto
  PATIENT_ID_REQUIRED = 'El ID del paciente es requerido',
  PATIENT_ID_INVALID = 'El ID del paciente debe ser un ID válido',
  IMAGE_ANALYSES_ARRAY = 'imageAnalyses debe ser un array',
  IMAGE_ANALYSES_REQUIRED = 'Debe proporcionar al menos un análisis de imagen',

  // CreateImageDto
  IMAGE_URL_REQUIRED = 'La URL de la imagen es requerida',
  IMAGE_URL_STRING = 'La URL de la imagen debe ser una cadena de texto',
  FILE_NAME_REQUIRED = 'El nombre del archivo es requerido',
  FILE_NAME_STRING = 'El nombre del archivo debe ser una cadena de texto',

  // CreateImageAnalysisDto
  DIAGNOSIS_REQUIRED = 'El diagnóstico es requerido',
  DIAGNOSIS_VALID = 'El diagnóstico seleccionado no es válido',

  // Validation errors for probability fields
  PROBABILITY_NUMBER = 'La probabilidad debe ser un número',
  NON_DEMENTED_NUMBER = 'nonDemented debe ser un número',
  NON_DEMENTED_MIN = 'nonDemented debe ser mayor o igual a 0',
  NON_DEMENTED_MAX = 'nonDemented debe ser menor o igual a 100',
  VERY_MILD_DEMENTED_NUMBER = 'veryMildDemented debe ser un número',
  VERY_MILD_DEMENTED_MIN = 'veryMildDemented debe ser mayor o igual a 0',
  VERY_MILD_DEMENTED_MAX = 'veryMildDemented debe ser menor o igual a 100',
  MILD_DEMENTED_NUMBER = 'mildDemented debe ser un número',
  MILD_DEMENTED_MIN = 'mildDemented debe ser mayor o igual a 0',
  MILD_DEMENTED_MAX = 'mildDemented debe ser menor o igual a 100',
  MODERATE_DEMENTED_NUMBER = 'moderateDemented debe ser un número',
  MODERATE_DEMENTED_MIN = 'moderateDemented debe ser mayor o igual a 0',
  MODERATE_DEMENTED_MAX = 'moderateDemented debe ser menor o igual a 100',

  // General errors
  ANALYSIS_NOT_FOUND = 'Análisis no encontrado',
  INVALID_ANALYSIS_ID = 'ID de análisis no válido',
}
