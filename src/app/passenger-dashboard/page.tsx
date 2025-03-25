'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import {
    FaCar,
    FaMapMarkerAlt,
    FaRegClock,
    FaCalendarAlt,
    FaStar,
    FaRoute,
    FaSearch,
    FaHistory,
    FaBookmark,
    FaMapMarked,
    FaUniversity,
    FaPlus
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false });

// Componente para buscar parâmetros com Suspense
function SearchParamHandler({ onParamFound }: { onParamFound: (destination: string | null) => void }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const destinationParam = searchParams?.get('destination');
        onParamFound(destinationParam);
    }, [searchParams, onParamFound]);

    return null;
}

export default function PassengerDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const router = useRouter();

    // Estado para busca de carona
    const [searchRide, setSearchRide] = useState({
        origin: '',
        destination: '',
        date: ''
    });

    // Estado para caronas disponíveis
    const [availableRides, setAvailableRides] = useState([
        {
            id: 1,
            driver: {
                name: 'Ana Silva',
                rating: 4.8,
                image: '/images/avatar1.jpg',
                totalRides: 45
            },
            origin: 'Centro de Ourinhos',
            destination: 'UniFio - Campus Principal',
            date: '2023-05-25',
            time: '07:15',
            seats: 3,
            price: 'R$ 4,00'
        },
        {
            id: 2,
            driver: {
                name: 'Carlos Souza',
                rating: 4.9,
                image: '/images/avatar2.jpg',
                totalRides: 120
            },
            origin: 'Jardim Europa',
            destination: 'UniFio - Campus Principal',
            date: '2023-05-25',
            time: '07:30',
            seats: 2,
            price: 'R$ 6,00'
        },
        {
            id: 3,
            driver: {
                name: 'Mariana Costa',
                rating: 4.7,
                image: '/images/avatar3.jpg',
                totalRides: 37
            },
            origin: 'Jardim Matilde',
            destination: 'UniFio - Campus Principal',
            date: '2023-05-25',
            time: '18:15',
            seats: 3,
            price: 'R$ 5,00'
        },
        {
            id: 4,
            driver: {
                name: 'Roberto Almeida',
                rating: 4.6,
                image: '/images/avatar4.jpg',
                totalRides: 85
            },
            origin: 'Vila Margarida',
            destination: 'UniFio - Campus Empresarial',
            date: '2023-05-25',
            time: '08:00',
            seats: 1,
            price: 'R$ 4,50'
        }
    ]);

    // Estado para caronas agendadas
    const [scheduledRides, setScheduledRides] = useState([
        {
            id: 1,
            driver: {
                name: 'Rafael Silva',
                rating: 4.7,
                image: '/images/avatar5.jpg'
            },
            origin: 'Centro de Ourinhos',
            destination: 'UniFio - Campus Principal',
            date: '2023-05-26',
            time: '07:30',
            price: 'R$ 8,00',
            status: 'confirmada'
        }
    ]);

    // Rotas favoritas
    const favoriteRoutes = [
        {
            id: 1,
            origin: 'Centro de Ourinhos',
            destination: 'UniFio - Campus Principal',
            frequency: '15 caronas/semana'
        },
        {
            id: 2,
            origin: 'UniFio - Campus Principal',
            destination: 'Centro de Ourinhos',
            frequency: '12 caronas/semana'
        }
    ];

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('userToken');
            const name = localStorage.getItem('userName');
            const image = localStorage.getItem('userImage');

            if (!token) {
                window.location.href = '/login';
                return;
            }

            setUserName(name || 'Usuário');
            setUserImage(image || '');

            // Definir data padrão como hoje
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            setSearchRide(prev => ({ ...prev, date: formattedDate }));

            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const handleDestinationParamFound = (destination: string | null) => {
        if (destination) {
            setSearchRide(prev => ({ ...prev, destination }));
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você implementaria a lógica para buscar caronas
        console.log('Buscar caronas:', searchRide);
    };

    const handleReserveRide = (rideId: number) => {
        // Aqui seria feita a reserva no backend
        console.log('Reservando carona:', rideId);
        alert(`Carona ${rideId} reservada com sucesso!`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <Navbar />
            <Suspense fallback={null}>
                <SearchParamHandler onParamFound={handleDestinationParamFound} />
            </Suspense>

            <main className="pt-20 pb-12 px-3 sm:px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Seção de boas-vindas e busca */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl md:rounded-2xl shadow-lg p-5 md:p-8 mb-6 text-white relative overflow-hidden"
                    >
                        <div className="absolute right-0 top-0 opacity-10">
                            <FaCar size={100} className="transform -rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <FaRoute className="text-xl sm:text-2xl text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Encontre sua Carona</h1>
                                    <p className="text-blue-100">Olá, {userName}! Para onde você vai hoje?</p>
                                </div>
                            </div>

                            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                <div>
                                    <label className="block text-sm text-white mb-1">Origem</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-800" />
                                        <input
                                            type="text"
                                            value={searchRide.origin}
                                            onChange={(e) => setSearchRide({ ...searchRide, origin: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
                                            placeholder="De onde você está saindo?"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-white mb-1">Destino</label>
                                    <div className="relative">
                                        <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-800" />
                                        <input
                                            type="text"
                                            value={searchRide.destination}
                                            onChange={(e) => setSearchRide({ ...searchRide, destination: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
                                            placeholder="Para onde você vai?"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-white mb-1">Data</label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-800" />
                                        <input
                                            type="date"
                                            value={searchRide.date}
                                            onChange={(e) => setSearchRide({ ...searchRide, date: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 md:col-span-3">
                                    <motion.button
                                        type="submit"
                                        className="w-full bg-white text-blue-900 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 mt-1 border border-white/50 shadow-md"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaSearch className="text-sm" />
                                        Buscar Caronas
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
                        <div className="lg:col-span-2">
                            {/* Caronas Disponíveis */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-5 md:mb-8"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Caronas Disponíveis</h2>
                                    <motion.button
                                        className="text-blue-600 text-xs md:text-sm font-medium flex items-center"
                                        whileHover={{ x: 3 }}
                                    >
                                        Ver todas <FaRoute className="ml-1" />
                                    </motion.button>
                                </div>

                                <div className="space-y-4">
                                    {availableRides.map((ride) => (
                                        <motion.div
                                            key={ride.id}
                                            className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                            whileHover={{ y: -2, backgroundColor: '#f8faff' }}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                                <div className="flex-shrink-0 flex justify-center">
                                                    <Image
                                                        src={ride.driver.image}
                                                        alt={ride.driver.name}
                                                        width={48}
                                                        height={48}
                                                        className="rounded-full"
                                                    />
                                                </div>

                                                <div className="flex-grow">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <span className="font-medium">{ride.driver.name}</span>
                                                        <div className="flex items-center text-yellow-500">
                                                            <FaStar className="text-xs" />
                                                            <span className="text-xs ml-1">{ride.driver.rating}</span>
                                                        </div>
                                                        <span className="text-xs text-slate-500">
                                                            {ride.driver.totalRides} caronas realizadas
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center text-sm text-slate-500 mb-2">
                                                        <FaCalendarAlt className="mr-2 text-slate-400 flex-shrink-0" />
                                                        {new Date(ride.date).toLocaleDateString('pt-BR')} às {ride.time}
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm max-w-full">
                                                        <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                        <span className="font-medium truncate">{ride.origin} → {ride.destination}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-3 sm:mt-0 text-center sm:text-right flex flex-col items-center sm:items-end">
                                                    <p className="font-bold text-green-600 mb-1">{ride.price}</p>
                                                    <p className="text-sm text-slate-600">{ride.seats} vagas</p>
                                                    <motion.button
                                                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium w-full sm:w-auto border border-blue-700 shadow-sm"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleReserveRide(ride.id)}
                                                    >
                                                        Reservar
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Caronas Agendadas */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Suas Caronas Agendadas</h2>
                                    <motion.button
                                        className="text-blue-600 text-xs md:text-sm font-medium flex items-center"
                                        whileHover={{ x: 3 }}
                                    >
                                        Ver histórico <FaHistory className="ml-1" />
                                    </motion.button>
                                </div>

                                <div className="space-y-4">
                                    {scheduledRides.map((ride) => (
                                        <motion.div
                                            key={ride.id}
                                            className="border border-slate-200 rounded-lg p-4"
                                            whileHover={{ y: -2, backgroundColor: '#f8faff' }}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                                <div className="flex-shrink-0 flex justify-center">
                                                    <Image
                                                        src={ride.driver.image}
                                                        alt={ride.driver.name}
                                                        width={48}
                                                        height={48}
                                                        className="rounded-full"
                                                    />
                                                </div>

                                                <div className="flex-grow">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <span className="font-medium">{ride.driver.name}</span>
                                                        <div className="flex items-center text-yellow-500">
                                                            <FaStar className="text-xs" />
                                                            <span className="text-xs ml-1">{ride.driver.rating}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center text-sm text-slate-500 mb-2">
                                                        <FaCalendarAlt className="mr-2 text-slate-400 flex-shrink-0" />
                                                        {new Date(ride.date).toLocaleDateString('pt-BR')} às {ride.time}
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm max-w-full">
                                                        <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                        <span className="font-medium truncate">{ride.origin} → {ride.destination}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-3 sm:mt-0 text-center sm:text-right flex flex-col items-center sm:items-end">
                                                    <p className="font-bold text-green-600 mb-1">{ride.price}</p>
                                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                        {ride.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <div>
                            {/* Rotas Favoritas */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:sticky lg:top-24"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaBookmark className="text-blue-600" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Rotas Favoritas</h2>
                                </div>

                                <div className="space-y-3">
                                    {favoriteRoutes.map((route) => (
                                        <motion.div
                                            key={route.id}
                                            className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                                            whileHover={{ x: 3 }}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <FaMapMarked className="text-blue-500 flex-shrink-0" />
                                                <span className="font-medium text-sm truncate">{route.origin}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                <span className="font-medium text-sm truncate">{route.destination}</span>
                                            </div>
                                            <p className="text-xs text-slate-500">{route.frequency}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <motion.button
                                        className="w-full bg-blue-50 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border border-blue-100 shadow-sm"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaPlus className="text-sm" />
                                        Adicionar Rota
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Barra de navegação inferior */}
            <BottomNavigation activeTab="passenger" />
        </div>
    );
}
