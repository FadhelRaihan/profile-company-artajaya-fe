//=================================
// TYPESCRIPT INTERFACES (TYPES) ||
//=================================


/**
* Employee/Team Member Types
*/
export interface EmployeeMember {
    id: string;
    full_name: string;
    phoneNumber: string;
    email: string;
    joinDate: string;
    positionId: string;
    photo_url: string;
    position?: Position;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface EmployeeMemberResponse {
    success: boolean;
    data: EmployeeMember[];
    total: number;
}
/**
* End Team Types
*/

/**
 * Position types
 */
export interface Position {
  id: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}


/**
* Testimonials Types
*/
export interface Testimonials {
    id: string;
    nama_tester: string;
    testimoni: string;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
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
    isActive?: boolean;
}

//Create Testimonials Response
export interface CreateTestimonialsResponse {
    success: boolean;
    message: string;
    data: Testimonials;
}
/**
* End Testimonials Types
*/


/**
* Activities Types
*/
export interface ActivitiesPhotos {
  kegiatanId: string;
  id_kegiatan: string;
  photo_name: string;
  url: string;
}

export interface Activities {
  kegiatanId: string;
  nama_kegiatan: string;
  deskripsi_singkat: string;
  lokasi_kegiatan: string;
  tanggal_kegiatan: string;
  is_active: boolean;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  photos?: ActivitiesPhotos[];
}

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
* Employee State
*/
export interface EmployeeState {
    employees: EmployeeMember[];
    loading: boolean;
    error: string | null;
    total: number;
    positions: string[];
}
/**
*End Employee State
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
* Employee Filters
*/
export interface EmployeeFilters {
    search?: string;
    position?: string;
}
/**
*End Employee Filters
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
    tanggal_kegiatan: string;
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