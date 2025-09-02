document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de productos
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const productos = document.querySelectorAll('.producto');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filtroBtns.forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-categoria');
            
            // Filtrar productos
            productos.forEach(producto => {
                if (categoria === 'todos' || producto.getAttribute('data-categoria') === categoria) {
                    producto.style.display = 'block';
                } else {
                    producto.style.display = 'none';
                }
            });
        });
    });

    // Funcionalidad del carrito (simulada)
    const btnComprar = document.querySelectorAll('.btn-comprar');
    
    btnComprar.forEach(btn => {
        btn.addEventListener('click', function() {
            const producto = this.parentElement;
            const nombre = producto.querySelector('h3').textContent;
            const precio = producto.querySelector('.precio').textContent;
            
            alert(`¡Producto agregado al carrito!\n${nombre}\n${precio}`);
            
            // Aquí podrías agregar lógica real del carrito
            // localStorage, arrays, etc.
        });
    });
});