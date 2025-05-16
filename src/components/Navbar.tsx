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
              className="text-white text-2xl font-extrabold tracking-tight hover:text-emerald-200 transition-colors"
            >
              Capital Frens
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/retire"
              className={`text-base font-medium transition-colors ${
                isActive('/retire')
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              Retire Now
            </Link>
            <Link
              to="/check"
              className={`text-base font-medium transition-colors ${
                isActive('/check')
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              Check Pension
            </Link>
            <Link
              to="/harvest"
              className={`text-base font-medium transition-colors ${
                isActive('/harvest')
                  ? 'text-white border-b-2 border-white pb-1'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              Harvest Pension
            </Link>
            <div className="ml-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;