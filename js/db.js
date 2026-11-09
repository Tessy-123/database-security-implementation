document.addEventListener('DOMContentLoaded', () => {
    // 1. Session & Privilege Check
    const session = JSON.parse(sessionStorage.getItem('secureSession')) || { user: 'Guest', role: 'user' };
    const sessionInfo = document.getElementById('sessionInfo');
    const adminPanel = document.getElementById('adminPanel');
    const userPanel = document.getElementById('userPanel');

    if (sessionInfo) {
        sessionInfo.innerHTML = `
            Username: <strong>${session.user}</strong><br>
            Privilege Level: <span class="badge ${session.role}">${session.role.toUpperCase()}</span>
        `;
    }

    // RBAC Interface Display Logic
    if (session.role === 'admin') {
        if (adminPanel) adminPanel.style.display = 'block';
    } else {
        if (userPanel) userPanel.style.display = 'block';
    }

    // 2. Mock Database Records
    const dbRecords = [
        { id: 1, name: "Albert Mkwanda", reg: "23311351001", dept: "Computer Science", role: "Student" },
        { id: 2, name: "Chinsinsi Msanyama", reg: "23311351017", dept: "Computer Science", role: "Administrator" },
        { id: 3, name: "Moses Makunganya", reg: "23311351012", dept: "Software Eng", role: "Developer" },
        { id: 4, name: "Yamikani Chanza", reg: "24313351002", dept: "Information Tech", role: "Collaborator" },
        { id: 5, name: "Stanslaus Phillimon", reg: "EMP-001", dept: "Faculty of ICT", role: "Lecturer" },
        { id: 6, name: "Ekari Emmanuel Moyo", reg: "23311351007", dept: "Computer Science", role: "Student" },
        { id: 7, name: "Benjamin Khoko", reg: "23311351015", dept: "Cyber Security", role: "Analyst" }
    ];

    const btnSecure = document.getElementById('btnSecure');
    const btnVulnerable = document.getElementById('btnVulnerable');
    const searchQuery = document.getElementById('searchQuery');
    const queryOutput = document.getElementById('queryOutput');

    // Secure Parameterised Query Handler
    if (btnSecure) {
        btnSecure.addEventListener('click', () => {
            const input = searchQuery.value.trim();
            queryOutput.style.color = "#38bdf8";

            if (!input) {
                queryOutput.innerHTML = `[SECURE QUERY EXECUTION]\nPrepared Statement: SELECT id, name, reg, dept FROM institutional_users WHERE name = ?\nParameter: [EMPTY]\nPlease enter a valid search query.`;
                return;
            }

            // Input Sanitisation Filter
            const sanitizedInput = input.replace(/['";]/g, '');
            const results = dbRecords.filter(r => 
                r.name.toLowerCase().includes(sanitizedInput.toLowerCase()) || 
                r.reg.toLowerCase().includes(sanitizedInput.toLowerCase()) ||
                r.dept.toLowerCase().includes(sanitizedInput.toLowerCase())
            );

            queryOutput.innerHTML = `[SECURE PARAMETERISED QUERY - PASSED]\n` +
                `Prepared Statement: SELECT id, name, reg, dept FROM institutional_users WHERE name LIKE ?\n` +
                `Bound Parameter: ["%${sanitizedInput}%"]\n` +
                `Role Clearance: ${session.role.toUpperCase()}\n\n` +
                `Results Found (${results.length}):\n` + JSON.stringify(results, null, 2);
        });
    }

    // Vulnerable SQL Injection Simulation Handler
    if (btnVulnerable) {
        btnVulnerable.addEventListener('click', () => {
            const input = searchQuery.value.trim();
            queryOutput.style.color = "#f87171";

            if (input.includes("'") || input.includes("OR") || input.includes("1=1")) {
                queryOutput.innerHTML = `[VULNERABLE QUERY SIMULATION - DATABASE COMPROMISED!]\n` +
                    `Raw Query Executed: SELECT * FROM institutional_users WHERE name = '${input}'\n` +
                    `Exploit Vector: SQL Injection Payload Bypassed Authentication Logic.\n` +
                    `STATUS: Malicious payload triggered full database leak!\n\n` +
                    JSON.stringify(dbRecords, null, 2);
            } else {
                queryOutput.innerHTML = `[UNSANITIZED QUERY EXECUTED]\n` +
                    `Raw Query Executed: SELECT * FROM institutional_users WHERE name = '${input}'\n` +
                    `Tip: Try entering payload: ' OR '1'='1 to simulate SQL Injection bypass.`;
            }
        });
    }

    // 3. Admin-Only Elevated Buttons
    const btnAuditDump = document.getElementById('btnAuditDump');
    const btnViewAllUsers = document.getElementById('btnViewAllUsers');
    const btnFlushSession = document.getElementById('btnFlushSession');

    if (btnAuditDump) {
        btnAuditDump.addEventListener('click', () => {
            if (session.role !== 'admin') {
                queryOutput.style.color = "#ef4444";
                queryOutput.innerHTML = `[ACCESS DENIED]\nHTTP 403 Forbidden: Standard users lack authorization for audit logging.`;
                return;
            }
            queryOutput.style.color = "#fca5a5";
            queryOutput.innerHTML = `[ADMINISTRATOR AUDIT DUMP - LEVEL 1 CLEARANCE]\n` +
                `[TIMESTAMP 2026-11-09 09:25:00] Admin '${session.user}' initiated system log audit.\n` +
                `[SYSTEM] Session Table Status: Active (1 Admin, 3 Users)\n` +
                `[SYSTEM] Zero injection breaches reported across active parameterised endpoints.`;
        });
    }

    if (btnViewAllUsers) {
        btnViewAllUsers.addEventListener('click', () => {
            if (session.role !== 'admin') {
                queryOutput.style.color = "#ef4444";
                queryOutput.innerHTML = `[ACCESS DENIED]\nHTTP 403 Forbidden: Insufficient privileges to view database schema.`;
                return;
            }
            queryOutput.style.color = "#818cf8";
            queryOutput.innerHTML = `[RAW SCHEMA INSPECTOR - ADMIN ACCESS]\n` +
                `Table Name: institutional_users\n` +
                `Primary Key: id (INT)\n` +
                `Columns: [id, name, reg, dept, role, password_hash, salt]\n` +
                `Total Table Size: ${dbRecords.length} records.`;
        });
    }

    if (btnFlushSession) {
        btnFlushSession.addEventListener('click', () => {
            if (session.role !== 'admin') {
                queryOutput.style.color = "#ef4444";
                queryOutput.innerHTML = `[ACCESS DENIED]\nAdministrative privilege required.`;
                return;
            }
            queryOutput.style.color = "#10b981";
            queryOutput.innerHTML = `[ADMIN ACTION]\nAll inactive session tokens successfully invalidated and cleared.`;
        });
    }
});