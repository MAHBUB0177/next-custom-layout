
import axios from "axios";
import { signOut } from "next-auth/react";




export interface AuthDataType {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiration: string;
  tokenExpiration: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
});


axiosInstance.interceptors.request.use(async (config) => {
     const user = localStorage.getItem("user"); 
const token = user ? JSON.parse(user) : null; 
  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
              const user = localStorage.getItem("user"); 
const token = user ? JSON.parse(user) : null; 
      const sendobj = {
        refreshToken: token?.refreshToken,
      };

      try {
          // Attempt to refresh the token
          const refreshTokenResponse = await axios.post(
            'https://node-express-hostapi.vercel.app/api/user/refreshToken',
            sendobj
          );
          const newAuthData = refreshTokenResponse?.data?.data;

          if (newAuthData?.accessToken) {
            // Save the new tokens and retry the original request
            localStorage.setItem("user", JSON.stringify(newAuthData));
            originalRequest.headers["Authorization"] = "Bearer " + newAuthData.accessToken;
            return axiosInstance(originalRequest);
          }
        
      } catch (refreshError) {
        handelLogout(); // Log out if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Helper function for logging out the user
const handelLogout = () => {
  localStorage.setItem("user", JSON.stringify({}));
  signOut({ callbackUrl: "/" });
}

export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://node-express-hostapi.vercel.app/",
// });

// // Add interceptor to attach token
// axiosInstance.interceptors.request.use(
//   (config) => {
    
//     const user = localStorage.getItem("user"); 
// const token = user ? JSON.parse(user) : null; 
//     console.log(token?.accessToken,'token====')
//     console.log(token,'token====user')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token?.accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;
