document.addEventListener('DOMContentLoaded', function() {
    // Cambio entre pestañas de login y registro
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones
            tabBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Ocultar todos los formularios
            authForms.forEach(form => form.classList.add('hidden'));
            // Mostrar el formulario correspondiente
            document.getElementById(`${tab}-form`).classList.remove('hidden');
        });
    });

    // Validación del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (validarLogin(email, password)) {
                // Simular inicio de sesión exitoso
                alert('¡Inicio de sesión exitoso!');
                // Guardar en localStorage
                localStorage.setItem('usuarioLogueado', 'true');
                localStorage.setItem('userEmail', email);
                // Redirigir al inicio
                window.location.href = 'index.html';
            }
        });
    }

    // Validación del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            const terms = document.getElementById('terms').checked;
            
            if (validarRegistro(name, email, password, confirm, terms)) {
                // Simular registro exitoso
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                // Cambiar a pestaña de login
                tabBtns[0].click();
            }
        });
    }

    function validarLogin(email, password) {
        // Validaciones básicas
        if (!email || !password) {
            alert('Por favor, completa todos los campos');
            return false;
        }
        
        if (!validarEmail(email)) {
            alert('Por favor, ingresa un email válido');
            return false;
        }
        
        // Aquí normalmente se verificaría contra una base de datos
        // Por ahora, simulamos un usuario de prueba
        if (email === 'usuario@ejemplo.com' && password === 'password123') {
            return true;
        } else {
            alert('Credenciales incorrectas. Usa usuario@ejemplo.com y password123 para probar');
            return false;
        }
    }

    function validarRegistro(name, email, password, confirm, terms) {
        // Validaciones básicas
        if (!name || !email || !password || !confirm) {
            alert('Por favor, completa todos los campos');
            return false;
        }
        
        if (!validarEmail(email)) {
            alert('Por favor, ingresa un email válido');
            return false;
        }
        
        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        
        if (password !== confirm) {
            alert('Las contraseñas no coinciden');
            return false;
        }
        
        if (!terms) {
            alert('Debes aceptar los términos y condiciones');
            return false;
        }
        
        return true;
    }

    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Verificar si el usuario ya está logueado
    if (localStorage.getItem('usuarioLogueado') === 'true') {
        // Cambiar el texto del botón de login
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn) {
            loginBtn.textContent = 'Mi Cuenta';
            loginBtn.href = '#';
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Aquí podrías mostrar un menú desplegable con opciones de cuenta
                if (confirm('¿Deseas cerrar sesión?')) {
                    localStorage.removeItem('usuarioLogueado');
                    localStorage.removeItem('userEmail');
                    window.location.reload();
                }
            });
        }
    }
});