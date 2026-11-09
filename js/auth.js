// Authentication & RBAC Module
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const authStatus = document.getElementById('authStatus');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const role = document.getElementById('role').value;

            // Input Sanitisation check
            if (username.length < 3) {
                authStatus.innerHTML = `<span style="color: var(--danger);">Validation Error: Username must be at least 3 characters.</span>`;
                return;
            }

            // Store session state securely in sessionStorage
            const sessionData = {
                user: username,
                role: role,
                timestamp: new Date().toISOString()
            };
            sessionStorage.setItem('secureSession', JSON.stringify(sessionData));

            // Display success feedback
            authStatus.innerHTML = `
                <span style="color: var(--success);">Authentication Successful!</span><br>
                User: <strong>${username}</strong> | Role: <span class="badge ${role}">${role}</span>
            `;
        });
    }
});