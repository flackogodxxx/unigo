'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: 'Início', path: '/' },
    { label: 'Benefícios', path: '/#beneficios' },
    { label: 'Como Funciona', path: '/#como-funciona' },
    { label: 'Entrar', path: '/login' },
    { label: 'Cadastrar', path: '/register', highlight: true }
  ];

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    if (path.includes('#')) {
      if (pathname === '/') {
        const sectionId = path.split('#')[1];
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(path);
      }
    } else {
      router.push(path);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <FaCar className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold gradient-text">UniGo</span>
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`relative px-4 py-2 rounded-lg transition-all ${
                  item.highlight
                    ? 'btn-primary text-sm'
                    : `nav-link ${pathname === item.path ? 'text-blue-900' : 'text-slate-600'}`
                }`}
                whileHover={item.highlight ? { scale: 1.05 } : { y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {!item.highlight && pathname === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                    layoutId="navbar-active"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <motion.div
              className="container mx-auto px-4 py-4 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full text-left rounded-lg transition-all ${
                    item.highlight
                      ? 'btn-primary text-center my-4'
                      : `p-3 ${
                          pathname === item.path
                            ? 'bg-blue-50 text-blue-900'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={item.highlight ? { scale: 1.02 } : { x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
