# 🛡️ zkBadge – Private Achievement Verifier

A decentralized zero-knowledge DApp built with **Midnight’s Compact language** that allows users to prove they hold valid certifications or identity attributes—**without revealing any sensitive information**.

> ✨ Built for the **Midnight Data-Protection Challenge 2025**

---

## 🚀 Overview

`zkBadge` enables anyone to register and prove ownership of a digital certificate (like a degree, license, or ID clearance) **privately** using ZK proofs. Admins verify the legitimacy of certificate hashes off-chain. Verified users can then access gated features without exposing personal data.

---

## 🔐 Key Features

- ✅ **Private ZK Certificate Registration**
- ✅ **Off-chain Verification with On-chain Status Tracking**
- ✅ **Access Gated Features Based on Verification**
- ✅ **Connects with [Lace Wallet](https://www.lace.io)**
- ✅ **Built using Midnight’s Compact smart contract language**
- ✅ **Frontend built with React + TailwindCSS**

---

## 🧠 Use Case Examples

- Prove you're certified in a field (e.g. KYC, license, diploma) without sharing your name or birthday.
- Get access to gated DAOs, jobs, or services without exposing your documents.
- Integrate with Discord, Web3 platforms, or real-world events that require private access control.

---

## 🏗️ Architecture

### 🧾 Smart Contract (Compact)

- `register()`: Register a certificate hash with ZK proof.
- `verify_certificates()`: Admin approves known/legit certificate hashes.
- `check_verification()`: Anyone can check if a user is verified.
- `access_private_feature()`: Grants verified users access to protected resources.

> See [`contracts/zkBadge.compact`](./contracts/zkBadge.compact)

### 🌐 Frontend (React)

- Connect Lace Wallet
- Disclose private certificate as a ZK proof
- Submit proof to smart contract
- View verification status
- Access private content

> See [`frontend/`](./frontend/)

---

## 🛠️ How to Run Locally

### 🧩 Prerequisites

- [Lace Wallet](https://www.lace.io)
- Midnight CLI or devnet tools
- Node.js ≥ v18
- Yarn

### 🔧 Smart Contracts

```bash
cd contracts/
# Compile contract
compactc zkBadge.compact
# Deploy contract to Midnight devnet
midnight deploy zkBadge
```

### 💻 Frontend

```bash
cd frontend/
yarn install
yarn dev
```

- App will be live at: `http://localhost:3000`
- Connect your Lace Wallet and register your certificate

---

## 🧪 Sample Test Scenario

1. User holds a certificate issued by a trusted authority.
2. They generate a ZK proof using the witness function.
3. Contract checks that:
   - Certificate is valid
   - Not expired
   - Owned by the prover

4. Admin verifies hash off-chain and calls `verify_certificates()`.
5. User gains access to `access_private_feature()`.

---

## 🧰 Tech Stack

| Layer          | Tech                               |
| -------------- | ---------------------------------- |
| Smart Contract | Midnight Compact Language          |
| ZK Proofs      | Disclose / Witness functions       |
| Wallet         | [Lace Wallet](https://www.lace.io) |
| Frontend       | React + TailwindCSS + Vite         |
| Chain          | Midnight Testnet                   |

---

## 🥇 Hackathon Submission

This project was built for the [Midnight Data-Protection Challenge 2025](https://www.lace.io/).

- **Team**: DavyKing + Contributors
- **Category**: ZK Identity & Privacy DApp
- **Status**: ✅ Complete
- **License**: MIT

---

## 🤝 Future Improvements

- Fully automate issuer verification via oracle or cross-contract call.
- Integrate Discord bot for real-time badge gating.
- Add NFT-based badges for off-chain identity portability.
