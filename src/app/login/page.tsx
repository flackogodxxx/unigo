/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import { FaCar, FaEnvelope, FaLock } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  // Verificar se o usuário já está logado
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!email.endsWith('@unifio.edu.br')) {
        throw new Error('Por favor, use seu email universitário @unifio.edu.br');
      }

      // Simulando um login bem-sucedido
      // Em um cenário real, você receberia esses dados do backend
      const userData = {
        name: email.split('@')[0].replace('.', ' ').split(' ').map(name =>
          name.charAt(0).toUpperCase() + name.slice(1)
        ).join(' '),
        email: email,
        token: 'sim-jwt-token-' + Math.random().toString(36).substring(2),
        image: '' // Sem imagem por padrão
      };

      // Armazenar dados do usuário no localStorage
      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userImage', userData.image);

      console.log('Login successful:', userData);

      // Mostrar mensagem de sucesso antes de redirecionar
      setLoginSuccess(true);

      // Aguardar um momento para mostrar a mensagem de sucesso
      setTimeout(() => {
        // Redirecionar para o dashboard
        window.location.href = '/dashboard'; // Usando window.location para forçar refresh completo
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
            <span className="gradient-text animate-pulse-slow">Bem-vindo ao UniGo</span>
          </h1>
          <p className="text-slate-600">Entre com sua conta universitária</p>
        </motion.div>

        {loginSuccess ? (
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
            <h3 className="text-xl font-medium text-slate-800 mb-2">Login realizado com sucesso!</h3>
            <p className="text-slate-600">Redirecionando para o dashboard...</p>
          </motion.div>
        ) : (
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

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email Universitário
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="seu.email@unifio.edu.br"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                'Entrar'
              )}
            </motion.button>
          </form>
        )}

        {!loginSuccess && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Ainda não tem uma conta?{' '}
              <motion.button
                onClick={() => router.push('/register')}
                className="text-blue-900 hover:text-blue-700 font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cadastre-se
              </motion.button>
            </p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
