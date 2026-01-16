const API_URL = 'http://localhost:3000/api';

export const AuthService = {
  async login(username, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("AuthService Login Error:", error);
      // For the purpose of the demo environment where backend might not be running:
      if (error.message.includes('Failed to fetch')) {
         throw new Error('Connection to backend failed. Is the server running on port 3000?');
      }
      throw error;
    }
  },

  async register(user) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
       console.error("AuthService Register Error:", error);
       if (error.message.includes('Failed to fetch')) {
         throw new Error('Connection to backend failed. Is the server running on port 3000?');
      }
       throw error;
    }
  }
};
