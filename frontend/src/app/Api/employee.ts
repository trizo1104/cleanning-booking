export const AssBookingsgAPI = `/employee/bookings`;

export const updateBookingStatusAPI = (id: string) => {
  return `employee/bookings/${id}/status`;
};

export const getBookingsByDateAPi = `/employee/bookings/date`;

export const addStaffNoteAPI = (id: string) => {
  return `/bookings/${id}/note`;
};
