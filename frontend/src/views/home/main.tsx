import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      {/* Hero Section */}
      <header className="text-center px-6 pt-20 pb-12 bg-gradient-to-r from-indigo-800 via-purple-700 to-blue-700 text-white">
        <h1 className="text-5xl font-bold mb-4">ZK Badge</h1>
        <p className="text-xl max-w-2xl mx-auto">
          A privacy-preserving identity verification system powered by Midnight.
          Prove who you are — without revealing who you are.
        </p>
        <Link
          to="/verify"
          className="mt-6 inline-block bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Get Your Badge
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Use ZK Badge?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">🕶️ Privacy by Design</h3>
            <p className="text-gray-600">
              Prove your eligibility without revealing your identity. Your badge
              lives in zero knowledge.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              ✅ Verifiable Credentials
            </h3>
            <p className="text-gray-600">
              Admins verify ZK badge hashes off-chain to grant verified status
              on-chain.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🔐 Access Control</h3>
            <p className="text-gray-600">
              Only verified badge holders can access certain smart contract
              features.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              ⚡ On-Chain Efficiency
            </h3>
            <p className="text-gray-600">
              Minimal on-chain data — only a hash and status. All heavy logic
              stays in the circuit.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join the Privacy-Preserving Identity Revolution
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          Register your ZK Badge, gain verification, and unlock powerful
          features — all while staying anonymous.
        </p>
        <Link
          to="/verify"
          className="bg-indigo-700 text-white px-8 py-4 rounded-full text-lg hover:bg-indigo-800 transition"
        >
          Get Verified
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-8 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} ZK Badge • Built with Midnight & Zero
        Knowledge
      </footer>
    </div>
  );
};

export default Home;
