import { API_CONFIG } from './constants';
import { toast } from '@/components/ui/use-toast';

/**
 * Type-safe API client with error handling and authentication support
 */

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; status?: number };

export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Unknown error occurred',
      }));
      return {
        success: false,
        error: error.message || 'Request failed',
        status: response.status,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    clearTimeout(timeoutId);
    const errorMessage =
      error instanceof Error ? error.message : 'Network request failed';

    toast({
      title: 'Network Error',
      description: errorMessage,
      variant: 'destructive',
    });

    return { success: false, error: errorMessage };
  }
}

// Auth API
export const authApi = {
  async login(credentials: { email: string; password: string }) {
    return api<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async register(userData: { email: string; password: string; name: string }) {
    return api<{ id: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

// Materials API
export const materialsApi = {
  async getAll(params?: { page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.limit) query.set('limit', params.limit.toString());
    return api<{ materials: Material[]; total: number }>(`/materials?${query}`);
  },

  async upload(formData: FormData) {
    return api<{ id: string }>('/materials', {
      method: 'POST',
      body: formData,
      headers: {
        // Let browser set Content-Type with boundary
      },
    });
  },

  async delete(id: string) {
    return api(`/materials/${id}`, { method: 'DELETE' });
  },
};

// Types
interface Material {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  course: string;
}
