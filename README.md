# Atm Machine

This is a ATM Machine project where you can Create Account,Check Account,Check Balance,Transfer and Deposit 

## Description

This project is a web-based application for an ATM (Automated Teller Machine) system built using React and Ethereum blockchain technology. It allows users to interact with a local Ganache blockchain (a development Ethereum network) through their MetaMask wallet installed in the browser. The application facilitates various banking operations like creating an account, checking account existence and balance, transferring funds, depositing money, and withdrawing money. Let's go through the major components and functionalities of this application:

1 Technologies Used:

* React: The user interface of the application is built using React, a popular JavaScript library for building user interfaces.
* Ethereum Blockchain: The application interacts with the Ethereum blockchain using the ethers.js library to perform smart contract transactions.
* MetaMask: MetaMask is a browser extension that allows users to manage their Ethereum accounts and interact with decentralized applications (dApps).
  
2 Components:

BankApp: This is the main component of the application and serves as the entry point for the user. It displays various banking operations and interacts with smart contracts through user actions.
Interactions: This component provides the user interface for interacting with the smart contract methods.

3 Smart Contract:
The application uses a simple token contract (not visible in the provided code) deployed on the local Ganache blockchain. This contract likely contains functions to manage user accounts, balances, and transfer of funds.

4 State Management:
The application uses React's useState hook to manage the following states:

* errorMessage: Stores any error messages that occur during the interactions with MetaMask or the smart contract.
* defaultAccount: Keeps track of the connected Ethereum account (MetaMask account).
* connButtonText: Changes the connection button text based on whether the wallet is connected or not.
* provider: Represents the ethers.js Web3Provider instance connected to the Ethereum network.
* signer: Represents the ethers.js Signer instance associated with the connected Ethereum account.
* contract: Represents the ethers.js Contract instance of the deployed smart contract.
* transferHash: Stores the confirmation hash after transferring or withdrawing funds.
* checkAcc: Stores a flag indicating if the account exists or not.
* accStatus: Displays the status of the account (whether it is created or not).
* accbalance: Displays the balance of the connected account in the bank.
  
User Actions and Functions:

* connectWalletHandler: Handles the process of connecting the MetaMask wallet to the application.
* accountChangedHandler: Updates the default account and calls updateEthers() whenever the connected account changes.
* updateEthers: Initializes the provider, signer, and contract objects after connecting the wallet.
* createAccount: Calls the smart contract method createAcc() to create an account.
* checkAccountExists: Calls the smart contract method accountExists() to check if the account exists or not.
* AccountBalance: Calls the smart contract method accountBalance() to fetch the account balance.
* DepositBalance: Calls the smart contract method deposit() to deposit funds into the account.
* transferHandler: Calls the smart contract method transferEther() to transfer funds to another account.
* WithdrawBalance: Calls the smart contract method withdraw() to withdraw funds from the account.
* updateAccountName: Prompts the user to enter a new account name and calls the smart contract method updateAccountName() to update the account name.
* checkTransactionStatus: Checks the status of a transaction by providing its hash.

### Executing program


To execute the program described in the previous code snippet, follow these steps:

Prerequisites:

* Make sure you have Visual Studio Code (VSCode) installed as your IDE.
* Install Node.js from the official website (https://nodejs.org/). This will also install npm (Node Package Manager) by default.
* Open a terminal or command prompt.

2 Install Hardhat:
npm install -g hardhat

3 Setting up the project:

(i) Create a new folder for your project and navigate to it in the terminal.
Inside the project folder, create a new file named hardhat.config.js. This file will contain the Hardhat configuration for your project and specify the Ethereum network (Ganache in this case).
(ii) Install necessary dependencies:
In your terminal, navigate to your project folder and run the following command:
npm init -y
npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers

4 Start the local Ethereum network (Ganache):
npx hardhat node

5 Deploy the smart contract:
In a new terminal (Terminal 2), run the following command to deploy the smart contract on the local Ethereum network:
npx hardhat run --network localhost scripts/deploy.js

6 Start the React application:
In a new terminal (Terminal 3), navigate to your project folder (where package.json is located) and run the following command:
npm start


## Authors
Nikhil Agarwal
User Name-Nikhil1810

## License
This Contract is using the MIT License
