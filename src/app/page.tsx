"use client";

import { useState } from 'react';
import Image from 'next/image';
import { submitContactForm } from '@/modules/crm/application/actions';

export default function Home() {
  // Estado para controlar si el menú de celular está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="relative min-h-screen w-full font-sans text-slate-800">
      
{     /* 📱 HEADER PARA MÓVILES (Adelgazado con py-2) */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 px-6 py-2 flex justify-between items-center shadow-sm">
         <Image 
           src="/Logo_LIGA_Design-2-removebg-preview.png" 
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

      {/* 📱 MENÚ DESPLEGABLE PARA MÓVILES */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[135px] left-0 w-full bg-white z-40 shadow-xl border-t border-slate-100 flex flex-col px-8 py-6 gap-6 text-lg font-medium tracking-wide">
          <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-3 hover:text-slate-500 transition-colors">Inicio</a>
          <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-3 hover:text-slate-500 transition-colors">Servicios</a>
          <a href="#sobre-nosotros" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-3 hover:text-slate-500 transition-colors">Sobre Nosotros</a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="pb-3 hover:text-slate-500 transition-colors">Contacto</a>
        </div>
      )}

      {/* 💻 MENÚ LATERAL FIJO (Oculto en móviles, visible en escritorio) */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-100 z-50 flex-col justify-center px-12 text-slate-900 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
         <div className="absolute top-0 left-0 w-full flex justify-center">
            <Image 
              src="/Logo_LIGA_Design-2-removebg-preview.png" 
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
            <a href="#sobre-nosotros" className="hover:font-bold transition-all">Sobre Nosotros</a>
            <a href="#contacto" className="hover:font-bold transition-all">Contacto</a>
         </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 md:ml-64 flex flex-col overflow-x-hidden relative">
        
        {/* 🖼️ FONDO FIJO INDEPENDIENTE (Siempre medirá exactamente la pantalla, cero zoom) */}
        <div 
          className="fixed top-0 left-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg-desing2.jpeg')" }}
        >
          {/* Capa blanca difuminada para que el texto se lea bien */}
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]"></div>
        </div>

        {/* CONTENEDOR DE SECCIONES (¡Totalmente transparente, sin fondos!) */}
        <div className="relative w-full z-10">
          
          {/* 1. SECCIÓN INICIO */}
          <section id="inicio" className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 md:pt-0 px-6 md:px-8 text-center">
            {/* Texto ajustado para que no se desborde en celular */}
            <h1 className="text-4xl md:text-7xl font-serif text-slate-900 mb-6 uppercase tracking-wider leading-tight">
              MANUFACTURA Y ENSAMBLAJE DE <br className="hidden md:block" /> PRECISIÓN
            </h1>
            <p className="text-base md:text-xl mb-10 text-slate-700 px-4">
              El aliado estratégico para arquitectos y desarrolladores. Ejecutamos tus planos con acabados industriales en mobiliario residencial y comercial. Caracas, Venezuela. 
            </p>
            <a href="#contacto" className="px-8 py-3 bg-white border border-slate-300 shadow-sm rounded-full font-medium text-sm md:text-base text-slate-900 hover:bg-slate-50 transition duration-300">
              COTIZAR PROYECTO
            </a>
          </section>

            {/* 2. SECCIÓN SERVICIOS */}
          <section id="servicios" className="w-full py-24 bg-white px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-16 text-center">
                NUESTROS <span className="italic text-slate-700">SERVICIOS</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Pilar 1: Cutting */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 mb-6 border border-slate-900 flex items-center justify-center rounded-full group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold tracking-widest uppercase text-slate-900 mb-4">Servicio de Cutting</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Despiece computarizado y optimización de tableros. Entregamos módulos cortados y canteados con precisión milimétrica, listos para ensamblar en tus obras de interiorismo.
                  </p>
                </div>

                {/* Pilar 2: Kitchen & Cabinet */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 mb-6 border border-slate-900 flex items-center justify-center rounded-full group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold tracking-widest uppercase text-slate-900 mb-4">Kitchen & Cabinet</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Manufactura integral de cocinas, mobiliario comercial y gabinetes. Transformamos tus renders en realidad utilizando herrajes premium y estándares de ensamblaje de alto nivel.
                  </p>
                </div>

                {/* Pilar 3: Ejecución */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 mb-6 border border-slate-900 flex items-center justify-center rounded-full group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold tracking-widest uppercase text-slate-900 mb-4">Ejecución en Obra</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Instalación profesional alineada al cronograma de tu desarrollo. Un equipo técnico especializado que garantiza que cada pieza encaje perfectamente en el espacio final.
                  </p>
                </div>

              </div>
            </div>
          </section>  
        </div>

        {/* 3. SOBRE NOSOTROS */}
        <section id="sobre-nosotros" className="min-h-screen w-full bg-slate-50 py-24 px-6 md:px-20 flex flex-col justify-center">
           <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              
              <div className="flex flex-col">
                 <h4 className="text-slate-500 uppercase tracking-widest text-xs md:text-sm mb-4">El Taller</h4>
                 <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6 md:mb-8 leading-tight">
                    Artesanía moderna <br/> para espacios únicos
                 </h2>
                 <p className="text-sm md:text-base text-slate-600 mb-6 leading-relaxed">
                    En LIGA Design fusionamos la tecnología de despiece (cutting) con el ensamblaje de alto nivel para cocinas y gabinetes. Dirigidos por un equipo técnico en Caracas, nos especializamos en transformar los planos y renders de arquitectos en mobiliario tangible con exactitud milimétrica.
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

        {/* 4. CONTACTO */}
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
                 <form 
                   className="flex flex-col gap-4 md:gap-6" 
                   onSubmit={async (e) => {
                     e.preventDefault();
                     if (isSubmitting) return;
                     setIsSubmitting(true);
                     
                     try {
                       const formElement = e.currentTarget;
                       const formData = new FormData(formElement);
                       
                       const nombre = formData.get('nombre') as string;
                       const apellido = formData.get('apellido') as string;
                       const email = formData.get('email') as string;
                       const telefono = formData.get('telefono') as string;
                       const servicio = formData.get('servicio') as string;
                       const mensaje = formData.get('mensaje') as string;
                       
                       const newFormData = new FormData();
                       newFormData.append('nombre', `${nombre} ${apellido}`);
                       newFormData.append('email', email);
                       newFormData.append('telefono', telefono);
                       newFormData.append('proyecto', `[Servicio: ${servicio}]\n\n${mensaje}`);
                       
                       const result = await submitContactForm(newFormData);
                       if (result.success) {
                         const message = `Hola LIGA Design, acabo de dejar mis datos en la web.\nMi nombre es: ${nombre} ${apellido}\nMe interesa: Diseño de ${servicio}`;
                         const whatsappUrl = `https://wa.me/584241676126?text=${encodeURIComponent(message)}`;
                         window.location.href = whatsappUrl;
                         formElement.reset();
                       } else {
                         alert(`Error: ${result.error}`);
                       }
                     } catch (error) {
                       console.error(error);
                       alert('Hubo un error enviando el mensaje. Inténtalo de nuevo.');
                     } finally {
                       setIsSubmitting(false);
                     }
                   }}
                 >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       <div className="flex flex-col gap-2">
                          <label htmlFor="nombre" className="text-xs md:text-sm text-slate-400 tracking-wide">Nombre</label>
                          <input type="text" id="nombre" name="nombre" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all" placeholder="Tu nombre" required disabled={isSubmitting} />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label htmlFor="apellido" className="text-xs md:text-sm text-slate-400 tracking-wide">Apellido</label>
                          <input type="text" id="apellido" name="apellido" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all" placeholder="Tu apellido" required disabled={isSubmitting} />
                       </div>
                    </div>

                    <div className="flex flex-col gap-2">
                       <label htmlFor="email" className="text-xs md:text-sm text-slate-400 tracking-wide">Correo Electrónico</label>
                       <input type="email" id="email" name="email" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all" placeholder="ejemplo@correo.com" required disabled={isSubmitting} />
                    </div>

                    <div className="flex flex-col gap-2">
                       <label htmlFor="telefono" className="text-xs md:text-sm text-slate-400 tracking-wide">Número de WhatsApp (con código de país)</label>
                       <input type="tel" id="telefono" name="telefono" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all" placeholder="Ej: 584121234567" required disabled={isSubmitting} />
                    </div>

                    <div className="flex flex-col gap-2">
                       <label htmlFor="servicio" className="text-xs md:text-sm text-slate-400 tracking-wide">¿Qué buscas diseñar?</label>
                       <select id="servicio" name="servicio" className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all appearance-none cursor-pointer" disabled={isSubmitting}>
                          <option value="cocina">Diseño de Cocina</option>
                          <option value="closet">Closet / Vestidor</option>
                          <option value="comercial">Mobiliario Comercial</option>
                          <option value="otro">Otro proyecto a medida</option>
                       </select>
                    </div>

                    <div className="flex flex-col gap-2">
                       <label htmlFor="mensaje" className="text-xs md:text-sm text-slate-400 tracking-wide">Detalles del Proyecto</label>
                       <textarea id="mensaje" name="mensaje" rows={4} className="bg-slate-900 border border-slate-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all resize-none" placeholder="Cuéntanos un poco sobre las medidas, materiales o estilo que tienes en mente..." required disabled={isSubmitting}></textarea>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="mt-2 md:mt-4 w-full bg-white text-slate-900 font-medium py-3 md:py-4 rounded-sm hover:bg-slate-200 transition-colors tracking-wide uppercase text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                       {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
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