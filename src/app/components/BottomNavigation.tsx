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
            activeTextColor: 'text-blue-600',
            activeBgColor: 'bg-blue-100',
            activeTextColorDark: 'text-blue-700'
        },
        {
            path: '/passenger-dashboard',
            label: 'Buscar',
            icon: FaSearch,
            activeTextColor: 'text-green-600',
            activeBgColor: 'bg-green-100',
            activeTextColorDark: 'text-green-700'
        },
        {
            path: '/driver-dashboard',
            label: 'Oferecer',
            icon: FaCar,
            activeTextColor: 'text-indigo-600',
            activeBgColor: 'bg-indigo-100',
            activeTextColorDark: 'text-indigo-700'
        },
        {
            path: '/ride-history',
            label: 'Histórico',
            icon: FaHistory,
            activeTextColor: 'text-amber-600',
            activeBgColor: 'bg-amber-100',
            activeTextColorDark: 'text-amber-700'
        },
        {
            path: '/profile',
            label: 'Perfil',
            icon: FaUser,
            activeTextColor: 'text-purple-600',
            activeBgColor: 'bg-purple-100',
            activeTextColorDark: 'text-purple-700'
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
                {navItems.map((item) => {
                    const active = isActive(item.path);

                    return (
                        <motion.button
                            key={item.path}
                            className="flex flex-col items-center justify-center p-2 rounded-lg relative"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigateTo(item.path)}
                        >
                            {active && (
                                <motion.div
                                    className={`absolute inset-0 ${item.activeBgColor} opacity-80 rounded-lg`}
                                    layoutId="bottomNavActive"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <div className={`p-1 rounded-full ${active ? item.activeTextColor : 'text-slate-500'}`}>
                                <item.icon size={20} />
                            </div>

                            <span className={`text-xs mt-1 font-medium ${active ? item.activeTextColorDark : 'text-slate-500'}`}>
                                {item.label}
                            </span>
                        </motion.button>
                    );
                })}
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
