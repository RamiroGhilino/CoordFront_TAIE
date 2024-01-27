// Acá se encuentran todas las funciones que corresponden a un endpoint de la API 


export const fetchAccessToken = async (accessToken) => {
    try {
      const response = await fetch("https://backend-taie.onrender.com/api/token/auth/", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
          origin: "page",
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      throw new Error("Failed to fetch access token");
    }
  };
  
  export const fetchTutorshipInstances = async (accessToken) => {
    try {
      const response = await fetch(
        "https://backend-taie.onrender.com/api/tutorship-instances/?page=tutorship_page&role=COORD",
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
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch tutorship instances");
    }
  };