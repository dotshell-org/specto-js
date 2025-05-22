import axios from 'axios';

export type SpectoClientOptions = {
  baseUrl: string;
  apiKey?: string; // For log ingestion
  password?: string; // For user endpoints
};

export class SpectoClient {
  private axios: any;
  private apiKey?: string;
  private password?: string;

  constructor(options: SpectoClientOptions) {
    this.apiKey = options.apiKey;
    this.password = options.password;
    this.axios = axios.create({
      baseURL: options.baseUrl,
    });
    // Attach interceptors for auth
    this.axios.interceptors.request.use((config: any) => {
      if (this.apiKey && config.url?.startsWith('/api/logs') && config.method === 'post') {
        config.headers = { ...config.headers, 'x-api-key': this.apiKey };
      } else if (this.password) {
        config.auth = { username: '', password: this.password };
      }
      return config;
    });
  }

  // --- LOGS ---
  async getLogs(params?: {
    pageId?: string;
    severity?: 'info' | 'warning' | 'error' | 'debug' | 'critical';
    [key: string]: any;
  }) {
    try {
      const res = await this.axios.get('/api/logs', { params });
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async createLog(body: { message: string; severity: string; pageId: string; [key: string]: any }) {
    try {
      const res = await this.axios.post('/api/logs', body);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getLogAnalytics() {
    try {
      const res = await this.axios.get('/api/logs/analytics');
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getLogAnomalies() {
    try {
      const res = await this.axios.get('/api/logs/anomalies');
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getLogPatterns() {
    try {
      const res = await this.axios.get('/api/logs/patterns');
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getLogPerformance() {
    try {
      const res = await this.axios.get('/api/logs/performance');
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async deleteLog(id: string) {
    try {
      const res = await this.axios.delete('/api/logs', { params: { id } });
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  // --- PAGES ---
  async getPages() {
    try {
      const res = await this.axios.get('/api/pages');
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async createPage(body: { title: string; emoji: string }) {
    try {
      const res = await this.axios.post('/api/pages', body);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getPage(id: string) {
    try {
      const res = await this.axios.get(`/api/pages/${id}`);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async updatePage(id: string, body: { title: string; emoji: string }) {
    try {
      const res = await this.axios.put(`/api/pages/${id}`, body);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async deletePage(id: string) {
    try {
      const res = await this.axios.delete(`/api/pages/${id}`);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async deleteAllPages() {
    try {
      const res = await this.axios.delete('/api/pages/delete-all');
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  // --- RETENTION POLICIES ---
  async getRetentionPolicies() {
    try {
      const res = await this.axios.get('/api/retention');
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async createRetentionPolicy(body: { name: string; daysToRetain: number }) {
    try {
      const res = await this.axios.post('/api/retention', body);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async updateRetentionPolicy(id: string, body: { name: string; daysToRetain: number }) {
    try {
      const res = await this.axios.put(`/api/retention/${id}`, body);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async deleteRetentionPolicy(id: string) {
    try {
      const res = await this.axios.delete(`/api/retention/${id}`);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  // --- Error Handling ---
  private handleError(err: unknown): never {
    // Use duck-typing for AxiosError
    if (err && typeof err === 'object' && 'isAxiosError' in err) {
      const error = err as any;
      throw new Error(
        error.response?.data?.message || error.message || 'Specto API request failed.'
      );
    }
    throw err;
  }
}
