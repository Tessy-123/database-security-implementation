# Project No. 9: Database Security Implementation

An academic web portfolio and security simulation suite designed to demonstrate core database defensive controls, including Role-Based Access Control (RBAC), Parameterised Queries vs. SQL Injection, SHA-256 password hashing, and dynamic PII data masking.

## Project Metadata & Verification
* **Candidate Name:** Chinsinsi Msanyama
* **Registration Number:** 23311351017
* **Assigned Project:** Project No. 9 — Database Security Implementation
* **Institution:** DMI-St. John the Baptist University
* **Lecturer Reviewer:** Stanslaus Phillimon (`stanslausphillimon@gmail.com`)
* **GitHub Repository:** [https://github.com/Tessy-123/database-security-implementation](https://github.com/Tessy-123/database-security-implementation)
* **Live GitHub Pages URL:** [https://tessy-123.github.io/database-security-implementation/](https://tessy-123.github.io/database-security-implementation/)

---

## Three-Page Application Structure
1. **Authentication Gateway (`index.html`):** 
   * Handles user login and account registration with password confirmation validation.
   * Features interactive show/hide password toggle controls and assigns privilege tiers (`Standard User` or `Administrator`).
2. **Secure Operations Dashboard (`dashboard.html`):** 
   * **Role-Based Access Control (RBAC):** Dynamically alters interface controls depending on the active session role (revealing an admin console with audit logs, schema inspectors, and session flushing tools for admins).
   * **Parameterised Query Engine:** Safely processes institutional database lookups using prepared statement syntax.
   * **SQL Injection Simulator:** Demonstrates how unsanitized string concatenation can be exploited to bypass logic and leak records.
3. **Sensitive Data Protection & Documentation (`docs.html`):** 
   * Houses project metadata and technical documentation for evaluation.
   * Displays an institutional data vault demonstrating field-level SHA-256 cryptographic password hashing and dynamic Personable Identifiable Information (PII) masking (e.g., national IDs).

---

## Technology Stack
* **Frontend:** HTML5, CSS3 (Slate/Indigo theme)
* **Logic & Storage:** Vanilla JavaScript (ES6+), Web Session Storage, and Local Storage
* **Hosting:** GitHub Pages
