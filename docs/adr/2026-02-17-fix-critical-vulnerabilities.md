# Critical Vulnerabilities Mitigation Log

This document lists all **critical severity vulnerabilities** in the project and the steps taken to mitigate them.

---

## 1. Remote Code Execution in `simple-git`

- **Package:** simple-git  
- **Current Version:** <3.16.0  
- **Patched Version:** >=3.16.0  
- **Dependency Path:** react-floki > lint-staged > g-status > simple-git  
- **CVE / Advisory:** [NPM Advisory 1103707](https://www.npmjs.com/advisories/1103707)  
- **Description:** Remote Code Execution (RCE) vulnerability allowing malicious commands to execute if untrusted input reaches `simple-git`.  
- **Mitigation:** Upgrade `simple-git` to version >=3.16.0 via Yarn resolutions or direct dependency update.

---

## 2. Prototype Pollution in `property-expr`

- **Package:** property-expr  
- **Current Version:** <2.0.3  
- **Patched Version:** >=2.0.3  
- **Dependency Path:** react-floki > lint-staged > yup > property-expr  
- **CVE / Advisory:** [NPM Advisory 1089042](https://www.npmjs.com/advisories/1089042)  
- **Description:** Prototype pollution vulnerability allowing attackers to modify object prototypes, potentially leading to arbitrary code execution.  
- **Mitigation:** Upgrade `property-expr` to version >=2.0.3 via Yarn resolutions.

---

## 3. Prototype Pollution in `minimist`

- **Package:** minimist  
- **Current Version:** <1.2.6  
- **Patched Version:** >=1.2.6  
- **Dependency Path:** react-floki > minimist  
- **CVE / Advisory:** [NPM Advisory 1097678](https://www.npmjs.com/advisories/1097678)  
- **Description:** Prototype pollution vulnerability in argument parsing. May allow attackers to override object properties.  
- **Mitigation:** Upgrade `minimist` to version >=1.2.6 via Yarn resolutions.

---

## 4. Unsafe Random Function in `form-data` (coveralls path)

- **Package:** form-data  
- **Current Version:** <2.5.4  
- **Patched Version:** >=2.5.4  
- **Dependency Path:** coveralls > request > form-data  
- **CVE / Advisory:** [NPM Advisory 1109540](https://www.npmjs.com/advisories/1109540)  
- **Description:** `form-data` uses an unsafe random function for generating multipart boundaries, potentially allowing collisions or predictable boundaries.  
- **Mitigation:** Upgrade `form-data` to version >=2.5.4 via Yarn resolutions.

---

## 5. Unsafe Random Function in `form-data` (react-floki path)

- **Package:** form-data  
- **Current Version:** <2.5.4  
- **Patched Version:** >=2.5.4  
- **Dependency Path:** react-floki > coveralls > request > form-data  
- **CVE / Advisory:** [NPM Advisory 1109540](https://www.npmjs.com/advisories/1109540)  
- **Description:** Same as above; appears via a different dependency path.  
- **Mitigation:** Upgrade `form-data` to version >=2.5.4 via Yarn resolutions.

---

## Summary of Actions

- Added **Yarn resolutions** for all critical packages:

```json
{
  "resolutions": {
    "simple-git": ">=3.16.0",
    "property-expr": ">=2.0.3",
    "minimist": ">=1.2.6",
    "form-data": ">=2.5.4"
  }
}
