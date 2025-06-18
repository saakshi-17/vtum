import { FILE_CONFIG, UI } from './constants';

/**
 * Utility functions for the application
 * Includes responsive helpers, file handling, and formatting utilities
 */

// Tailwind class merging utility
export function cn(...classes: Array<string | boolean | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

// Responsive helpers
export function isMobileView(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768; // md breakpoint
}

// File utilities
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function validateFile(file: File): { valid: boolean; message?: string } {
  if (!FILE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: `Unsupported file type. Allowed: ${FILE_CONFIG.ALLOWED_TYPES.join(', ')}`,
    };
  }

  if (file.size > FILE_CONFIG.MAX_SIZE) {
    return {
      valid: false,
      message: `File too large (max ${formatFileSize(FILE_CONFIG.MAX_SIZE)})`,
    };
  }

  return { valid: true };
}

// Text formatting
export function truncate(text: string, maxLength: number = UI.MAX_TITLE_LENGTH): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// Performance utilities
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
