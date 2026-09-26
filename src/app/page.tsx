"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  // Estado para controlar si el menú de celular está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const portfolioItems = [
    { id: 1, src: "/proyectos/portfolio4.jpeg", alt: "Cocina y espacios modernos" },
    { id: 2, src: "/proyectos/portfolio2.jpeg", alt: "Closet a medida" },
    { id: 3, src: "/proyectos/portfolio6.jpeg", alt: "Detalle de acabados" },
    { id: 4, src: "/proyectos/portfolio5.jpeg", alt: "Isla central" },
    { id: 5, src: "/proyectos/portfolio7.jpeg", alt: "Mobiliario habitación" },
    { id: 6, src: "/proyectos/portfolio1.jpeg", alt: "Diseño interior" },
    { id: 7, src: "/proyectos/portfolio3.jpeg", alt: "Diseño interior" },
  ];

  const renderCard = (item: any) => {
      const isActive = activeCard === item.id;
      
      return (
        <div 
          key={item.id} 
          className="w-full rounded-sm overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 transform-gpu"
          onClick={() => setActiveCard(isActive ? null : item.id)}
        >
          <img 
            src={item.src} 
            alt={item.alt} 
            className={`block w-full h-auto object-cover transition-transform duration-700 transform-gpu will-change-transform ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 flex items-center justify-center p-6 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className={`border border-white/60 w-full h-full flex items-center justify-center transition-transform duration-500 transform-gpu ${isActive ? 'scale-100' : 'scale-95 group-hover:scale-100'}`}>
              <span className="text-white text-sm md:text-base font-serif tracking-widest uppercase text-center px-4 shadow-sm">
                {item.alt}
              </span>
            </div>
          </div>
        </div>
      );
    };

  return (
    <div className="relative min-h-screen w-full font-sans text-slate-800">
      
{     /* 📱 HEADER PARA MÓVILES (Adelgazado con py-2) */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 px-6 py-2 flex justify-between items-center shadow-sm">
         <Image 
           src="/LIGA-LOGO1.png" 
           alt="LIGA Design Logo" 
           width={300} 
           height={150} 
           className="w-32 h-auto object-contain scale-125 origin-left" 
           priority
         />
         <button 
           onClick={() => setIsMenuOpen(!isMenuOpen)} 
           className="text-slate-900 focus:outline-none p-2"
         >
            {/* Ícono de hamburguesa interactivo */}
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               {isMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
               )}
            </svg>
         </button>
      </header>

      {/* 📱 MENÚ DESPLEGABLE PARA MÓVILES (Ajustado al nuevo grosor) */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[64px] left-0 w-full bg-white z-40 shadow-xl border-t border-slate-100 flex flex-col px-8 py-6 gap-6 text-lg font-medium tracking-wide">
          <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-3 hover:text-slate-500 transition-colors">Inicio</a>
          <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-3 hover:text-slate-500 transition-colors">Servicios</a>
          <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-3 hover:text-slate-500 transition-colors">Portafolio</a>
          <a href="#sobre-nosotros" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-3 hover:text-slate-500 transition-colors">Sobre Nosotros</a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="pb-3 hover:text-slate-500 transition-colors">Contacto</a>
        </div>
      )}

      {/* 💻 MENÚ LATERAL FIJO (Oculto en móviles, visible en escritorio) */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-100 z-50 flex-col justify-center px-12 text-slate-900 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
         <div className="absolute top-0 left-0 w-full flex justify-center">
            <Image 
              src="/LIGA-LOGO1.png" 
              alt="LIGA Design Logo" 
              width={140} 
              height={70} 
              className="w-auto h-auto"
              priority
            />
         </div>
         <nav className="flex flex-col gap-6 text-sm tracking-wide">
            <a href="#inicio" className="hover:font-bold transition-all">Inicio</a>
            <a href="#servicios" className="hover:font-bold transition-all">Servicios</a>
            <a href="#portfolio" className="hover:font-bold transition-all">Portafolio</a>
            <a href="#sobre-nosotros" className="hover:font-bold transition-all">Sobre Nosotros</a>
            <a href="#contacto" className="hover:font-bold transition-all">Contacto</a>
         </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL (md:ml-64 asegura que el margen solo aplique en escritorio) */}
      <main className="flex-1 md:ml-64 flex flex-col overflow-x-hidden bg-white">
        
        <div 
          className="relative w-full bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-desing.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
          
          {/* 1. SECCIÓN INICIO */}
          <section id="inicio" className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center pt-24 md:pt-0 px-6 md:px-8 text-center">
            {/* Texto ajustado para que no se desborde en celular */}
            <h1 className="text-4xl md:text-7xl font-serif text-slate-900 mb-6 uppercase tracking-wider leading-tight">
              Diseño a medida con <br className="hidden md:block" /> acabados de primera
            </h1>
            <p className="text-base md:text-xl mb-10 text-slate-700 px-4">
              Transformando espacios con mobiliario exclusivo. <br /> Caracas, Venezuela.
            </p>
            <a href="#contacto" className="px-8 py-3 bg-white border border-slate-300 shadow-sm rounded-full font-medium text-sm md:text-base text-slate-900 hover:bg-slate-50 transition duration-300">
              AGENDAR UNA CONSULTA
            </a>
          </section>

          {/* 2. SECCIÓN SERVICIOS */}
          <section id="servicios" className="relative z-10 min-h-screen w-full py-24 px-6 md:px-20 flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-12 md:mb-16 uppercase tracking-widest text-slate-900">Servicios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
              
              <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-sm border border-white/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm group cursor-default">
                <div className="text-slate-400 mb-6 group-hover:text-slate-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20"/><path d="M20 2v20"/><path d="M4 14h16"/><path d="M4 10h16"/><path d="M9 14v8"/><path d="M15 14v8"/></svg>
                </div>
                <h3 className="text-lg md:text-xl font-serif mb-3 text-slate-900">Diseño de Cocinas</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Espacios funcionales y estéticos. Utilizamos materiales de alta resistencia y herrajes de última generación.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-sm border border-white/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm group cursor-default">
                <div className="text-slate-400 mb-6 group-hover:text-slate-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="M12 4v16"/><path d="M8 12h.01"/><path d="M16 12h.01"/></svg>
                </div>
                <h3 className="text-lg md:text-xl font-serif mb-3 text-slate-900">Closets y Vestidores</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Optimización de espacios con acabados de lujo. Compartimientos a medida para una organización impecable.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-sm border border-white/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm group cursor-default">
                <div className="text-slate-400 mb-6 group-hover:text-slate-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10h20"/><path d="M5 10v10"/><path d="M19 10v10"/><path d="M3 6h18"/><path d="M8 6v4"/><path d="M16 6v4"/></svg>
                </div>
                <h3 className="text-lg md:text-xl font-serif mb-3 text-slate-900">Mobiliario Comercial</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Fabricación de mobiliario para oficinas y locales comerciales que reflejen la identidad visual de tu marca.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-sm border border-white/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm group cursor-default">
                <div className="text-slate-400 mb-6 group-hover:text-slate-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <h3 className="text-lg md:text-xl font-serif mb-3 text-slate-900">Modelado 3D</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Visualización arquitectónica. Observa cómo quedará tu proyecto con renders fotorrealistas antes de iniciar.</p>
              </div>

            </div>
          </section>
        </div>

        {/* 3. PORTFOLIO */}
        <section id="portfolio" className="min-h-screen w-full bg-white py-24 px-6 md:px-20 flex flex-col items-center">
           <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
             <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-widest text-slate-900 mb-4">Portafolio</h2>
             <p className="text-slate-500 max-w-xl text-sm md:text-base">Una selección de nuestros proyectos más recientes. Diseño a medida y manufactura de precisión.</p>
           </div>
           
           <div className="w-full max-w-6xl">
              <div className="hidden lg:grid grid-cols-3 gap-6">
                 <div className="flex flex-col gap-6">{portfolioItems.filter((_, i) => i % 3 === 0).map(renderCard)}</div>
                 <div className="flex flex-col gap-6">{portfolioItems.filter((_, i) => i % 3 === 1).map(renderCard)}</div>
                 <div className="flex flex-col gap-6">{portfolioItems.filter((_, i) => i % 3 === 2).map(renderCard)}</div>
              </div>
              <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
                 <div className="flex flex-col gap-6">{portfolioItems.filter((_, i) => i % 2 === 0).map(renderCard)}</div>
                 <div className="flex flex-col gap-6">{portfolioItems.filter((_, i) => i % 2 === 1).map(renderCard)}</div>
              </div>
              <div className="grid md:hidden grid-cols-1 gap-6">
                 <div className="flex flex-col gap-6">{portfolioItems.map(renderCard)}</div>
              </div>
           </div>
        </section>

        {/* 4. SOBRE NOSOTROS */}
        <section id="sobre-nosotros" className="min-h-screen w-full bg-slate-50 py-24 px-6 md:px-20 flex flex-col justify-center">
           <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              
              <div className="flex flex-col">
                 <h4 className="text-slate-500 uppercase tracking-widest text-xs md:text-sm mb-4">El Taller</h4>
                 <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6 md:mb-8 leading-tight">
                    Artesanía moderna <br/> para espacios únicos
                 </h2>
                 <p className="text-sm md:text-base text-slate-600 mb-6 leading-relaxed">
                    En LIGA Design fusionamos la precisión de la ebanistería tradicional con las últimas tendencias en diseño interior. Dirigidos por un equipo apasionado en Caracas, nos especializamos en transformar ideas en mobiliario tangible de la más alta calidad.
                 </p>
                 <p className="text-sm md:text-base text-slate-600 mb-8 md:mb-10 leading-relaxed">
                    Cada cocina, clóset y pieza comercial que sale de nuestro taller está pensada al milímetro. Seleccionamos cuidadosamente nuestras materias primas y utilizamos herrajes premium para garantizar que tu inversión perdure en el tiempo.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-4 md:gap-6 pt-8 border-t border-slate-200">
                    <div>
                       <h5 className="text-2xl md:text-3xl font-serif text-slate-900 mb-1">100%</h5>
                       <span className="text-[10px] md:text-xs uppercase tracking-wider text-slate-500">Diseño a Medida</span>
                    </div>
                    <div>
                       <h5 className="text-2xl md:text-3xl font-serif text-slate-900 mb-1">Premium</h5>
                       <span className="text-[10px] md:text-xs uppercase tracking-wider text-slate-500">Materiales y Herrajes</span>
                    </div>
                 </div>
              </div>

              <div className="relative h-[350px] md:h-[600px] w-full rounded-sm overflow-hidden shadow-lg mt-8 md:mt-0">
                 <img 
                    src="/proyectos/portfolio3.jpeg" 
                    alt="Detalle de taller LIGA Design" 
                    className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-sm p-4 md:p-6 shadow-md max-w-[250px] md:max-w-xs">
                    <p className="font-serif text-sm md:text-lg text-slate-900 italic">"Nuestra prioridad es la funcionalidad sin comprometer la estética."</p>
                 </div>
              </div>

           </div>
        </section>

        {/* 5. CONTACTO */}
        <section id="contacto" className="min-h-screen w-full bg-slate-900 text-white py-24 px-6 md:px-20 flex flex-col justify-center">
           <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              
              <div className="flex flex-col justify-center">
                 <h4 className="text-slate-400 uppercase tracking-widest text-xs md:text-sm mb-4">Inicia tu proyecto</h4>
                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 md:mb-8 leading-tight">
                    Hablemos de tu <br/> próximo espacio
                 </h2>
                 <p className="text-sm md:text-base text-slate-400 mb-10 md:mb-12 max-w-md leading-relaxed">
                    Ya sea que tengas los planos listos o apenas una idea en mente, escríbenos. Nuestro equipo te asesorará en materiales, herrajes y distribución para hacer tu proyecto realidad.
                 </p>
                 
                 <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                       <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-500 mt-1 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                       <div>
                          <h6 className="font-medium text-white tracking-wide text-sm md:text-base">Teléfono</h6>
                          <p className="text-slate-400 text-xs md:text-sm mt-1">+58 424-1676126</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-500 mt-1 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                       <div>
                          <h6 className="font-medium text-white tracking-wide text-sm md:text-base">Correo</h6>
                          <p className="text-slate-400 text-xs md:text-sm mt-1">liga.desing0708@gmail.com</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-500 mt-1 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                       <div>
                          <h6 className="font-medium text-white tracking-wide text-sm md:text-base">Ubicación</h6>
                          <p className="text-slate-400 text-xs md:text-sm mt-1">Caracas, Venezuela</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-800/50 p-6 md:p-10 rounded-sm border border-slate-700/50 backdrop-blur-sm">
                 <form className="flex flex-col gap-4 md:gap-6" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       <div className="flex flex-col gap-2">
                          <label htmlFor="nombre" className="text-xs md:text-sm text-slate-400 tracking-wide">Nombre</label>
                          <input type="text" id="nombre" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all" placeholder="Tu nombre" required />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label htmlFor="apellido" className="text-xs md:text-sm text-slate-400 tracking-wide">Apellido</label>
                          <input type="text" id="apellido" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all" placeholder="Tu apellido" required />
                       </div>
                    </div>

                    <div className="flex flex-col gap-2">
                       <label htmlFor="email" className="text-xs md:text-sm text-slate-400 tracking-wide">Correo Electrónico</label>
                       <input type="email" id="email" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all" placeholder="ejemplo@correo.com" required />
                    </div>

                    <div className="flex flex-col gap-2">
                       <label htmlFor="servicio" className="text-xs md:text-sm text-slate-400 tracking-wide">¿Qué buscas diseñar?</label>
                       <select id="servicio" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all appearance-none cursor-pointer">
                          <option value="cocina">Diseño de Cocina</option>
                          <option value="closet">Closet / Vestidor</option>
                          <option value="comercial">Mobiliario Comercial</option>
                          <option value="otro">Otro proyecto a medida</option>
                       </select>
                    </div>

                    <div className="flex flex-col gap-2">
                       <label htmlFor="mensaje" className="text-xs md:text-sm text-slate-400 tracking-wide">Detalles del Proyecto</label>
                       <textarea id="mensaje" rows={4} className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all resize-none" placeholder="Cuéntanos un poco sobre las medidas, materiales o estilo que tienes en mente..." required></textarea>
                    </div>

                    <button type="submit" className="mt-2 md:mt-4 w-full bg-white text-slate-900 font-medium py-3 md:py-4 rounded-sm hover:bg-slate-200 transition-colors tracking-wide uppercase text-xs md:text-sm">
                       Enviar Mensaje
                    </button>
                    
                 </form>
              </div>

           </div>
           
           <div className="w-full max-w-6xl mx-auto mt-16 md:mt-24 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-slate-500">
              <p className="text-center md:text-left">© {new Date().getFullYear()} LIGA Design VE. Todos los derechos reservados.</p>
              <a href="https://www.instagram.com/liga.design.ve/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                 <span>Síguenos en Instagram</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
           </div>
        </section>

      </main>
    </div>
  );
}