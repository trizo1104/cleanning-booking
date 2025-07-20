export const createBookingAPI = "/booking";

export const reviewBookingAPI = (id: string) => {
  return `/booking/${id}/review`;
};

export const getReviewAPI = (serviceId: string) =>
  `/booking/service/${serviceId}`;

export const CancelAssAPI = (serviceId: string) =>
  `/booking/cancelAssigned/${serviceId}`;

export const getAllReviewAdmin = "/booking/allReviews";

export const deleteReviewAPI = (serviceId: string) =>
  `/booking/deleteReview/${serviceId}`;
