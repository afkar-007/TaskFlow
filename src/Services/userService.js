export async function fetchUser() {
  try {
    const currentUser = localStorage.getItem("userId");

    const response = await fetch(
      `https://taskflow-backend-zq3y.onrender.com/user/getCurrentUser/${currentUser}`,
    );

    const data = await response.json();
    

    return data.currentUser;
  } catch (err) {
    console.log(err.message);
  }
}
