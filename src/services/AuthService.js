export const AuthService = {
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          resolve({
            id: 1,
            username: username,
            name: 'Test User',
            email: 'user@example.com'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  register(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...user
        });
      }, 500);
    });
  }
};
