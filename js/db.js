// Parameterised Query & SQL Injection Defense Demonstration Module
document.addEventListener('DOMContentLoaded', () => {
    const btnSecure = document.getElementById('btnSecure');
    const btnVulnerable = document.getElementById('btnVulnerable');
    const searchQuery = document.getElementById('searchQuery');
    const queryOutput = document.getElementById('queryOutput');

    // Mock Database Records
    const dbRecords = [
        { id: 1, name: "Albert Mkwanda", reg: "23311351001", role: "Student" },
        { id: 2, name: "Chinsinsi Msanyama", reg: "23311351017", role: "Administrator" },
        { id: 3, name: "Moses Makunganya", reg: "23311351012", role: "Developer" },
        { id: 4, name: "Yamikani Chanza", reg: "24313351002", role: "Collaborator" }
    ];

    if (btnSecure && btnVulnerable) {
        // 1. Secure Parameterised Query Simulation
        btnSecure.addEventListener('click', () => {
            const input = searchQuery.value.trim();
            queryOutput.style.color = "#38bdf8";
            
            if (!input) {
                queryOutput.innerHTML = `[SECURE QUERY EXECUTION]\nPrepared Statement: SELECT * FROM users WHERE name = ?\nParameter: [NULL / EMPTY]\nResult: Please provide a search term.`;
                return;
            }

            // Parameterised simulation: input is treated strictly as literal data, never executable code
            const sanitizedInput = input.replace(/['";]/g, '');
            const results = dbRecords.filter(r => r.name.toLowerCase().includes(sanitizedInput.toLowerCase()) || r.reg.includes(sanitizedInput));

            let resultString = results.length > 0 
                ? JSON.stringify(results, null, 2) 
                : "No matching records found.";

            queryOutput.innerHTML = `[SECURE QUERY EXECUTION - PASSED]\n` +
                `Prepared Statement: SELECT * FROM users WHERE name = ? OR reg = ?\n` +
                `Bound Parameters: [ "${sanitizedInput}" ]\n` +
                `Status: Safe from SQL Injection. Input treated strictly as data.\n\n` +
                `Results:\n${resultString}`;
        });

        // 2. Vulnerable Dynamic Query Simulation (SQLi Demonstration)
        btnVulnerable.addEventListener('click', () => {
            const input = searchQuery.value.trim();
            queryOutput.style.color = "#f87171"; // warning red

            // Check if user entered an SQL injection payload (e.g., ' OR '1'='1)
            if (input.includes("'") || input.includes("OR") || input.includes("1=1")) {
                queryOutput.innerHTML = `[VULNERABLE QUERY EXECUTION - COMPROMISED!]\n` +
                    `Unsafe Query: SELECT * FROM users WHERE name = '${input}'\n` +
                    `Status: SQL Injection Payload Detected & Executed!\n` +
                    `WARNING: String concatenation allowed malicious logic injection. Returning all records:\n` +
                    JSON.stringify(dbRecords, null, 2);
            } else {
                queryOutput.innerHTML = `[VULNERABLE QUERY EXECUTION]\n` +
                    `Unsafe Query: SELECT * FROM users WHERE name = '${input}'\n` +
                    `Status: Executed via string concatenation without parameterisation.\n` +
                    `Result: Try inputting an SQLi payload like ' OR '1'='1 to witness a bypass vulnerability.`;
            }
        });
    }
});