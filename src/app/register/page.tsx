/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import { FaCar, FaEnvelope, FaLock, FaUser, FaIdCard, FaPhone } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ra: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validações
      if (!formData.email.endsWith('@unifio.edu.br')) {
        throw new Error('Por favor, use seu email universitário @unifio.edu.br');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      if (formData.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      if (!/^\d{8}$/.test(formData.ra)) {
        throw new Error('RA inválido. Deve conter 8 dígitos');
      }

      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulando registro bem-sucedido e login automático
      const userData = {
        name: formData.name,
        email: formData.email,
        token: 'sim-jwt-token-' + Math.random().toString(36).substring(2),
        image: ''
      };

      // Armazenar dados do usuário no localStorage
      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userImage', userData.image);

      console.log('Register successful:', userData);

      // Mostrar mensagem de sucesso
      setRegisterSuccess(true);

      // Aguardar um momento antes de redirecionar
      setTimeout(() => {
        window.location.href = '/dashboard'; // Redirecionando para o dashboard
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden py-10">
      <motion.div
        className="absolute inset-0 hero-pattern"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 wave-pattern opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-2xl shadow-xl z-10 w-full max-w-md mx-4"
      >
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="mb-6 flex justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
              <FaCar className="text-3xl text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text animate-pulse-slow">Cadastre-se no UniGo</span>
          </h1>
          <p className="text-slate-600">Crie sua conta universitária</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-50 text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          {registerSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                  ✓
                </motion.div>
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Registro realizado com sucesso!</h3>
              <p className="text-slate-600">Redirecionando para o dashboard...</p>
            </motion.div>
          ) : (
            <>
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Universitário
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    placeholder="seu.email@unifio.edu.br"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="ra" className="block text-sm font-medium text-slate-700 mb-1">
                  RA (Registro Acadêmico)
                </label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    id="ra"
                    name="ra"
                    value={formData.ra}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    placeholder="12345678"
                    maxLength={8}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Telefone
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    placeholder="(18) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full btn-primary relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  'Cadastrar'
                )}
              </motion.button>
            </>
          )}
        </form>

        {!registerSuccess && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Já tem uma conta?{' '}
              <motion.button
                onClick={() => router.push('/login')}
                className="text-blue-900 hover:text-blue-700 font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Faça login
              </motion.button>
            </p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
