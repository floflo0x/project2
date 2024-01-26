import { useState } from 'react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

import { Keypair, sendAndConfirmTransaction } from "@solana/web3.js";

function Wallet({ donationAmount, customAmount }) {
  const [txId, setTxId] = useState();
  // get a connection
  const { connection } = useConnection();
  // use the hook in your component
  const { connected, sendTransaction, publicKey } = useWallet();

  const LAMPORTS_PER_SOL = 1000000000;

  const handleDonation = (donationAmount, customAmount) => {
    // Perform any logic here based on donationAmount and customAmount
    // For example, calculate lamports
    const lamports = Math.floor((donationAmount || customAmount) * LAMPORTS_PER_SOL);

    // Return the result or perform other actions
    return lamports;
  };

  const lamports = handleDonation(donationAmount, customAmount);

  console.log(lamports);

  const sendSolana = async () => {
    if (!connected) {
      // Prompt the user to connect their wallet
      // or provide a UI indicating that the wallet is not connected.
      console.log("Wallet not connected. Please connect your wallet before sending a transaction.");
      return;
    }

    const toPublicKey = new PublicKey("F9rXiSZgBuU3iAG6ftfWRGUDucKY38PxBfNpAWNGec1T");

    // const signature = await connection.requestAirdrop(toPublicKey, LAMPORTS_PER_SOL);

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toPublicKey,
        lamports: lamports
      })
    );

    // and then send the transaction:
    const hash = await sendTransaction(transaction, connection);
    setTxId(hash);
  };

  return (
    <div>
      <button 
        className="bg-dark mb-2" 
        disabled={!publicKey} 
        onClick={sendSolana}
        style={{
          background: 'linear-gradient(45deg, orange, yellow)',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '20px',
          color: 'green',
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.15)'
        }}
      >
          Send transaction
      </button>
      {txId && <p>The transaction hash is {txId}</p>}
    </div>
  );
}

export default Wallet;