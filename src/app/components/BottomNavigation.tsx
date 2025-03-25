'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    FaCompass,
    FaRoute,
    FaCar,
    FaHistory,
    FaUser,
    FaSearch
} from 'react-icons/fa';

interface BottomNavigationProps {
    activeTab?: string;
}

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
    const router = useRouter();
    const pathname = usePathname();

    // Definir itens de navegação
    const navItems = [
        {
            path: '/dashboard',
            label: 'Início',
            icon: FaCompass,
            gradient: 'from-blue-600 to-blue-800'
        },
        {
            path: '/passenger-dashboard',
            label: 'Buscar',
            icon: FaSearch,
            gradient: 'from-green-600 to-green-800',
            oldStyle: true
        },
        {
            path: '/driver-dashboard',
            label: 'Oferecer',
            icon: FaCar,
            gradient: 'from-indigo-600 to-indigo-800'
        },
        {
            path: '/ride-history',
            label: 'Histórico',
            icon: FaHistory,
            gradient: 'from-amber-600 to-amber-800'
        },
        {
            path: '/profile',
            label: 'Perfil',
            icon: FaUser,
            gradient: 'from-purple-600 to-purple-800'
        }
    ];

    // Navegar para a página selecionada
    const navigateTo = (path: string) => {
        router.push(path);
    };

    // Verificar se o caminho atual corresponde ao item de navegação
    const isActive = (path: string) => {
        if (activeTab) {
            // Se activeTab foi fornecido, compare com a parte do caminho após a última '/'
            const tabName = path.split('/').pop() || '';
            return tabName === activeTab || (activeTab === 'passenger' && tabName === 'passenger-dashboard') ||
                (activeTab === 'driver' && tabName === 'driver-dashboard');
        }
        return pathname === path;
    };

    return (
        <motion.div
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        >
            <div className="flex justify-around py-1 px-1">
                {navItems.map((item, index) => (
                    <motion.button
                        key={item.path}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg relative ${isActive(item.path)
                            ? item.oldStyle
                                ? 'text-green-600'
                                : 'text-blue-600'
                            : 'text-slate-500'
                            }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigateTo(item.path)}
                    >
                        {isActive(item.path) && !item.oldStyle && (
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 rounded-lg`}
                                layoutId="bottomNavActive"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}

                        <div className={`p-1 rounded-full ${isActive(item.path)
                            ? item.oldStyle
                                ? 'bg-green-50'
                                : 'bg-blue-50'
                            : ''
                            }`}>
                            <item.icon
                                size={20}
                                className={
                                    isActive(item.path) && !item.oldStyle
                                        ? `text-${item.gradient.split('-')[1]}-600`
                                        : isActive(item.path) && item.oldStyle
                                            ? 'text-green-600'
                                            : ''
                                }
                            />
                        </div>
                        <span className={`text-xs mt-1 font-medium ${isActive(item.path)
                            ? item.oldStyle
                                ? 'text-green-800'
                                : 'text-slate-800'
                            : 'text-slate-500'
                            }`}>
                            {item.label}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Indicador de página atual - linha superior animada */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-200 overflow-hidden">
                <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: '20%', x: '0%' }}
                    animate={{
                        width: '20%',
                        x: `${navItems.findIndex(item => isActive(item.path)) * 100}%`,
                        backgroundColor: isActive('/passenger-dashboard') ? '#16a34a' : '#3b82f6'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            </div>
        </motion.div>
    );
}
