/**
 * Application-wide constants and configuration
 * Includes responsive breakpoints, API config, and UI constants
 */

// Breakpoints for responsive design (matches Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,    // Small screens (mobile)
  md: 768,    // Medium screens (tablet)
  lg: 1024,   // Large screens (laptop)
  xl: 1280,   // Extra large screens (desktop)
  '2xl': 1536 // 2X large screens
};

// API Configuration
export const API_BASE_URL = "http://localhost:5000/api";

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 seconds timeout
  MAX_RETRIES: 2,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile'
    },
    MATERIALS: {
      BASE: '/materials',
      UPLOAD: '/materials/upload',
      BY_COURSE: '/materials/course'
    }
  }
};

// File upload configuration
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'application/pdf',                                      // PDF
    'application/msword',                                   // DOC
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'text/plain',                                           // TXT
    'application/vnd.ms-powerpoint',                        // PPT
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
    'application/vnd.ms-excel',                             // XLS
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
    'application/zip'                                       // ZIP
  ],
  TYPE_ICONS: {
    pdf: 'file-pdf',
    doc: 'file-word',
    docx: 'file-word',
    txt: 'file-text',
    ppt: 'file-presentation',
    pptx: 'file-presentation',
    xls: 'file-spreadsheet',
    xlsx: 'file-spreadsheet',
    zip: 'file-archive',
    default: 'file'
  }
};

// UI Constants
export const UI = {
  TOAST_DURATION: 4000, // 4 seconds
  MAX_INPUT_LENGTHS: {
    TITLE: 60,
    DESCRIPTION: 120,
    FILENAME: 80
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50]
  },
  LOADING_DELAY: 300 // milliseconds
};

// Application Routes
export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    ABOUT: '/about'
  },
  PRIVATE: {
    DASHBOARD: '/dashboard',
    MATERIALS: '/materials',
    UPLOAD: '/upload',
    PROFILE: '/profile',
    SETTINGS: '/settings'
  }
};

// Course categories (VTU specific)
export const COURSES = [
  { value: 'cse', label: 'Computer Science & Engineering' },
  { value: 'ece', label: 'Electronics & Communication' },
  { value: 'eee', label: 'Electrical & Electronics' },
  { value: 'mech', label: 'Mechanical Engineering' },
  { value: 'civil', label: 'Civil Engineering' },
  { value: 'aero', label: 'Aeronautical Engineering' },
  { value: 'ai-ml', label: 'AI & Machine Learning' },
  { value: 'cyber', label: 'Cyber Security' }
];

// Semester options
export const SEMESTERS = [
  { value: '1', label: '1st Semester' },
  { value: '2', label: '2nd Semester' },
  { value: '3', label: '3rd Semester' },
  { value: '4', label: '4th Semester' },
  { value: '5', label: '5th Semester' },
  { value: '6', label: '6th Semester' },
  { value: '7', label: '7th Semester' },
  { value: '8', label: '8th Semester' }
];

// Material types
export const MATERIAL_TYPES = [
  { value: 'notes', label: 'Lecture Notes' },
  { value: 'assignment', label: 'Assignments' },
  { value: 'question-paper', label: 'Question Papers' },
  { value: 'lab-manual', label: 'Lab Manuals' },
  { value: 'project', label: 'Projects' },
  { value: 'other', label: 'Other Materials' }
];

// LocalStorage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'vtu_auth_token',
  USER_DATA: 'vtu_user_data',
  RECENT_MATERIALS: 'vtu_recent_materials',
  PREFERENCES: 'vtu_user_prefs'
};

// Default user preferences
export const DEFAULT_PREFS = {
  darkMode: false,
  defaultCourse: 'cse',
  defaultSemester: '3',
  itemsPerPage: 10
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Please login to access this resource',
    SESSION_EXPIRED: 'Your session has expired'
  },
  FILES: {
    INVALID_TYPE: `Unsupported file type. Allowed types: ${FILE_CONFIG.ALLOWED_TYPES.join(', ')}`,
    SIZE_LIMIT: `File size exceeds limit of ${FILE_CONFIG.MAX_SIZE / (1024 * 1024)}MB`,
    UPLOAD_FAILED: 'File upload failed. Please try again.'
  },
  FORM: {
    REQUIRED: 'This field is required',
    EMAIL: 'Please enter a valid email address',
    PASSWORD_LENGTH: 'Password must be at least 8 characters',
    PASSWORD_MATCH: 'Passwords do not match'
  }
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Logged in successfully',
  LOGOUT: 'Logged out successfully',
  REGISTER: 'Account created successfully',
  UPLOAD: 'File uploaded successfully',
  DELETE: 'File deleted successfully'
};

