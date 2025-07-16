function handleCredentialResponse(response) {
      // Decodificar el JWT (token) con los datos del usuario
    const data = parseJwt(response.credential);
    console.log("Datos del usuario:", data);

    document.getElementById("user-name").innerText = data.name;
    document.getElementById("user-email").innerText = data.email;
    document.getElementById("user-image").src = data.picture;

    document.querySelector(".g_id_signin").style.display = "none";
    document.getElementById("user-info").style.display = "block";
    }

    function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
    }

    function signOut() {
    google.accounts.id.disableAutoSelect();
      location.reload(); // Recargar la página para mostrar el botón otra vez
    }

async function handleCredentialResponse(response) {
    const token = response.credential;

    const res = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    const data = await res.json();
    if (res.ok) {
        console.log("✅ Usuario autenticado:", data.user);
        alert("Bienvenido " + data.user.name);
    } else {
        alert("❌ Error al iniciar sesión");
    }
    }
function handleCredentialResponse(response) {
  // Validar con backend...
document.getElementById("user-info").style.display = "block";
}
