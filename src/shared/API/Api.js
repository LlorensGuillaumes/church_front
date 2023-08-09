const BASE_URL = "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("token");
};

const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error GET", error);
      throw error;
    }
  },
  post: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición POST:", error);
      throw error;
    }
  },


  put: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición PUT:", error);
      throw error;
    }
  },

  postFormData: async(endpoint, formData) =>{
    try{
      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });

      const data = await response.json();
      return data;

    }catch(error) {
      console.error("Error en la petición POST con FormData:", error);
      throw error;
  }
  }
};
export default api;
