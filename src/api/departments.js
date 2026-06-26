const BASE_URL = "http://localhost:3000";

// Get all departments
export const getAllDepartments = async () => {
  const response = await fetch(`${BASE_URL}/departments`);
  return response.json();
};

// Get a single department by ID
export const getDepartmentById = async (id) => {
  const response = await fetch(`${BASE_URL}/departments/${id}`);
  return response.json();
};

// Create a new department (admin only)
export const createDepartment = async (departmentData, token) => {
  const response = await fetch(`${BASE_URL}/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(departmentData),
  });
  return response.json();
};

// Update an existing department (admin only)
export const updateDepartment = async (id, departmentData, token) => {
  const response = await fetch(`${BASE_URL}/departments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(departmentData),
  });
  return response.json();
};

// Delete a department (admin only)
export const deleteDepartment = async (id, token) => {
  const response = await fetch(`${BASE_URL}/departments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
