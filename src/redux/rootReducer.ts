import { combineReducers } from '@reduxjs/toolkit';
import kegiatanReducer from './kegiatan/kegiatanSlice';
import testimoniReducer from './testimoni/testimoniSlice';

const rootReducer = combineReducers({
  kegiatan: kegiatanReducer,
  testimoni: testimoniReducer,
  // projects: projectsReducer,
  // Tambahkan reducer lain di sini sesuai kebutuhan
});

export default rootReducer;