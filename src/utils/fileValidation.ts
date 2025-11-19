const MAX_FILE_SIZE = Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760; // 10MB
const ALLOWED_EXTENSIONS = import.meta.env.VITE_ALLOWED_FILE_EXTENSIONS?.split(',') || ['.xlsx', '.xls', '.csv'];

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Ukuran file melebihi batas maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Check file extension
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    return {
      valid: false,
      error: `Format file tidak didukung. Hanya ${ALLOWED_EXTENSIONS.join(', ')} yang diperbolehkan`,
    };
  }

  return { valid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};