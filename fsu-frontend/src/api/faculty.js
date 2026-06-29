const BASE_URL = "http://localhost:3000";

export const getAllFaculty = async () => {
  const response = await fetch(`${BASE_URL}/faculty`);
  return response.json();
};

export const getFacultyById = async (id) => {
  const response = await fetch(`${BASE_URL}/faculty/${id}`);
  return response.json();
};

export const createFaculty = async (facultyData, token) => {
  const response = await fetch(`${BASE_URL}/faculty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(facultyData),
  });
  return response.json();
};

export const updateFaculty = async (id, facultyData, token) => {
  const response = await fetch(`${BASE_URL}/faculty/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(facultyData),
  });
  return response.json();
};

export const deleteFaculty = async (id, token) => {
  const response = await fetch(`${BASE_URL}/faculty/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
