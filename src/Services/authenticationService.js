export const Signup = async (email, password, name, history, isChef) => {
  const result = await fetch(
    "https://localhost:8000/api/v1/users/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        isChef:isChef
      }),
    }
  );

  const json = await result.json();
  if (json.status !== "success") {
    alert("Unsuccesfull signup.");
  } else {
    history.push("/login");
  }
};

export const Login = async (email, password, history) => {
  const result = await fetch(
    "https://localhost:8000/api/v1/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }
  );

  const json = await result.json();
  if (json.status !== "success") {
    alert("Unsuccesful login. Check your email and password.");
  } else {
    localStorage.setItem("kotiKokkiToken", json.token);
    localStorage.setItem("kotiKokkiID", json.userId);
    history.push("/profile?" + json.userId);
    window.location.reload();
  }
};

export const Logout = (history) => {
  localStorage.clear();
  history.push("/login");
  window.location.reload();
};

export const UserIsAuthenticated = () => {
  return localStorage.getItem("kotiKokkiToken");
};
