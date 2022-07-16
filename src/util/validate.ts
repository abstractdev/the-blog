export function validate(
  formTitle: string | undefined,
  userFormData: any,
  setValidationError: (x: any) => void
) {
  const emptyMessage = "One or more fields are empty. Please try again.";
  const notMatchMessage = "Passwords do not match! Please try again.";
  if (
    formTitle === "LOG IN" &&
    (!userFormData.username || !userFormData.password)
  ) {
    setValidationError(emptyMessage);
    return "validationError";
  } else if (
    (formTitle === "USER SIGN UP" || formTitle === "AUTHOR SIGN UP") &&
    userFormData.password !== userFormData.passwordConfirmation
  ) {
    setValidationError(notMatchMessage);
    return "validationError";
  } else if (
    formTitle === "AUTHOR SIGN UP" &&
    (!userFormData.firstName ||
      !userFormData.lastName ||
      !userFormData.username ||
      !userFormData.password ||
      !userFormData.passwordConfirmation)
  ) {
    setValidationError(emptyMessage);
    return "validationError";
  } else if (
    formTitle === "USER SIGN UP" &&
    (!userFormData.username ||
      !userFormData.password ||
      !userFormData.passwordConfirmation)
  ) {
    setValidationError(emptyMessage);
    return "validationError";
  }
}
