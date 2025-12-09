// ✅ PENTING: Ambil dari .env.local
const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const API_BASE = VITE_API_URL.replace('/api/v1', '') || 'http://localhost:3000'; // Base tanpa /api/v1


// ✅ TAMBAH: Utility function untuk resolve image URL
export const getImageUrl = (photoUrl: string | null | undefined): string => {
  if (!photoUrl) {
    return '/default-avatar.png'; // Fallback ke default avatar
  }

  // Jika sudah absolute URL, return as is
  if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }

  // Jika relative path, tambah base API URL
  return `${API_BASE}${photoUrl.startsWith('/') ? photoUrl : '/' + photoUrl}`;
};