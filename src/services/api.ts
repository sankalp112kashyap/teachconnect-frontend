const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper for handling HTTP errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const error = new Error(
      errorData?.message || `API error: ${response.status} ${response.statusText}`
    );
    throw error;
  }
  return response.json();
};

// Base API client with common configuration
export const apiClient = {
  get: async (path: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return handleResponse(response);
  },

  post: async (path: string, data: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (path: string, data: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (path: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return handleResponse(response);
  },
};
