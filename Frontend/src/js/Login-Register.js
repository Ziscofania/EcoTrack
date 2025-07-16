const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const formTitle = document.getElementById('form-title');

    function toggleForm() {
      loginForm.classList.toggle('active');
      registerForm.classList.toggle('active');
      formTitle.textContent = loginForm.classList.contains('active') ? 'Iniciar Sesión' : 'Registrarse';
    }

    // Puedes manejar aquí el resultado del login con Google
    function handleCredentialResponse(response) {
      fetch('/auth/google', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential })
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          document.getElementById('user-info').style.display = 'block';
          document.getElementById('user-name').textContent = data.user.name;
          document.getElementById('user-email').textContent = data.user.email;
          document.getElementById('user-image').src = data.user.picture;
          loginForm.style.display = 'none';
          registerForm.style.display = 'none';
          formTitle.textContent = "Sesión Iniciada";
        }
      })
      .catch(err => console.error('Error autenticando con Google', err));
    }

    function signOut() {
      document.getElementById('user-info').style.display = 'none';
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
      formTitle.textContent = 'Iniciar Sesión';
    }