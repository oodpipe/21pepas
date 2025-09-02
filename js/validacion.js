document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    
    if (formulario) {
        // Validación en tiempo real
        const campos = formulario.querySelectorAll('input, select, textarea');
        campos.forEach(campo => {
            campo.addEventListener('blur', validarCampo);
            campo.addEventListener('input', quitarError);
        });

        // Validación al enviar
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let esValido = true;
            campos.forEach(campo => {
                if (!validarCampo({ target: campo })) {
                    esValido = false;
                }
            });

            if (esValido) {
                enviarFormulario();
            }
        });
    }

    function validarCampo(e) {
        const campo = e.target;
        let esValido = true;
        
        quitarError(campo);

        // Validar campo requerido
        if (campo.hasAttribute('required') && !campo.value.trim()) {
            mostrarError(campo, 'Este campo es obligatorio');
            esValido = false;
        }

        // Validaciones específicas por tipo
        if (campo.value.trim() && esValido) {
            switch(campo.type) {
                case 'email':
                    if (!validarEmail(campo.value)) {
                        mostrarError(campo, 'Ingrese un email válido');
                        esValido = false;
                    }
                    break;
                
                case 'tel':
                    if (!validarTelefono(campo.value)) {
                        mostrarError(campo, 'Ingrese un número de teléfono válido');
                        esValido = false;
                    }
                    break;
                
                case 'text':
                    if (campo.id === 'nombre' && campo.value.trim().length < 2) {
                        mostrarError(campo, 'El nombre debe tener al menos 2 caracteres');
                        esValido = false;
                    }
                    break;
            }
        }

        // Validar textarea
        if (campo.tagName === 'TEXTAREA' && campo.value.trim().length < 10) {
            mostrarError(campo, 'El mensaje debe tener al menos 10 caracteres');
            esValido = false;
        }

        // Validar select
        if (campo.tagName === 'SELECT' && !campo.value) {
            mostrarError(campo, 'Por favor seleccione una opción');
            esValido = false;
        }

        return esValido;
    }

    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validarTelefono(telefono) {
        const telefonoRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return telefonoRegex.test(telefono);
    }

    function mostrarError(campo, mensaje) {
        const errorElement = campo.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = mensaje;
        }
        campo.style.borderColor = '#e74c3c';
    }

    function quitarError(e) {
        const campo = e.target || e;
        const errorElement = campo.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
        campo.style.borderColor = '#ddd';
    }

    function enviarFormulario() {
        // Simular envío del formulario
        const formData = new FormData(formulario);
        const datos = Object.fromEntries(formData.entries());
        
        console.log('Datos del formulario:', datos);
        
        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado correctamente! Te contactaremos dentro de 24 horas.');
        
        // Reiniciar formulario
        formulario.reset();
        
        // Aquí puedes agregar el envío real con fetch()
        /*
        fetch('/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            alert('Mensaje enviado correctamente');
            formulario.reset();
        })
        .catch(error => {
            alert('Error al enviar el mensaje');
        });
        */
    }
});