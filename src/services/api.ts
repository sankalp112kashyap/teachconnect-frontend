// src/services/api.ts
// Mock API client that uses localStorage instead of real API calls

export const apiClient = {
  get: async (path: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Extract the key from the path
    const key = path.split('/').pop() || '';
    
    const data = localStorage.getItem(key);
    if (!data) {
      return { data: [] };
    }
    
    return JSON.parse(data);
  },

  post: async (path: string, data: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Extract the key from the path
    const key = path.split('/').pop() || '';
    
    // If there's existing data, append to it
    const existingData = localStorage.getItem(key);
    let newData;
    
    if (existingData) {
      const parsed = JSON.parse(existingData);
      if (Array.isArray(parsed)) {
        // Add ID if it doesn't exist
        if (!data.id) {
          data.id = `${key}_${Date.now()}`;
        }
        newData = [...parsed, data];
      } else {
        newData = { ...parsed, ...data };
      }
    } else {
      if (Array.isArray(data)) {
        newData = data;
      } else {
        // Add ID if it doesn't exist
        if (!data.id) {
          data.id = `${key}_${Date.now()}`;
        }
        newData = [data];
      }
    }
    
    localStorage.setItem(key, JSON.stringify(newData));
    return data;
  },

  put: async (path: string, data: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Extract the key from the path
    const key = path.split('/').pop() || '';
    
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  },

  delete: async (path: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Extract the key from the path
    const key = path.split('/').pop() || '';
    
    localStorage.removeItem(key);
    return { success: true };
  },
};