"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/modules/shared/infrastructure/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-slate-900/50 backdrop-blur-md p-8 md:p-10 rounded-sm border border-slate-800 shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-serif text-white mb-8 text-center tracking-[0.15em] uppercase">
            Acceso Administrador
          </h2>
          
          {error && (
            <div className="bg-rose-500/10 text-rose-400 p-4 rounded-sm mb-6 text-sm border border-rose-500/20 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 px-4 py-3 border border-slate-800 rounded-sm focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all text-white text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 px-4 py-3 border border-slate-800 rounded-sm focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all text-white text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-white text-slate-950 py-3 md:py-4 rounded-sm font-medium hover:bg-slate-200 transition-colors disabled:bg-slate-700 disabled:text-slate-500 uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
