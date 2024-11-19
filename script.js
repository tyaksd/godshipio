document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email');
    const messageDisplay = document.getElementById('message');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // フォームのデフォルトの送信動作を防止

        const email = emailInput.value;

        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                messageDisplay.textContent = 'Thank you for signing up!';
                messageDisplay.style.color = 'green';
                emailInput.value = ''; // 入力フィールドをリセット
            } else {
                messageDisplay.textContent = 'Failed to sign up. Please try again.';
                messageDisplay.style.color = 'red';
            }
        } catch (error) {
            messageDisplay.textContent = 'An error occurred. Please try again.';
            messageDisplay.style.color = 'red';
        }
    });
});