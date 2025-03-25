'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import {
    FaCar,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaStar,
    FaRoute,
    FaPlus,
    FaHistory,
    FaClock,
    FaUser,
    FaCog,
    FaUniversity,
    FaHandsHelping
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false });

export default function DriverDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const router = useRouter();

    // Estado para caronas oferecidas
    const [offeredRides, setOfferedRides] = useState([
        {
            id: 1,
            origin: 'Centro de Ourinhos',
            destination: 'UniFio - Campus Principal',
            date: '2023-05-25',
            time: '07:15',
            availableSeats: 3,
            price: 'R$ 4,00',
            passengers: [
                {
                    id: 101,
                    name: 'Maria Santos',
                    rating: 4.9,
                    image: '/images/avatar6.jpg'
                }
            ]
        },
        {
            id: 2,
            origin: 'Jardim Europa',
            destination: 'UniFio - Campus Empresarial',
            date: '2023-05-26',
            time: '08:00',
            availableSeats: 2,
            price: 'R$ 5,00',
            passengers: []
        }
    ]);

    // Estado para histórico de caronas
    const [rideHistory, setRideHistory] = useState([
        {
            id: 1001,
            origin: 'Centro de Ourinhos',
            destination: 'UniFio - Campus Principal',
            date: '2023-05-20',
            time: '07:30',
            passengers: 3,
            earnings: 'R$ 12,00'
        },
        {
            id: 1002,
            origin: 'UniFio - Campus Principal',
            destination: 'Centro de Ourinhos',
            date: '2023-05-20',
            time: '18:00',
            passengers: 4,
            earnings: 'R$ 16,00'
        },
        {
            id: 1003,
            origin: 'Jardim Paulista',
            destination: 'UniFio - Campus Principal',
            date: '2023-05-19',
            time: '07:15',
            passengers: 2,
            earnings: 'R$ 10,00'
        }
    ]);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('userToken');
            const name = localStorage.getItem('userName');
            const image = localStorage.getItem('userImage');

            if (!token) {
                window.location.href = '/login';
                return;
            }

            setUserName(name || 'Motorista');
            setUserImage(image || '');
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const handleCreateRide = () => {
        router.push('/offer-ride');
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

            <main className="pt-20 pb-12 px-3 sm:px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Header e ações */}
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
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Painel do Motorista</h1>
                                    <p className="text-blue-100">Olá, {userName}! Gerencie suas caronas.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                <motion.button
                                    className="bg-white/10 hover:bg-white/20 rounded-xl p-4 border border-white/30 flex items-center gap-3 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCreateRide}
                                >
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <FaPlus className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Oferecer Carona</p>
                                        <p className="text-xs text-blue-100">Criar nova oferta</p>
                                    </div>
                                </motion.button>

                                <motion.button
                                    className="bg-white/10 hover:bg-white/20 rounded-xl p-4 border border-white/30 flex items-center gap-3 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <FaHistory className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Histórico</p>
                                        <p className="text-xs text-blue-100">Ver caronas anteriores</p>
                                    </div>
                                </motion.button>

                                <motion.button
                                    className="bg-white/10 hover:bg-white/20 rounded-xl p-4 border border-white/30 flex items-center gap-3 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <FaCog className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Configurações</p>
                                        <p className="text-xs text-blue-100">Ajustar preferências</p>
                                    </div>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
                        <div className="lg:col-span-2">
                            {/* Caronas Oferecidas */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-5 md:mb-8"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Suas Caronas Ofertadas</h2>
                                    <motion.button
                                        className="text-blue-600 text-xs md:text-sm font-medium flex items-center"
                                        whileHover={{ x: 3 }}
                                        onClick={handleCreateRide}
                                    >
                                        Nova oferta <FaPlus className="ml-1" />
                                    </motion.button>
                                </div>

                                <div className="space-y-4">
                                    {offeredRides.map((ride) => (
                                        <motion.div
                                            key={ride.id}
                                            className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                            whileHover={{ y: -2, backgroundColor: '#f8faff' }}
                                        >
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <div className="flex-grow">
                                                    <div className="flex items-center text-sm text-slate-500 mb-2">
                                                        <FaCalendarAlt className="mr-2 text-slate-400 flex-shrink-0" />
                                                        {new Date(ride.date).toLocaleDateString('pt-BR')} às {ride.time}
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm max-w-full">
                                                        <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                        <div className="font-medium truncate">
                                                            <span>{ride.origin}</span>
                                                            <span className="mx-1">→</span>
                                                            <span>{ride.destination}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-3 mt-3">
                                                        <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                                            {ride.availableSeats} vagas disponíveis
                                                        </div>
                                                        <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                                                            {ride.price}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border-t md:border-t-0 md:border-l border-slate-100 md:pl-4 pt-3 md:pt-0">
                                                    <p className="text-sm font-medium text-slate-700 mb-2">Passageiros ({ride.passengers.length})</p>

                                                    <div className="flex flex-col gap-2">
                                                        {ride.passengers.length > 0 ? (
                                                            ride.passengers.map(passenger => (
                                                                <div key={passenger.id} className="flex items-center gap-2">
                                                                    <Image
                                                                        src={passenger.image}
                                                                        alt={passenger.name}
                                                                        width={24}
                                                                        height={24}
                                                                        className="rounded-full"
                                                                    />
                                                                    <span className="text-sm">{passenger.name}</span>
                                                                    <div className="flex items-center text-yellow-500 text-xs">
                                                                        <FaStar className="mr-1" />
                                                                        {passenger.rating}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-slate-500">Nenhum passageiro ainda</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {offeredRides.length === 0 && (
                                        <div className="text-center py-8">
                                            <FaCar className="mx-auto text-slate-300 text-4xl mb-3" />
                                            <p className="text-slate-500">Você ainda não ofereceu caronas</p>
                                            <motion.button
                                                onClick={handleCreateRide}
                                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Oferecer agora
                                            </motion.button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Histórico de Caronas */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Histórico de Caronas</h2>
                                    <motion.button
                                        className="text-blue-600 text-xs md:text-sm font-medium flex items-center"
                                        whileHover={{ x: 3 }}
                                    >
                                        Ver tudo <FaHistory className="ml-1" />
                                    </motion.button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                            <tr>
                                                <th className="px-3 py-3 text-left">Data</th>
                                                <th className="px-3 py-3 text-left">Rota</th>
                                                <th className="px-3 py-3 text-center">Passageiros</th>
                                                <th className="px-3 py-3 text-right">Ganhos</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {rideHistory.map((ride) => (
                                                <motion.tr
                                                    key={ride.id}
                                                    className="hover:bg-slate-50"
                                                    whileHover={{ backgroundColor: '#f8faff' }}
                                                >
                                                    <td className="px-3 py-3 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <FaClock className="text-slate-400 mr-2 flex-shrink-0" />
                                                            <span className="text-sm">
                                                                {new Date(ride.date).toLocaleDateString('pt-BR')} - {ride.time}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <div className="flex items-center max-w-xs">
                                                            <FaRoute className="text-blue-500 mr-2 flex-shrink-0" />
                                                            <span className="text-sm truncate">
                                                                {ride.origin} → {ride.destination}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <FaUser className="text-slate-400 mr-1 flex-shrink-0" />
                                                            <span className="text-sm">{ride.passengers}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3 text-right font-medium text-green-600">
                                                        {ride.earnings}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </div>

                        <div>
                            {/* Estatísticas e Informações */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:sticky lg:top-24"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaCar className="text-blue-600" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800">Seu Perfil</h2>
                                </div>

                                <div className="flex flex-col items-center mb-4 pt-2 pb-6 border-b border-slate-100">
                                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-blue-200">
                                        <Image
                                            src={userImage || '/images/avatar-placeholder.jpg'}
                                            alt={userName}
                                            width={80}
                                            height={80}
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg">{userName}</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar className="text-yellow-200" />
                                        <span className="ml-1 text-slate-700 font-medium">4.8</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                                            <p className="text-xs text-slate-500 mb-1">Caronas</p>
                                            <p className="text-xl font-bold text-blue-700">42</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                                            <p className="text-xs text-slate-500 mb-1">Passageiros</p>
                                            <p className="text-xl font-bold text-blue-700">157</p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaHandsHelping className="text-blue-600" />
                                            <h3 className="font-medium text-blue-800">Impacto Ambiental</h3>
                                        </div>
                                        <p className="text-sm text-blue-700 mb-2">Você já economizou:</p>
                                        <div className="space-y-1">
                                            <p className="text-sm flex justify-between">
                                                <span>CO² reduzido:</span>
                                                <span className="font-medium">87kg</span>
                                            </p>
                                            <p className="text-sm flex justify-between">
                                                <span>Combustível economizado:</span>
                                                <span className="font-medium">38L</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <p className="text-sm text-slate-600 font-medium">Rotas Mais Frequentes:</p>
                                        <div className="p-3 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                                                <span className="truncate">Centro → UniFio</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm mt-1">
                                                <FaUniversity className="text-blue-500 flex-shrink-0" />
                                                <span className="truncate">UniFio → Centro</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <motion.button
                                        className="w-full bg-blue-50 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border border-blue-100 shadow-sm"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaCog className="text-sm" />
                                        Editar Perfil
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Barra de navegação inferior */}
            <BottomNavigation />
        </div>
    );
}
