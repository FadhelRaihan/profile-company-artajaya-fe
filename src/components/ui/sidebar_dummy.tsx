// components/Sidebar.tsx
import { NavLink, useLocation } from 'react-router-dom';
import {   ClipboardList,
  Home,
  Image,
  Menu,
  Package,
  X,
  ChevronDown,
  ChevronRight,
  icons,} from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import Icon from '@/assets/icon.png'

export function Sidebar_dummy() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  const toggleDropdown = (menuName: string) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  }
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { 
      name: 'laporan', 
      icon: ClipboardList, 
      children: [
        { name: 'Project', path: 'laporan/project'},
        { name: 'Rancangan Anggara', path: 'laporan/rancanganAnggaran'},
      ],
    },
    { 
      name: 'Master', 
      icon: Package,
      children: [
        { name: 'AHSP', path: 'laporan/ahsp'},
        { name: 'Tim', path: 'laporan/tim'},
        { name: 'Kegiatan', path: 'laporan/kegiatan'}
      ],
    },
  ];

  return (
    <>
      {/**Mobile Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-3 z-50 rounded-md bg-white p-2 shadow-md transition-colors hover:bg-gray-100 lg:hidden"
        aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/**Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-30 bg-white/10 backdrop-blur-lg transition-opacity duration-300 ease-in-out lg:hidden"
          onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64  transform flex-col bg-white px-4 py-6 transition-transform duration-300 ease-in-out lg:static ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } shadow-lg lg:shadow-none`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mb-10 mt-12 lg:mt-0">
          <img src={Icon}alt="ArtaJaya Logo" className="h-16 w-16 rounded-xs object-contain bg-red-600" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Jika menu punya anak (dropdown)
            if (item.children) {
              const isExpanded = openDropdown === item.name;
              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex w-full items-center justify-between rounded-md p-3 text-left transition-colors ${
                      isExpanded
                        ? "bg-gray-100 font-semibold text-[#2C4031]"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#2C4031]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm sm:text-base">{item.name}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {/* Dropdown anak */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.path}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `block rounded-md p-2 text-sm transition-colors ${
                              isActive
                                ? "bg-gray-100 font-medium text-[#2C4031]"
                                : "text-gray-600 hover:bg-gray-100 hover:text-[#2C4031]"
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // Jika menu biasa (tanpa anak)
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md p-3 transition-colors ${
                    isActive
                      ? "bg-gray-100 font-semibold text-[#2C4031]"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#2C4031]"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm sm:text-base">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}
