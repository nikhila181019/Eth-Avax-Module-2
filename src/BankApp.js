import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './Bank.module.css';
import simple_token_abi from './Contracts/bank_app_abi.json';
import Interactions from './Interactions';

const BankApp = () => {
  // deploy simple token contract and paste deployed contract address here. This value is local ganache chain
  let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [transferHash, setTransferHash] = useState(null);
  const [checkAcc, setCheckAcc] = useState("false");
  const [accStatus, setAccStatus] = useState("");
  const [accbalance, setAccBalance] = useState("");

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  }

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  }

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
    setContract(tempContract);
  }

  const createAccount = async () => {
    let txt = await contract.createAcc();
    console.log(txt);
    setAccStatus("Your Account is created");
  }

  const checkAccountExists = async () => {
    let txt = await contract.accountExists();
    if (txt == true) {
      setCheckAcc("true");
    }
  }

  const AccountBalance = async () => {
    let txt = await contract.accountBalance();
    let balanceNumber = txt.toNumber();
    //let tokenDecimals = await contract.decimals();
    console.log(balanceNumber)
    setAccBalance('' + balanceNumber);
  }

  const DepositBalance = async (e) => {
    e.preventDefault();
    let depositAmount = e.target.depositAmount.value;
    let txt = await contract.deposit({
      value: depositAmount
    });
  }

  const transferHandler = async (e) => {
    e.preventDefault();
    let transferAmount = e.target.sendAmount.value;
    let recieverAddress = e.target.recieverAddress.value;
    let tx;

    try {
      tx = await contract.transferEther(recieverAddress, transferAmount);
      setTransferHash("Transfer confirmation hash: " + tx.hash);
      setShowTransaction(true); // Show the last transaction after successful transfer
    } catch (error) {
      console.error("Error occurred during transfer:", error);
    }
  }

  const WithdrawBalance = async (e) => {
    e.preventDefault();
    let withdrawAmount = e.target.withdrawAmount.value;
    let tx;

    try {
      tx = await contract.withdraw(withdrawAmount);
      setTransferHash("Withdraw confirmation hash: " + tx.hash);
    } catch (error) {
      console.error("Error occurred during withdrawal:", error);
    }
  }

  const [showTransaction, setShowTransaction] = useState(false); // New state to toggle showing the last transaction
  const [lastTransaction, setLastTransaction] = useState('');

  const updateAccountName = async () => {
    let newName = prompt("Enter your new account name:");
    try {
      let tx = await contract.updateAccountName(newName);
      setLastTransaction("Account Name Updated");
    } catch (error) {
      console.error("Error occurred during account name update:", error);
    }
  }

  const checkTransactionStatus = async (e) => {
    e.preventDefault();
    let txHash = e.target.transactionHash.value;
    try {
      let txReceipt = await provider.getTransactionReceipt(txHash);
      if (txReceipt && txReceipt.status === 1) {
        setLastTransaction("Transaction Successful");
      } else {
        setLastTransaction("Transaction Failed");
      }
    } catch (error) {
      console.error("Error occurred while checking transaction status:", error);
    }
  }

  return (
    <div>
      <h1> ATM Machine </h1>
      <h3> Create Account,Check Account,Check Balance,Transfer and Deposit </h3>
      <button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>

      <div className={styles.walletCard}>
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>
        <div>
          <button className={styles.button6} onClick={AccountBalance}>Account Balance</button> <h3>Balance in the Bank: {accbalance} </h3>
          <h2>User Name:Nikhil1810</h2>
        </div>

        {errorMessage}
      </div>
      <div className={styles.interactionsCard}>
        <div>
          <h4>Click here to Create your account. Make sure you are connected to Wallet</h4>
          <button className={styles.button6} onClick={createAccount}>CreateAccount</button>
          <h4>Click here to check if your account Exists or not</h4>
          <button className={styles.button6} onClick={checkAccountExists}>Check Account Exists</button>
          <h4>Your Account Status</h4> <h5> {checkAcc}</h5>
        </div>
        <button className={styles.button6} onClick={() => setShowTransaction(!showTransaction)}>
          Show Last Transaction
        </button>
        {showTransaction && (
          <div className={styles.transactionContainer}>
            {/* Show the last transaction if it exists */}
            {lastTransaction && <div>{lastTransaction}</div>}
          </div>
        )}
        <form onSubmit={transferHandler}>
          <h3> Transfer money </h3>
          <p> Reciever Address </p>
          <input type='text' id='recieverAddress' className={styles.addressInput} />

          <h2> Transfer Amount </h2>
          <input type='number' id='sendAmount' min='0' step='1' />

          <button type='submit' className={styles.button6}>Transfer</button>
          <div>
            {transferHash}
          </div>
        </form>
        <form onSubmit={DepositBalance}>
          <h3> Deposit Money </h3>
          <p> Deposit Amount </p>
          <input type='number' id='depositAmount' min='0' step='1' />
          <button type='submit' className={styles.button6}>Deposit</button>
        </form>
        <form onSubmit={WithdrawBalance}>
          <h3> Withdraw Money </h3>
          <p>Withdraw Amount </p>
          <input type='number' id='withdrawAmount' min='0' step='1' />
          <button type='submit' className={styles.button6}>Withdraw</button>
        </form>
        <div>
          <h4>Update Account Name</h4>
          <button className={styles.button6} onClick={updateAccountName}>Update Account Name</button>
        </div>
        <form onSubmit={checkTransactionStatus}>
          <h4>Check Transaction Status</h4>
          <p>Transaction Hash</p>
          <button type="submit" className={styles.button6}>Check Status</button>
        </form>
      </div>
    </div>
  );
};

export default BankApp;
