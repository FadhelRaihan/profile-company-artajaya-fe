//=================================
// TYPSCRIPT INTERFACES (TYPES) ||
//=================================

/**
* Project Types
*/
export interface Project {
    id: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    imageUrl: string;
    images?: string[];
    value?: string;
    status: 'completed' | 'ongoing' | 'planning';
    createdAt: string;
    updatedAt: string;
}

export interface ProjectResponse {
    success: boolean;
    data: Project[];
    total: number;
    page: number;
    limit: number;
}
/**
* End Project Types
*/


/**
* Team Types
*/
export interface TeamMember {
    id: string;
    name: string;
    position: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface TeamMemberResponse {
    success: boolean;
    data: TeamMember[];
    total: number;
}
/**
* End Team Types
*/


/**
* Testimonials Types
*/
export interface Testimonials {
    id: string;
    testerName: string;   // nama_tester
    testimoni: string;      // testimoni
    isActive: boolean;    // is_active
    createdBy: string;    // created_by
    createdAt: string;    // created_at
    updatedAt: string;    // updated_at
}

//Raw database response (snake_case)
export interface TestimonialsDB {
    id: string;
    nama_tester: string;
    testimoni: string;
    is_active: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
}

//Testimonials Response (GET All / GET Detail)
export interface TestimonialsResponse {
    success: boolean;
    data: Testimonials[];
    total: number;
}

//Create Testimonials (REQUEST)
export interface CreateTestimonials {
    testerName: string;
    message: string;
    createdBy: string; 
    isActive?: boolean; // default: true
}

//Create Testimonials Response
export interface CreateTestimonialsResponse {
    success: boolean;
    message: string;
    data: Testimonials;   // bukan array, karena 1 record dibuat
}
/**
* End Testimonials Types
*/


/**
* Activities Types
*/
// ✅ FIXED: Activities Types - Sesuai struktur database
export interface ActivitiesPhotos {
  kegiatanId: string;
  id_kegiatan: string;
  photo_name: string;
  url: string;
}

export interface Activities {
  kegiatanId: string; // ✅ UBAH dari id ke kegiatanId (sesuai backend)
  nama_kegiatan: string;
  deskripsi_singkat: string;
  lokasi_kegiatan: string;
  tanggal_kegiatan: string;
  is_active: boolean;
  created_by: string;
  createdAt: string; // ✅ UBAH dari created_at ke createdAt (sesuai backend)
  updatedAt: string; // ✅ UBAH dari updated_at ke updatedAt (sesuai backend)
  photos?: ActivitiesPhotos[];
}

 /**
 *Raw Database
 */
export interface ActivitiesDB {
    kegiatanId: string;
    nama_kegiatan: string;
    deskripsi_singkat: string;
    lokasi_kegiatan: string;
    tanggal_kegiatan: string;
    is_active: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface ActivitiesResponse {
  success: boolean;
  message: string;
  data: Activities[];
  total?: number;
  page?: number;
  limit?: number;
  timestamp: string;
}

export interface ActivitiesDetailResponse {
  success: boolean;
  message: string;
  data: Activities;
  timestamp: string;
}
/**
* End Activities Types
*/


/**
* Contact Form Types
*/
export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface ContactFormResponse {
    success: boolean;
    message: string;
    data?: {
        id: string;
        createdAt: string;
    };
}
/**
* End Contact Form Types
*/


/**
*API Error Types
*/
export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
    statusCode: number;
}
/**
*End API Error Types
*/


// ====================
// Redux State Types ||
// ====================

/**
*Project State
*/
export interface ProjectsState {
    projects: Project[];
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    limit: number;
}
/**
*End Project State
*/


/**
*Team State
*/
export interface TeamsState {
    teams: TeamMember[];
    loading: boolean;
    error: string | null;
    total: number;
}
/**
*End Team State
*/


/**
*Testimonials State
*/
export interface TestimonialsState {
    testimonials: Testimonials[];
    loading: boolean;
    error: string | null;
    submitting: boolean;
    submitSuccess: boolean;
    total: number;
}
/**
*Testimonials State
*/


/**
*Contact State
*/
export interface ContactsState {
    loading: boolean;
    success: boolean;
    error: string | null;
}
/**
*End Contact State
*/


/**
*Activities State
*/
export interface ActivitiesState {
  kegiatan: Activities[];
  selectedKegiatan: Activities | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}
/**
*End Activities State
*/


//=====================
//FILTERS AND PARAMS ||
//=====================

/**
*Projects Filters
*/
export interface ProjectFilters {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}
/**
*End Projects Filters
*/

/**
*Teams Filters
*/
export interface TeamFilters {
    search?: string;
}
/**
*End Team Filters
*/

/**
*Activities Filters
*/
export interface ActivitiesFilters {
  is_active?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: 'tanggal_kegiatan' | 'createdAt' | 'nama_kegiatan';
}
/**
*Activities Filters
*/


//===========================
// ADD CREATE/UPDATE TYPES ||
//===========================

/**
*Create/Update Activities Types
*/
export interface CreateActivitiesDTO {
    nama_kegiatan: string;
    deskripsi_singkat: string;
    lokasi_kegiatan: string;
    tanggal_kegiatan: string; // Format: YYYY-MM-DD
    is_active: boolean;
}

export interface UpdateActivitiesDTO extends Partial<CreateActivitiesDTO> {
    id: string;
}
/**
*End Create/Update Activities Types
*/


/**
*Create/Update Testimonials Types
*/
export interface UpdateTestimonialsDTO {
    id: string;  
    testerName?: string;
    message?: string;
    isActive?: boolean;
}
/**
*End Create/Update Testimonials Types
*/

//========================
//Upload Photo Response ||
//========================
export interface UploadPhotoResponse {
  success: boolean;
  message: string;
  data: ActivitiesPhotos[];
}