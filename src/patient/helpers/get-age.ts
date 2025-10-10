export function getAge(birthDate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthToday = today.getMonth();
  const dayToday = today.getDate();

  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  if (
    monthToday < birthMonth ||
    (birthMonth === monthToday && dayToday < birthDay)
  ) {
    age--;
  }

  return age;
}
