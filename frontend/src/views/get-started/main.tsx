import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Get Started with OpenRoots AI
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Upload, discover, and monetize AI datasets securely using Story &
          IPFS.
        </p>

        {/* Step-by-step guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">📁 Upload a Dataset</h2>
            <p className="text-gray-600 mb-4">
              Store your dataset on IPFS/Story and get a unique CID. Provenance
              guaranteed.
            </p>
            <Link
              to="/upload-now"
              className="text-indigo-600 font-medium hover:underline"
            >
              Upload Now →
            </Link>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">🔍 Discover Datasets</h2>
            <p className="text-gray-600 mb-4">
              Browse verified datasets categorized by type, rating, and quality.
              Train better AI.
            </p>
            <Link
              to="/discover-dataset"
              className="text-indigo-600 font-medium hover:underline"
            >
              Explore →
            </Link>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">💸 Earn & Contribute</h2>
            <p className="text-gray-600 mb-4">
              Get rewarded when your dataset is used or verified. Help build
              trusted AI.
            </p>
            <a
              href="#contribute"
              className="text-indigo-600 font-medium hover:underline"
            >
              Join Now →
            </a>
          </div>
        </div>

        {/* Bonus CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Need help getting started?
          </h3>
          <p className="text-gray-600 mb-6">
            Check out our documentation, or join our community on Discord to
            chat with other contributors.
          </p>
          <a
            href="https://discord.gg/yourdiscordlink"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-700 text-white px-6 py-3 rounded-full hover:bg-indigo-800 transition"
          >
            Join the Community
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
