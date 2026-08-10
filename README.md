# Atenea Bank

## Project overview

- This is a QA automation project with **Playwright with TypeScript**. The application this project is based on is **Atenea Bank**, a sandbox that emaulates an **banking application**. This project includes **CI/CD**.
  
- The tests cover **Frontend** and **Backend.** 

- **Link to the application's repository and set up (in spanish): https://github.com/Atenea-Conocimientos/redux-athena-bank.**

This repository contains:

- Automated end-to-end tests using **Playwright.**
- Automation test cases for core application workflows.
- Use cases with **positive, negative and edge scenarios.**
- Exploratory testing findings.
- Detailed bug reports with evidence.

## Setup & Running the Tests

This project contains automated tests for **Atenea Bank**, a sandbox banking app. The tests run against a **local instance** of the app, so you'll need to have it running before executing the test suite.

### Prerequisites

- **Node.js** v14 or higher
- **npm**
- **MongoDB** (a local instance, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- **Git**

### 1. Clone and set up the app under test

The tests run against [Atenea Bank](https://github.com/Atenea-Conocimientos/redux-athena-bank), which needs to be running locally on `http://localhost:3000` (frontend) and `http://localhost:6007` (backend).

```bash
git clone https://github.com/Atenea-Conocimientos/redux-athena-bank.git
cd redux-athena-bank
```

**Backend setup:**

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:

```env
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<any secret string>
PORT=6007
```

Start the backend:

```bash
npm run dev
```

It should now be running on `http://localhost:6007`.

**Frontend setup** (in a new terminal):

```bash
cd redux-athena-bank/frontend
npm install
npm run dev
```

It should now be running on `http://localhost:3000`.

> Keep both the backend and frontend running in the background while you execute the tests below.

### 2. Clone this repository and install dependencies

In a separate terminal:

```bash
git clone https://github.com/marianaluduena/workshop-playwright-atenea.git
cd workshop-playwright-atenea
npm install
```

### 3. Install the Playwright browsers

```bash
npx playwright install --with-deps
```

(You can drop `--with-deps` on Windows/macOS if it's not needed — it mainly installs missing OS-level dependencies on Linux.)

### 4. Run the tests

```bash
npx playwright test
```

This runs the full suite across the configured projects (`setup`, `chromium`, `firefox`, `webkit`). The `setup` project creates and logs in the test user used for the money-transfer tests before the `chromium` project runs, so make sure it isn't skipped.

To run a specific browser only:

```bash
npx playwright test --project=chromium
```

To run in headed mode (see the browser while tests run):

```bash
npx playwright test --headed
```

### 5. View the HTML report

```bash
npx playwright show-report
```

### About the CI/CD pipeline

The GitHub Actions workflow (`.github/workflows/test.yml`) automates the same process on every push/PR to `main`: it spins up a MongoDB service container, clones `redux-athena-bank`, builds and starts the backend and frontend, waits for both to be ready, then installs Playwright and runs the full suite, uploading the HTML report as a build artifact.

---------


### Tools

- **Playwright**

- **TypeScript:** all the automated test cases are written with Typescript.

- **GitHub Actions (CI/CD)**

- **Git**

- **ChatGPT and Gemini Copilot:** to create additional unexpected test scenarios, and as a guide to create specific test cases when I don't know how to do it.

- **Loom:** to document visual proof / evidence. The screenshots links are available to be accessed.


### Environment

- **OS:** Windows 11

-  **Browser:** Chrome Version 141.0.7390.109

---------

## Project Structure

```
WORKSHOP-PLAYWRIGHT-ATENEA/

.github/.workflows              # Workflows / Pipeline
│   ├── test.yml
|
data/
│   ├── testData.json           # User's data
│ 
docs/                           # Documentation files
│   ├── bugs-found.md           # List of bugs found
│   ├── exploratory-notes.md    # Exploratory testing notes   
│   └── use-cases.md            # List of use cases
|
pages/                          # App's pages objects
│    ├── dashboradPage.ts           
│    ├── loginPage.ts  
│    └── modalCreateAccount.ts    
|    ├── modalTransferMoney.ts           
│    ├── signUpPage.ts   
|
playwright\.auth                # Account's setup
│         ├── userReceivesMoney.json           
│         ├── userSendsMoney.json
|
tests/                           # Automated test suites (organized by feature)
|    ├── auth.spec.ts         
│    ├── signIn.setup.ts
|    ├── signin.spec.ts 
│    └── transactions.spec.ts
utils/                            
|    ├──backendUtils.ts          # Method to create user via API     
|
│── .gitignore                     # All untracked files 
│ 
├── package-lock.json              # Package lock file
└── package.json                   # Project config
├── README.md                      # Main project overview
├── playwright.config.ts           # Playwright settings 

```
