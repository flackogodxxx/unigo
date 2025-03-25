'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaCar,
  FaUserGraduate,
  FaShieldAlt,
  FaClock,
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaMobileAlt,
  FaRoute,
  FaUniversity,
  FaMapPin,
  FaArrowRight
} from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="min-h-screen" ref={containerRef}>
      {/* Hero Section with Map Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-4">
        <motion.div
          className="absolute inset-0 hero-pattern"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://maps.googleapis.com/maps/api/staticmap?center=Ourinhos,SP&zoom=13&size=1200x800&maptype=roadmap&style=feature:road|color:0x1E3A8A&style=feature:landscape|color:0xF8FAFC&key=YOUR_API_KEY")`,
            backgroundBlendMode: "overlay"
          }}
        />
        <div className="container mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                <FaCar className="text-4xl text-white" />
              </div>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="gradient-text animate-pulse-slow">UniGo</span>
              <br />
              <span className="text-3xl md:text-5xl">Sua Carona Universitária</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Conecte-se com outros estudantes da UniFio e compartilhe viagens de forma segura e econômica
            </motion.p>

            {/* Ride Search Box */}
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaMapPin className="text-blue-900" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    placeholder="De onde você está saindo?"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUniversity className="text-blue-900" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    placeholder="Para onde você vai?"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                </div>

                <motion.button
                  className="btn-primary mt-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/register')}
                >
                  <FaRoute className="text-xl" />
                  <span>Encontrar Carona</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                className="btn-primary w-full sm:w-auto"
                onClick={() => router.push('/register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Agora
              </motion.button>
              <motion.button
                className="btn-secondary w-full sm:w-auto"
                onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Saiba Mais
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-20 bg-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627,0.063 L59.95,5.386 L53.932,11.404 L58.877,16.349 L53.932,21.294 L48.986,16.349 L42.968,22.367 L48.986,28.385 L44.041,33.33 L39.096,28.385 L33.078,34.403 L39.096,40.421 L34.15,45.366 L29.205,40.421 L23.187,46.439 L29.205,52.457 L24.26,57.402 L19.315,52.457 L13.297,58.475 L19.315,64.493 L14.37,69.438 L9.425,64.493 L3.407,70.511 L9.425,76.529 L4.48,81.474 L0,76.994 L0,0 L76.994,0 L72.514,4.48 L67.569,0 L61.551,6.018 L67.569,12.036 L62.624,16.981 L57.679,12.036 L51.661,18.054 L57.679,24.072 L52.734,29.017 L47.789,24.072 L41.771,30.09 L47.789,36.108 L42.844,41.053 L37.899,36.108 L31.881,42.126 L37.899,48.144 L32.954,53.089 L28.009,48.144 L21.991,54.162 L28.009,60.18 L23.064,65.125 L18.119,60.18 L12.101,66.198 L18.119,72.216 L13.174,77.161 L8.229,72.216 L2.211,78.234 L8.229,84.252 L3.284,89.197 L0,85.913 L0,8.919 L8.919,0 L85.913,0 L76.994,8.919 L0,8.919' fill='%231E3A8A' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "cover"
          }}
        />
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Por que escolher o <span className="gradient-text">UniGo</span>?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Economia Inteligente",
                description: "Divida os custos da viagem e economize dinheiro com outros universitários",
                icon: <HiCurrencyDollar className="text-2xl" />,
                color: "from-blue-900 to-blue-700"
              },
              {
                title: "Comunidade Acadêmica",
                description: "Conecte-se apenas com estudantes verificados da UniFio",
                icon: <FaUserGraduate className="text-2xl" />,
                color: "from-blue-800 to-blue-600"
              },
              {
                title: "Viagens Seguras",
                description: "Sistema de avaliação e verificação de usuários",
                icon: <FaShieldAlt className="text-2xl" />,
                color: "from-blue-700 to-blue-500"
              }
            ].map((beneficio, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="feature-card"
              >
                <div className="relative z-10">
                  <motion.div
                    className="feature-icon mb-6"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {beneficio.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{beneficio.title}</h3>
                  <p className="text-slate-600">{beneficio.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Como Funciona Section with App-like UI */}
      <section id="como-funciona" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Como <span className="gradient-text">Funciona</span>
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-16">
            <motion.div
              className="md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Encontre caronas <span className="text-blue-900">em segundos</span></h3>
              <p className="text-lg text-slate-600 mb-6">
                Basta inserir seu ponto de partida e destino, e o UniGo encontrará motoristas universitários disponíveis para sua rota.
              </p>

              <div className="space-y-4">
                {[
                  { text: "Busca inteligente por rotas", icon: <FaRoute /> },
                  { text: "Motoristas verificados da UniFio", icon: <FaUserGraduate /> },
                  { text: "Compartilhamento de custos", icon: <HiCurrencyDollar /> }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <p className="font-medium">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-xl p-4 border border-slate-100 max-w-md mx-auto">
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaMapPin className="text-blue-900" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-500">Origem</div>
                      <div className="font-medium">Residencial Universitário</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center my-2">
                    <div className="w-0.5 h-6 bg-blue-200"></div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUniversity className="text-blue-900" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-500">Destino</div>
                      <div className="font-medium">Campus UniFio</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-200 mr-3"></div>
                      <div className="flex-1">
                        <div className="font-medium">Motorista {item}</div>
                        <div className="text-xs text-slate-500">Saída em 15 min • R$ 5,00</div>
                      </div>
                      <FaArrowRight className="text-blue-900" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              {
                step: "1",
                title: "Cadastre-se",
                description: "Use seu email universitário da UniFio",
                icon: <FaMobileAlt className="text-xl" />
              },
              {
                step: "2",
                title: "Encontre sua Rota",
                description: "Selecione origem e destino",
                icon: <FaMapMarkedAlt className="text-xl" />
              },
              {
                step: "3",
                title: "Agende",
                description: "Escolha data e horário",
                icon: <FaCalendarAlt className="text-xl" />
              },
              {
                step: "4",
                title: "Viaje",
                description: "Acompanhe em tempo real",
                icon: <FaClock className="text-xl" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Preview Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                UniGo em <span className="gradient-text">qualquer lugar</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Acesse o UniGo de qualquer dispositivo. Nossa plataforma é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { title: "Notificações em tempo real", description: "Receba alertas sobre suas caronas" },
                  { title: "Chat integrado", description: "Comunique-se facilmente com outros usuários" },
                  { title: "Compartilhamento de localização", description: "Acompanhe o trajeto em tempo real" },
                  { title: "Avaliações e feedback", description: "Sistema de reputação para mais segurança" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-500">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="btn-primary"
                onClick={() => router.push('/register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar a Usar
              </motion.button>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative w-64 h-[500px] bg-slate-900 rounded-[36px] p-3 shadow-xl">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl"></div>
                <div className="w-full h-full bg-white rounded-[28px] overflow-hidden">
                  <div className="h-12 bg-blue-900 flex items-center justify-center text-white font-semibold">
                    UniGo
                  </div>
                  <div className="p-3">
                    <div className="bg-slate-100 rounded-lg p-3 mb-3">
                      <div className="text-sm font-medium mb-2">Próximas Caronas</div>
                      <div className="space-y-2">
                        {[1, 2].map((item) => (
                          <div key={item} className="bg-white p-2 rounded-md shadow-sm">
                            <div className="text-xs font-medium">Campus UniFio → Centro</div>
                            <div className="text-xs text-slate-500">Hoje, 17:30 • 3 vagas</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <div className="text-sm font-medium mb-2">Carona Atual</div>
                      <div className="bg-white p-2 rounded-md shadow-sm">
                        <div className="text-xs font-medium">Residencial → Campus</div>
                        <div className="text-xs text-slate-500">Em andamento • Chegada em 5 min</div>
                        <div className="mt-2 h-1 bg-slate-200 rounded-full">
                          <div className="h-1 bg-blue-900 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <FaMapMarkedAlt className="text-blue-900" />
                      </div>
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <FaCar className="text-blue-900" />
                      </div>
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <FaCalendarAlt className="text-blue-900" />
                      </div>
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <FaUserGraduate className="text-blue-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <path d="M0,0 L100%,100%" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
            <path d="M100%,0 L0,100%" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Pronto para começar?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Junte-se à comunidade UniGo e comece a compartilhar suas viagens hoje mesmo!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2"
              onClick={() => router.push('/register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Criar Conta Agora
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => router.push('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Já tenho uma conta
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
''
