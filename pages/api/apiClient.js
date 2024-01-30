
class APIClient {
  /**
   * Initializes the APIClient instance and sets the base URL for API requests.
   */
  constructor() {
    this.baseURL = process.env.BACKEND_URL;
  }

  /**
   * Returns the singleton instance of the APIClient class.
   * @returns {APIClient} The singleton instance of the APIClient class.
   */
  static getInstance() {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  /**
   * Fetches an access token from the backend server using a Google access token.
   * @param {string} googleAccessToken - The Google access token.
   * @returns {Promise<Object>} A promise that resolves to the response JSON object.
   * @throws {Error} If the request fails or the response is not OK.
   */
  async fetchAccessToken(googleAccessToken) {
    try {
      console.log("Lanzando fetch con token:", googleAccessToken);
      const response = await fetch(`${this.baseURL}/api/token/auth/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: googleAccessToken,
          origin: "page",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch access token");
    }
  }

  /**
   * Fetches tutorship instances from the backend server using an access token.
   * @param {string} accessToken - The access token.
   * @returns {Promise<Object>} A promise that resolves to the response JSON object.
   * @throws {Error} If the request fails or the response is not OK.
   */
  async fetchTutorshipInstances(accessToken) {
    try {
      const response = await fetch(
        `${this.baseURL}/api/tutorship-instances/?page=tutorship_page&role=COORD`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch tutorship instances");
    }
  }
}

export default APIClient;
