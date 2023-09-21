class PasswordService {
  
  isEmpty(password: string): boolean {
    return password.trim().length == 0;
  }

  isLongEnough(password: string): boolean {
    return password.length >= 8;
  }

  hasUppercase(password: string): boolean {
    return /[A-Z]+/.test(password);
  }

  hasLowercase(password: string): boolean {
    return /[a-z]+/.test(password);
  }

  hasNumber(password: string): boolean {
    return /[0-9]+/.test(password);
  }

  hasRequiredSpecialChar(password: string): boolean {
    return /[!@#$%^&*?_-]+/.test(password);
  }

  hasForbiddenChars(password: string): boolean {
    return /[{}[\]<>&'";]/.test(password);
  }
}

export default PasswordService
