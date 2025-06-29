import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ConnectWalletButton from "./ConnectWalletButton";

const NavHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/get-started", label: "Start" },
    { to: "/upload-now", label: "Upload" },
    { to: "/discover-dataset", label: "Discover" },
    { to: "/collect-rewards", label: "Rewards" },
  ];

  const renderLinks = (isMobile = false) =>
    links.map(({ to, label }) => (
      <Link
        key={to}
        to={to}
        onClick={isMobile ? () => setMenuOpen(false) : undefined}
        className="text-lg text-gray-700 hover:text-blue-600"
      >
        {label}
      </Link>
    ));

  return (
    <header className="p-6 border-b shadow-sm bg-white flex justify-between items-center mb-6 relative">
      <Link to="/">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
          OpenRoots
        </h1>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 items-center">
        {renderLinks()} <ConnectWalletButton />
      </nav>

      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden space-x-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-white shadow-md flex flex-col space-y-4 p-4 md:hidden z-50">
          {renderLinks(true)}
          <ConnectWalletButton />
        </nav>
      )}
    </header>
  );
};

export default NavHeader;
