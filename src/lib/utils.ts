import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const validateNameField = (
  nameValue: string,
  handleError: (msg: string) => void,
): boolean => {
  const trimmedName = nameValue.trim(),
    nameRegex = /^[a-zA-Z\s]+$/;

  if (trimmedName.length < 2) {
    handleError('Name must be at least 2 characters.');
    return false;
  }

  if (!nameRegex.test(trimmedName)) {
    handleError('Name must contain only letters with spaces.');
    return false;
  }

  if (trimmedName.length === 0) {
    handleError('Name cannot be only spaces.');
    return false;
  }

  return true;
};

export const validateEmailField = (
  emailValue: string,
  handleError: (msg: string) => void,
): boolean => {
  const trimmedEmail = emailValue.trim(),
    emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!trimmedEmail) {
    handleError('Email is required.');
    return false;
  }

  if (!emailRegex.test(trimmedEmail)) {
    handleError('Please provide a valid email address.');
    return false;
  }

  return true;
};
