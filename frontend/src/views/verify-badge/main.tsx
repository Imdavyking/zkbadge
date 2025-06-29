import React, { useState } from "react";

const VerifyBadge = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setStatus("");

    try {
      // Replace this with actual Midnight SDK or CLI logic
      // Simulated flow:
      // 1. user_certificate() is provided from local wallet/ZK proof tool
      // 2. call register() circuit
      await new Promise((res) => setTimeout(res, 2000)); // simulate delay

      setStatus("Certificate registered! Awaiting admin verification.");
    } catch (err) {
      setError("Failed to register badge. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Submit Your ZK Badge</h1>
      <p className="text-gray-600 mb-6">
        Prove you own a valid badge and register it privately. Your data stays
        off-chain — only a hash is stored on the blockchain.
      </p>

      <button
        onClick={handleRegister}
        disabled={loading}
        className="bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-800 transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register My Badge"}
      </button>

      {status && <p className="mt-4 text-green-600 font-medium">{status}</p>}
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default VerifyBadge;
