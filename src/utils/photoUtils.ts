import type { Activities, ActivitiesPhotos } from '@/types/index';

/**
 * Utility functions untuk menangani photos dari kegiatan
 */

/**
 * Mendapatkan URL foto pertama dari kegiatan
 * Fallback ke placeholder jika tidak ada foto
 */
export const getFirstPhotoUrl = (activity: Activities): string => {
  if (activity.photos && activity.photos.length > 0) {
    return activity.photos[0].url;
  }
  
  // Fallback ke placeholder dengan seed dari kegiatanId
  return `https://picsum.photos/seed/${activity.kegiatanId}/800/600`;
};

/**
 * Mendapatkan semua URL foto dari kegiatan
 */
export const getAllPhotoUrls = (activity: Activities): string[] => {
  if (activity.photos && activity.photos.length > 0) {
    return activity.photos.map((photo: ActivitiesPhotos) => photo.url);
  }
  
  return [getFirstPhotoUrl(activity)];
};

/**
 * Mengecek apakah kegiatan memiliki foto
 */
export const hasPhotos = (activity: Activities): boolean => {
  return !!(activity.photos && activity.photos.length > 0);
};

/**
 * Mendapatkan jumlah foto dari kegiatan
 */
export const getPhotoCount = (activity: Activities): number => {
  return activity.photos?.length || 0;
};

/**
 * Memformat tanggal kegiatan ke format Indonesia
 */
export const formatActivityDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Memformat tanggal kegiatan ke format singkat
 */
export const formatActivityDateShort = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Mendapatkan placeholder image dengan seed yang konsisten
 */
export const getPlaceholderImage = (seed: string, width: number = 800, height: number = 600): string => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

/**
 * Validasi URL foto
 */
export const isValidPhotoUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Mendapatkan thumbnail URL (untuk optimisasi loading)
 * Jika backend Anda support thumbnail, sesuaikan logic ini
 */
export const getThumbnailUrl = (photoUrl: string): string => {
  // Jika backend Anda punya endpoint thumbnail, implementasikan di sini
  // Contoh: return photoUrl.replace('/photos/', '/thumbnails/');
  
  // Sementara return URL asli
  return photoUrl;
};

/**
 * Handle error saat loading image
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string
): void => {
  const target = e.target as HTMLImageElement;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
};