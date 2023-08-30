const BASE_URL = "http://localhost:5000";

const token = localStorage.getItem('token');

const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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

  delete: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la petición DELETE:", error);
      throw error;
    }
  },

  postFormData: async(endpoint, formData) =>{
    try{
      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      return data;

    }catch(error) {
      console.error("Error en la petición POST con FormData:", error);
      throw error;
  }
  },

  getTownData: async() =>{
    try {
      console.log('ejecuto get')
      const response = await fetch('http://localhost:8000/towns');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error GET", error);
      throw error;
    }
  },
  postTownData: async (endpoint, body) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
};
export default api;
