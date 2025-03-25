'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaBars,
  FaTimes,
  FaBell,
  FaAngleDown,
  FaSignOutAlt,
  FaCog,
  FaHistory
} from 'react-icons/fa';
import userService, { UserData } from '../services/userService';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const loadUserData = async () => {
      const data = await userService.getUserData();
      setUserData(data);
    };

    loadUserData();

    // Adicionar listener para atualizações
    const handleUserUpdate = (newData: UserData) => {
      setUserData(newData);
    };

    userService.addListener(handleUserUpdate);

    return () => {
      userService.removeListener(handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    window.location.href = '/login';
  };

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/passenger-dashboard', label: 'Buscar Carona' },
    { href: '/driver-dashboard', label: 'Oferecer Carona' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">UniGo</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${pathname === item.href
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                  } transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Perfil e Notificações */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <FaBell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 hover:bg-slate-50 rounded-full pl-2 pr-3 py-1 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                  {userData?.image ? (
                    <Image
                      src={userData.image}
                      alt={userData.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="w-full h-full p-1.5 text-slate-400" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">{userData?.name}</span>
                <FaAngleDown className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
                >
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <FaUser className="text-slate-400" />
                    <span>Meu Perfil</span>
                  </Link>
                  <Link
                    href="/ride-history"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <FaHistory className="text-slate-400" />
                    <span>Histórico</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <FaCog className="text-slate-400" />
                    <span>Configurações</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    <span>Sair</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Expandido */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-slate-200"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                {userData?.image ? (
                  <Image
                    src={userData.image}
                    alt={userData.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-full h-full p-2 text-slate-400" />
                )}
              </div>
              <div>
                <div className="font-medium text-slate-900">{userData?.name}</div>
                <div className="text-sm text-slate-500">{userData?.email}</div>
              </div>
            </div>

            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                    } transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/profile"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Meu Perfil
              </Link>
              <Link
                href="/ride-history"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Histórico
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Configurações
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                Sair
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
