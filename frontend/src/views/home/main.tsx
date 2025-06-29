import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      {/* Hero Section */}
      <header className="text-center px-6 pt-20 pb-12 bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700 text-white">
        <h1 className="text-5xl font-bold mb-4">OpenRoots AI</h1>
        <p className="text-xl max-w-2xl mx-auto">
          A decentralized AI dataset marketplace built on Story — ensuring data
          provenance, privacy, efficiency, and fair distribution.
        </p>
        <Link
          to="/get-started"
          className="mt-6 inline-block bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why OpenRoots AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">🧬 Data Provenance</h3>
            <p className="text-gray-600">
              Track dataset origin with cryptographic records via IPFS/Story
              CIDs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              🌍 Verified Data Sourcing
            </h3>
            <p className="text-gray-600">
              Earn tokens for verified contributions. Promote trusted AI
              training sets.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">⚡ Efficient AI</h3>
            <p className="text-gray-600">
              Streamline training with relevant, validated, and preprocessed
              data.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">💸 Fair Distribution</h3>
            <p className="text-gray-600">
              Smart contracts reward contributors and validators transparently.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="get-started" className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join the Future of Decentralized AI
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          Upload, monetize, and train AI with open, private, and secure
          datasets. Be part of the next wave of innovation.
        </p>
        <a
          href="#"
          className="bg-indigo-700 text-white px-8 py-4 rounded-full text-lg hover:bg-indigo-800 transition"
        >
          Launch App
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-8 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} OpenRoots AI • Built on Story & IPFS
      </footer>
    </div>
  );
};

export default Home;
