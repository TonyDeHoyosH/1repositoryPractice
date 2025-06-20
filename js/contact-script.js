 document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('contact-form');
            form.addEventListener('submit', function (e) {
                e.preventDefault(); 

                            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            Swal.fire({
                title: 'Sending...',
                text: 'Please wait.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your message has been sent successfully.',
                        icon: 'success',
                        confirmButtonColor: '#d1ac2d'
                    }).then(() => {
                        form.reset(); // Limpia el formulario
                    });
                } else {
                    console.log(response);
                    Swal.fire({
                        title: 'Error!',
                        text: jsonResponse.message,
                        icon: 'error',
                        confirmButtonColor: '#d1ac2d'
                    });
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    confirmButtonColor: '#d1ac2d'
                });
            });
        });
    });
           