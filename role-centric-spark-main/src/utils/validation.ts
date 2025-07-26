export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  
  if (name.length < 20) {
    errors.push('Name must be at least 20 characters long');
  }
  if (name.length > 60) {
    errors.push('Name must not exceed 60 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateAddress = (address: string): ValidationResult => {
  const errors: string[] = [];
  
  if (address.length > 400) {
    errors.push('Address must not exceed 400 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (password.length > 16) {
    errors.push('Password must not exceed 16 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};