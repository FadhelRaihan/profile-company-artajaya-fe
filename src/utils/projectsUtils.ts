import type { Project, ProjectPhoto } from '@/stores/projects/reportStore';
import { getImageUrl } from '@/utils/getImageUrl';


/**
 * Utility functions untuk menangani photos dari project
 */

/**
 * Mendapatkan URL foto pertama dari project
 * Fallback ke placeholder jika tidak ada foto
 */
export const getFirstProjectPhotoUrl = (project: Project): string => {
  if (project.photos && project.photos.length > 0) {
    // Resolve URL menggunakan getImageUrl dari apiService
    return getImageUrl(project.photos[0].url);
  }
  
  // Fallback ke placeholder dengan seed dari project id
  return `https://picsum.photos/seed/${project.id}/800/600`;
};

/**
 * Mendapatkan semua URL foto dari project
 */
export const getAllProjectPhotoUrls = (project: Project): string[] => {
  if (project.photos && project.photos.length > 0) {
    return project.photos.map((photo: ProjectPhoto) => getImageUrl(photo.url));
  }
  
  return [getFirstProjectPhotoUrl(project)];
};

/**
 * Mengecek apakah project memiliki foto
 */
export const hasProjectPhotos = (project: Project): boolean => {
  return !!(project.photos && project.photos.length > 0);
};

/**
 * Mendapatkan jumlah foto dari project
 */
export const getProjectPhotoCount = (project: Project): number => {
  return project.photos?.length || 0;
};

/**
 * Mendapatkan lokasi dari project detail
 * Fallback: gunakan description jika details tidak ada
 */
export const getProjectLocation = (project: Project): string => {
  // Coba dari details dulu
  if (project.details && project.details.length > 0) {
    const location = project.details[0].location;
    return location;
  }
  
  // Fallback: return empty atau bisa ambil dari description
  return 'Indonesia'; // Default location
};

/**
 * Mendapatkan kategori/industri dari project detail
 * Fallback: gunakan teks default
 */
export const getProjectCategory = (project: Project): string => {
  // Coba dari details dulu
  if (project.details && project.details.length > 0) {
    const category = project.details[0].industry || project.details[0].service;
    return category;
  }
  
  // Fallback: gunakan description atau default
  return project.description || 'Construction Project';
};

/**
 * Validasi URL foto
 */
export const isValidProjectPhotoUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Handle error saat loading image
 */
export const handleProjectImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string
): void => {
  const target = e.target as HTMLImageElement;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
};