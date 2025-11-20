# Atenea Bank

## Project overview

- This is a QA automation project with **Playwright with TypeScript**. The application this project is based on is **Atenea Bank**, a sandbox that emaulates an **banking application**. This project includes **CI/CD**.
  
- The tests cover **Frontend** and **Backend.** 

- **Link to the application's repository and set up (in spanish): https://github.com/Atenea-Conocimientos/redux-athena-bank.**
  
- ⚠️ Please note that **this project is still in progress but functional.**

This repository contains:

- Automated end-to-end tests using **Playwright.**
- Automation test cases for core application workflows.
- Use cases with **positive, negative and edge scenarios.**
- Exploratory testing findings.
- Detailed bug reports with evidence.

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
