"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-slate-300 selection:bg-slate-700 selection:text-white">
      
      {/* 📱 HEADER PARA MÓVILES */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md z-50 px-4 py-3 flex justify-between items-center border-b border-slate-800 shadow-sm">
         <div className="flex items-center gap-2">
            <Image 
              src="/Logo_LIGA_Design-2-removebg-preview.png" 
              alt="LIGA Design Logo" 
              width={100} 
              height={50} 
              className="w-auto h-8 object-contain" 
              priority
            />
         </div>
         <button 
           onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
           className="text-slate-300 focus:outline-none p-2"
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               {isSidebarOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
               )}
            </svg>
         </button>
      </header>

      {/* 💻 MENÚ LATERAL (SIDEBAR) */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-slate-900/95 md:bg-slate-900/50 backdrop-blur-md border-r border-slate-800/80 z-40
        transition-transform duration-300 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:sticky md:shrink-0
      `}>
         <div className="p-6 border-b border-slate-800/80 flex items-center justify-center md:justify-start mt-14 md:mt-0">
            <Image 
              src="/Logo_LIGA_Design-2-removebg-preview.png" 
              alt="LIGA Design Logo" 
              width={160} 
              height={80} 
              className="w-full h-auto object-contain px-2" 
              priority
            />
         </div>
         
         <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
            <a href="/admin/crm" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-sm transition-all">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
               CRM Leads
            </a>
            <a href="/admin/taller" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-sm transition-all">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
               Producción
            </a>
            <a href="/admin/inventario" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-sm transition-all">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
               Inventario
            </a>
         </nav>

         <div className="p-4 border-t border-slate-800/80">
            <form action="/auth/signout" method="post">
               <button className="flex w-full items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-sm transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Cerrar Sesión
               </button>
            </form>
         </div>
      </aside>

      {/* OVERLAY PARA MÓVILES */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 min-w-0 min-h-screen flex flex-col pt-16 md:pt-0 overflow-x-hidden">
        
        {/* Header Superior (Opcional en desktop) */}
        <div className="hidden md:flex justify-end items-center px-8 py-4 border-b border-slate-800/80 bg-slate-900/30">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <span className="text-xs text-white">AD</span>
             </div>
             <span className="text-xs uppercase tracking-widest text-slate-400">Administrador</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-7xl mx-auto flex-1">
          {children}
        </div>
        
        <footer className="py-6 text-center border-t border-slate-800/80 mx-8">
          <p className="text-[10px] text-slate-600 tracking-widest uppercase">LIGA DESIGN VE © {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}
