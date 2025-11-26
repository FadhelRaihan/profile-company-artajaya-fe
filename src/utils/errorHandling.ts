// errorHandling.ts - REFACTORED
import Swal from "sweetalert2";

export const showErrorAlert = (message: string, title = 'Error') => {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
    showConfirmButton: true,
  });
}

export const showNetworkError = () => {
  Swal.fire({
    icon: 'warning',
    title: 'Connection Error',
    text: 'Unable to reach server. Please check your network.',
    showConfirmButton: false,
    timer: 3000
  });
}

export const handleApiError = (error: any) => {
  if (error.code === "ERR_NETWORK" || error.statusCode === 0) {
    showNetworkError();
  } else {
    showErrorAlert(error.message || 'An unexpected error occurred');
  }
}

