export const Login = async (email, password, history) => {
  const result = await fetch("http://localhost:8000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  const json = await result.json();
  if (json.status !== "success") {
    alert("Unsuccesful login. Check your email and password.");
  } else {
    localStorage.setItem("kotiKokkiToken", json.token);
    history.push("/profile");
    window.location.reload();
  }
};

export const UserIsAuthenticated = () => {
  return localStorage.getItem("kotiKokkiToken");
};

export const Logout = (history) => {
  localStorage.removeItem("kotiKokkiToken");
  history.push("/login");
  window.location.reload();
};
