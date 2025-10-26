export enum ANALYSIS_ERROR_MESSAGES {
  // CreateAnalysisDto
  PATIENT_ID_REQUIRED = 'El ID del paciente es requerido',
  PATIENT_ID_NUMBER = 'El ID del paciente debe ser un número',
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
  CONFIDENCE_LEVEL_REQUIRED = 'El nivel de confianza es requerido',
  CONFIDENCE_LEVEL_NUMBER = 'El nivel de confianza debe ser un número decimal',
  CONFIDENCE_LEVEL_MIN = 'El nivel de confianza debe ser como mínimo 0',
  CONFIDENCE_LEVEL_MAX = 'El nivel de confianza debe ser como máximo 100',
  MMSE_ESTIMATED_REQUIRED = 'La estimación MMSE es requerida',
  MMSE_ESTIMATED_NUMBER = 'La estimación MMSE debe ser un número decimal',
  MOCA_ESTIMATED_REQUIRED = 'La estimación MoCA es requerida',
  MOCA_ESTIMATED_NUMBER = 'La estimación MoCA debe ser un número decimal',
  ESTIMATION_CONFIDENCE_REQUIRED = 'La confianza de estimación es requerida',
  ESTIMATION_CONFIDENCE_NUMBER = 'La confianza de estimación debe ser un número decimal',
  ESTIMATION_NOTE_REQUIRED = 'La nota de estimación es requerida',
  ESTIMATION_NOTE_STRING = 'La nota de estimación debe ser una cadena de texto',
  BRAIN_VOLUME_REQUIRED = 'El volumen cerebral es requerido',
  BRAIN_VOLUME_NUMBER = 'El volumen cerebral debe ser un número decimal',
  HIPPOCAMPUS_VOLUME_REQUIRED = 'El volumen del hipocampo es requerido',
  HIPPOCAMPUS_VOLUME_NUMBER = 'El volumen del hipocampo debe ser un número decimal',
  CORTICAL_THICKNESS_REQUIRED = 'El grosor cortical es requerido',
  CORTICAL_THICKNESS_NUMBER = 'El grosor cortical debe ser un número decimal',
  WHITE_MATTER_LESIONS_REQUIRED = 'Las lesiones de materia blanca son requeridas',
  WHITE_MATTER_LESIONS_NUMBER = 'Las lesiones de materia blanca deben ser un número entero',
  DEVIATION_FROM_NORMAL_REQUIRED = 'La desviación de lo normal es requerida',
  DEVIATION_FROM_NORMAL_NUMBER = 'La desviación de lo normal debe ser un número decimal',
  RISK_FACTORS_REQUIRED = 'Los factores de riesgo son requeridos',
  RISK_FACTORS_ARRAY = 'Los factores de riesgo deben ser un array',
  RISK_FACTORS_STRING = 'Cada factor de riesgo debe ser una cadena de texto',
  MEDICAL_RECOMMENDATIONS_REQUIRED = 'Las recomendaciones médicas son requeridas',
  MEDICAL_RECOMMENDATIONS_ARRAY = 'Las recomendaciones médicas deben ser un array',
  MEDICAL_RECOMMENDATIONS_STRING = 'Cada recomendación médica debe ser una cadena de texto',

  // General errors
  ANALYSIS_NOT_FOUND = 'Análisis no encontrado',
  INVALID_ANALYSIS_ID = 'ID de análisis no válido',
}
