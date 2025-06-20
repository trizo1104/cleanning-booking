export const createBookingAPI = "/booking";

export const reviewBookingAPI = (id: string) => {
  return `/booking/${id}/review`;
};

export const getReviewAPI = (serviceId: string) =>
  `/booking/service/${serviceId}`;
