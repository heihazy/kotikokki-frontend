export const Signup = async (email, password, name, history) => {
  const result = await fetch("http://localhost:8000/api/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });

  const json = await result.json();
  if (json.status !== "success") {
    alert("Unsuccesfull signup.");
  } else {
    history.push("/login");
  }
};

export const Login = async (email, password, history) => {
  const result = await fetch("http://localhost:8000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  const json = await result.json();
  console.log(json);
  if (json.status !== "success") {
    alert("Unsuccesful login. Check your email and password.");
  } else {
    localStorage.setItem("kotiKokkiToken", json.token);
    localStorage.setItem("name", json.name);
    localStorage.setItem("id", json.userId);
    json.phone
      ? localStorage.setItem("phone", json.phone)
      : localStorage.setItem("phone", "No contact info yet.");
    json.intro
      ? localStorage.setItem("intro", json.intro)
      : localStorage.setItem("intro", "No introduction yet.");
    history.push("/profile");
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

export const currentUserIsCurrentProfile = () => {};
