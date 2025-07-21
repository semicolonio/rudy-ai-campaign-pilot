// Mock API client for the landing page demo
const apiClient = {
  get: async (url: string) => {
    // Mock Google login URL
    if (url === '/auth/login/google') {
      return {
        data: {
          authorization_url: 'https://accounts.google.com/oauth/authorize?client_id=demo'
        }
      };
    }
    return { data: {} };
  },
  
  post: async (url: string, data: any) => {
    // Mock waitlist submission
    if (url === '/waiting-list') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      return { data: { success: true } };
    }
    return { data: {} };
  }
};

export default apiClient;