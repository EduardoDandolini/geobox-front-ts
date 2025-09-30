export function hasRole(role: string): boolean {
  const roles = JSON.parse(sessionStorage.getItem("roles") || "[]");
  return roles.includes(role);
}
