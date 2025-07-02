export const loginAPI = "/auth/signin";
export const loginEmployeeAPI = "/auth/signin-employee";
export const signupEmployeeAPI = "/auth/signup-employee";
export const signUpAPI = "/auth/signup";
export const logoutAPI = "/auth/signOut";
export const meAPI = "auth/me";
export const getAllUserAPI = "auth/getalluser";
export const getAllEmployeeAPI = "auth/getallemployee";
export const deleteUserAPI = (id: string) => {
  return `/auth/deleteUser/${id}`;
};
export const deleteEmployeeAPI = (id: string) => {
  return `/auth/deleteEmployee/${id}`;
};
