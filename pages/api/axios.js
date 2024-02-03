import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

/**
 * Creates an instance of Axios with a specified base URL. This instance is used to make unauthenticated requests.
 * Basically, it is used to get or refresh tokens
 * 
 * @param {string} baseURL - The base URL for all requests made by this instance.
 * @returns {AxiosInstance} - An Axios instance with the specified base URL.
 */
export default axios.create({
  baseURL: BACKEND_URL,
})

/**
 * Creates an instance of axios with private configuration.
 * This axios instances has interceptors attached to it. 
 * The interceptors add the authorization header to each request and handle token refreshing and retries failed requests with a new access token.
 * 
 * @returns {Object} - The axios instance with private configuration.
 */
export const axiosPrivate = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
})