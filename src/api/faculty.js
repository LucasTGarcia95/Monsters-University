const BASE_URL = "http://localhost:3000";

// Get all faculty
export const getAllFaculty = async () => {
  const response = await fetch(`${BASE_URL}/faculty`);
  return response.json();
};

// Get a single faculty member by ID
export const getFacultyById = async (id) => {
  const response = await fetch(`${BASE_URL}/faculty/${id}`);
  return response.json();
};

// Create a new faculty member (admin only)
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

// Update an existing faculty member (admin only)
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

// Delete a faculty member (admin only)
export const deleteFaculty = async (id, token) => {
  const response = await fetch(`${BASE_URL}/faculty/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
