const BASE_URL = "http://localhost:3000";

export const getAllDepartments = async () => {
  const response = await fetch(`${BASE_URL}/departments`);
  return response.json();
};

export const getDepartmentById = async (id) => {
  const response = await fetch(`${BASE_URL}/departments/${id}`);
  return response.json();
};

export const createDepartment = async (departmentData, token) => {
  const response = await fetch(`${BASE_URL}/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(departmentData)
  });
  return response.json();
};

export const updateDepartment = async (id, departmentData, token) => {
  const response = await fetch(`${BASE_URL}/departments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(departmentData)
  });
  return response.json();
};

export const deleteDepartment = async (id, token) => {
  const response = await fetch(`${BASE_URL}/departments/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return response.json();
};
