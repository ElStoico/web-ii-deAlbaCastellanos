document.getElementById('create-product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch("/productos/crear/", {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('message').textContent = 'Producto creado exitosamente.';
            location.reload();
        } else {
            document.getElementById('message').textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Ocurrió un error al procesar la solicitud.';
    });
});

document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch(`/productos/eliminar/${productId}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar eliminar el producto.');
        });
    });
});
