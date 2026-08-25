
const API_URL = 'http://localhost:3001/api/users';

// ----- REGISTRO -----
const tieneUsername = document.getElementById('username');
const formRegistro = tieneUsername ? document.getElementById('registro') : null;

if (formRegistro) {
  formRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = Array.isArray(data)
          ? data.map(d => d).join('\n')
          : data.message;
        alert(msg || 'Error al registrarse');
        return;
      }

      alert('Cuenta creada con éxito');
      window.location.href = 'login.html';
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor');
    }
  });
}

// ----- LOGIN -----
const formLogin = !tieneUsername ? document.getElementById('registro') : null;

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Credenciales incorrectas');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'index.html';
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor');
    }
  });
}