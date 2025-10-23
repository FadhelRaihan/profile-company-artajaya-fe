import { useState } from 'react';
import { logo } from "@/assets/icons";
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Program", href: "/program" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Kontak Kami", href: "/kontak-kami" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white font-family-['Geist'] text-[#2C4031]">
      <div className="flex items-center justify-between px-12 py-4">
        {/* Logo & Judul */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" onClick={closeMenu}>
            <img className="h-8 w-8 cursor-pointer sm:h-10 sm:w-10" src={logo} alt="Logo" />
          </Link>
          <span className="text-xl font-bold sm:text-2xl">
            IYMPACK
          </span>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex items-center gap-6">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link
                  href={item.href}
                  className="font-family-['Geist'] block cursor-pointer rounded-lg px-4 py-2 text-lg font-semibold text-[#2C4031] transition hover:text-[#8FAE98] focus:text-[#8FAE98]"
                >
                  {item.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center rounded-lg p-2 text-[#2C4031] transition hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`relative z-50 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="border-t border-white/10 bg-[#2C4031] px-4 py-3">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="font-family-['Geist'] block rounded-lg px-4 py-3 text-base font-medium text-white transition hover:bg-white/10 hover:text-amber-50 active:bg-white/20"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;