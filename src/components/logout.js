export function Logout() {
  localStorage.removeItem("loggedin");
  window.open("/login", "_self");
}

export function DeleteAccount() {
  localStorage.clear();
}
