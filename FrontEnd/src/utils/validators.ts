/**
 * Validate phone number
 */
export const validatePhone = (phone: string): string | null => {
  if (!phone || phone.trim() === '') {
    return 'required';
  }

  const cleaned = phone.replace(/\D/g, '');

  // Georgian mobile numbers
  // With country code: 995 + 5XX XXX XXX (12 digits)
  // Without country code: 5XX XXX XXX (9 digits)
  
  if (cleaned.startsWith('995')) {
    if (cleaned.length !== 12) {
      return 'invalidPhone';
    }
    if (cleaned[3] !== '5') {
      return 'invalidPhone';
    }
  } else if (cleaned.startsWith('5')) {
    if (cleaned.length !== 9) {
      return 'invalidPhone';
    }
  } else {
    return 'invalidPhone';
  }

  return null; // Valid
};

/**
 * Validate email
 */
export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') {
    return null; // Email is optional
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'invalidEmail';
  }

  return null; // Valid
};

/**
 * Validate name
 */
export const validateName = (name: string): string | null => {
  if (!name || name.trim() === '') {
    return null; // Name is optional
  }

  if (name.trim().length < 2) {
    return 'nameTooShort';
  }

  if (name.trim().length > 100) {
    return 'nameTooLong';
  }

  return null; // Valid
};

/**
 * Validate message
 */
export const validateMessage = (message: string): string | null => {
  if (!message || message.trim() === '') {
    return null; // Message is optional
  }

  if (message.trim().length > 1000) {
    return 'messageTooLong';
  }

  return null; // Valid
};

/**
 * Sanitize phone number - normalize to consistent format
 */
export const sanitizePhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if not present
  if (cleaned.startsWith('5') && cleaned.length === 9) {
    return `995${cleaned}`;
  }
  
  return cleaned;
};

/**
 * Validate entire form
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateLeadForm = (data: {
  phone: string;
  name?: string;
  message?: string;
}): FormValidationResult => {
  const errors: Record<string, string> = {};

  const phoneError = validatePhone(data.phone);
  if (phoneError) {
    errors.phone = phoneError;
  }

  if (data.name) {
    const nameError = validateName(data.name);
    if (nameError) {
      errors.name = nameError;
    }
  }

  if (data.message) {
    const messageError = validateMessage(data.message);
    if (messageError) {
      errors.message = messageError;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
