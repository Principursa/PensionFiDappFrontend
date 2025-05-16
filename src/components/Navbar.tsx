import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white text-2xl font-extrabold tracking-tight hover:text-emerald-200 transition-colors mr-10"
            >
              Capital Frens
            </Link>
          </div>
          <div className="hidden md:flex items-center md:space-x-12 lg:space-x-16">
            <Link
              to="/mint"
              className={`text-base font-medium transition-colors ${
                isActive('/mint')
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              Mint Tokens
            </Link>
            <Link
              to="/retire"
              className={`text-base font-medium transition-colors ${
                isActive('/retire')
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              Retire Now
            </Link>
            <Link
              to="/check"
              className={`text-base font-medium transition-colors ${
                isActive('/check')
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              Check Pension
            </Link>
            <Link
              to="/harvest"
              className={`text-base font-medium transition-colors ${
                isActive('/harvest')
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              Harvest Pension
            </Link>
            <div className="ml-4">
              <ConnectButton />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ConnectButton />
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div className="md:hidden pb-3 pt-1 flex justify-around">
          <Link
            to="/mint"
            className={`text-sm font-medium transition-colors ${
              isActive('/mint')
                ? 'text-white border-b-2 border-white pb-1'
                : 'text-white hover:text-emerald-200'
            }`}
          >
            Mint
          </Link>
          <Link
            to="/retire"
            className={`text-sm font-medium transition-colors ${
              isActive('/retire')
                ? 'text-white border-b-2 border-white pb-1'
                : 'text-white hover:text-emerald-200'
            }`}
          >
            Retire
          </Link>
          <Link
            to="/check"
            className={`text-sm font-medium transition-colors ${
              isActive('/check')
                ? 'text-white border-b-2 border-white pb-1'
                : 'text-white hover:text-emerald-200'
            }`}
          >
            Check
          </Link>
          <Link
            to="/harvest"
            className={`text-sm font-medium transition-colors ${
              isActive('/harvest')
                ? 'text-white border-b-2 border-white pb-1'
                : 'text-white hover:text-emerald-200'
            }`}
          >
            Harvest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;