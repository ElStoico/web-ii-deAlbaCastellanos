document.getElementById('create-event-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch("/eventos/crear/", {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            document.getElementById('error-message').textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'Ocurrió un error al procesar la solicitud.';
    });
});

document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
        const eventId = this.getAttribute('data-id');
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch(`/eventos/eliminar/${eventId}/`, {
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
            alert('Ocurrió un error al intentar eliminar el evento.');
        });
    });
});
