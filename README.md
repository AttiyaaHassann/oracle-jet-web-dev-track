# oracle-jet-web-dev-track
Hands-on Oracle JET projects covering REST APIs, CRUD operations, reusable web components, and UI automation testing using Selenium WebDriver.
# Oracle JET Learning Repository

> A collection of Oracle JET projects demonstrating application development, reusable web components, REST API integration, CRUD operations, and UI automation testing with Selenium WebDriver.

---

## 📖 Overview

This repository contains the projects I developed while learning Oracle JET. Throughout these projects, I explored enterprise web application development, created reusable composite components, integrated Oracle APEX REST services, implemented CRUD functionality, and automated UI testing using Selenium WebDriver and Oracle JET WebDriver.

The projects are organized to reflect my progression from building a basic Oracle JET application to implementing advanced features such as reusable components and end-to-end UI automation testing.

---

# 📂 Repository Structure

```text
Oracle-JET-Learning
│
├── JET_Basic_App
│
├── JET_Web_App
│
├── JET_WebComponent_App
│
├── JET-WebDriver-Tests
│
├── screenshots
│
└── README.md
```

---

# 🚀 Projects

## 1️⃣ JET_Basic_App

A minimal Oracle JET application created to verify the Selenium WebDriver testing environment before writing UI automation tests.

### Features

- Oracle JET project setup
- Application routing
- Selenium WebDriver environment verification
- Oracle JET WebDriver setup validation

---

## 2️⃣ JET_Web_App

The primary Oracle JET application developed throughout the learning modules.

### Features

- RESTDataProvider integration
- Oracle APEX REST Services
- CRUD Operations
- Activity and Item management
- Responsive layouts
- Knockout observables
- Oracle JET ListView
- Dialog components
- Oracle JET Charts
- Avatar components
- Data binding
- Custom reusable web component integration

---

## 3️⃣ JET_WebComponent_App

Developed a reusable Oracle JET Composite Component that was packaged and later integrated into the main application.

### Features

- Oracle JET Composite Components
- TypeScript component development
- Component metadata
- Packaging component into ZIP
- Component loader
- Reusable component integration

---

## 4️⃣ JET-WebDriver-Tests

A separate CommonJS-based project created for UI automation testing using Selenium WebDriver.

### Technologies

- Selenium WebDriver
- Oracle JET WebDriver
- TypeScript
- Mocha
- Chai

### Automated Test Scenarios

- Verify Selenium setup
- Validate Oracle JET WebDriver configuration
- Select activities
- Create new activity items
- Delete activity items
- Verify Knockout ViewModel values
- End-to-End UI automation workflows

---

# 🛠 Technologies Used

### Frontend

- Oracle JET
- JavaScript (AMD)
- TypeScript
- KnockoutJS
- HTML
- CSS

### Backend

- Oracle APEX REST Services
- REST APIs
- JSON

### Testing

- Selenium WebDriver
- Oracle JET WebDriver
- Mocha
- Chai

### Development Tools

- Node.js
- npm
- Oracle JET CLI
- Visual Studio Code
- Git
- GitHub

---

# 🎯 Skills Demonstrated

- Oracle JET Development
- Enterprise UI Development
- REST API Integration
- CRUD Operations
- KnockoutJS Data Binding
- Oracle JET Composite Components
- TypeScript
- Selenium WebDriver
- Oracle JET WebDriver
- UI Automation Testing
- End-to-End Testing
- Git Version Control

---

# 📸 Screenshots

> *(Screenshots will be added here.)*

Example:

```text
screenshots/
│
├── dashboard.png
├── create-dialog.png
├── web-component.png
├── webdriver-tests.png
```

---

# ▶️ Running the Projects

## Oracle JET Application

```bash
cd JET_Web_App
ojet serve
```

The application will typically be available at:

```
http://localhost:8000
```

---

## Selenium UI Automation Tests

Navigate to the WebDriver project:

```bash
cd JET-WebDriver-Tests
```

Run a specific test:

```bash
npm test ./src/__tests__/ValidateSetup.spec.ts
```

Or execute all tests:

```bash
npm test
```

> **Note:** The Oracle JET application must be running before executing the Selenium tests.

---

# 📚 Learning Highlights

Throughout these projects, I gained practical experience with:

- Building Oracle JET applications
- Working with Oracle APEX REST APIs
- Implementing Create, Read, Update and Delete (CRUD) functionality
- Creating reusable Oracle JET Composite Components
- Packaging and integrating custom components
- Understanding Oracle JET's MVVM architecture with KnockoutJS
- Writing UI automation tests using Selenium WebDriver
- Testing Oracle JET components with Oracle JET WebDriver
- Automating end-to-end user workflows

---

# 📄 License

This repository is intended for learning and educational purposes.
