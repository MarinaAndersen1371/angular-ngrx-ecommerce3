import { AbstractControl, ValidationErrors } from '@angular/forms';

export function randomString(length: any) {
  var randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

export function passwordMatchValidator(
  group: AbstractControl
): ValidationErrors | null {
  const password = group.get('password');
  const confirmPassword = group.get('passwordConfirm');
  if (password && confirmPassword) {
    if (password.value !== confirmPassword.value) {
      confirmPassword?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      confirmPassword?.setErrors(null);
    }
  }
  return null;
}
