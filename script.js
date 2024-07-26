document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signup-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(this);

        // Send form data to backend using fetch
        fetch('/signup', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Return response text if request is successful
            } else {
                throw new Error('Failed to sign up'); // Throw error if request fails
            }
        })
        .then(data => {
            alert(data); // Show success message
        })
        .catch(error => {
            console.error('Error occurred while signing up:', error);
            alert('An error occurred while signing up. Please try again.'); // Show error message
        });
    });
});
