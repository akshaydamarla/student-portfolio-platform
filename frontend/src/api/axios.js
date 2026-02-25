import axios from "axios";

const instance = axios.create({
  baseURL: "https://student-portfolio-platform-0fsw.onrender.com",
});

// Attach token to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auto logout on 401 or 403
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Only logout on 401 (Unauthorized / expired token)
      if (status === 401|| status === 403) {
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;