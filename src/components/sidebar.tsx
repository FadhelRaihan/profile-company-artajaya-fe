// components/Sidebar.tsx
import { logo } from '@/assets/icons';
import { Link, usePage } from '@inertiajs/react';
import { ClipboardList, Home, Image, Menu, Package, X , Phone, Award, User} from 'lucide-react';

import { useState } from 'react';

export function Sidebar() {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        {
            name: 'Dashboard',
            icon: Home,
            path: '/dashboard',
        },
        {
            name: 'Kegiatan/Proker',
            icon: ClipboardList,
            path: '/master-event',
        },
        {
            name: 'Program',
            icon: Package,
            path: '/master-program',
        },
        {
            name: 'Poster Kegiatan',
            icon: Image,
            path: '/master-poster',
        },
        {
            name: 'Nomor Telepon',
            icon: Phone,
            path: '/master-phonenumber'
        },
        {
            name: 'Jabatan',
            icon: Award,
            path: '/master-jabatan'
        },
        {
            name: 'Anggota',
            icon: User,
            path: '/master-anggota'
        }
    ];

    const isActive = (path: string) => {
        return url === path || url.startsWith(path + '/');
    };

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 rounded-md bg-white p-2 text-[#2C4031] shadow-md transition-colors hover:bg-gray-100 lg:hidden"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Overlay - Versi Transparan */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-white/10 backdrop-blur-lg transition-opacity duration-300 ease-in-out lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 transform flex-col bg-white px-4 py-6 transition-transform duration-300 ease-in-out lg:static ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-lg lg:shadow-none`}
            >
                {/* Logo Section */}
                <div className="mt-12 mb-10 flex items-center gap-2 px-2 lg:mt-0">
                    <img src={logo} alt="IYMPACK Logo" className="h-10 w-10 rounded-full" />
                    <span className="text-2xl font-bold text-[#2C4031]">IYMPACK</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={handleLinkClick}
                                className={`flex items-center gap-3 rounded-md p-3 transition-colors ${
                                    active ? 'bg-gray-100 font-semibold text-[#2C4031]' : 'text-gray-700 hover:bg-gray-100 hover:text-[#2C4031]'
                                } `}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-sm sm:text-base">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
