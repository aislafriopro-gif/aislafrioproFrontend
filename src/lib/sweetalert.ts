import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Paleta de colores obtenida de src/styles/variables.css
// --color-primary: #0350BA;
// --color-secondary: #4A8C04;
// --color-accent: #F69608;

export const CorporateAlert = MySwal.mixin({
  confirmButtonColor: '#0350BA',
  cancelButtonColor: '#F69608',
  background: '#ffffff',
  color: '#171717',
  customClass: {
    confirmButton: 'px-6 py-2.5 rounded-md font-medium text-white shadow-sm hover:bg-opacity-90',
    cancelButton: 'px-6 py-2.5 rounded-md font-medium text-white shadow-sm hover:bg-opacity-90',
    popup: 'rounded-xl shadow-xl border border-gray-100',
    title: 'text-gray-900 font-bold',
    htmlContainer: 'text-gray-500 text-sm'
  }
});

export const showAlertSuccess = (title: string, text: string) => {
  return CorporateAlert.fire({
    icon: 'success',
    title: title,
    text: text,
    iconColor: '#4A8C04',
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true
  });
};

export const showAlertError = (title: string, text: string) => {
  return CorporateAlert.fire({
    icon: 'error',
    title: title,
    text: text,
  });
};
