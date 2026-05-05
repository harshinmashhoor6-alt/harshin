import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  VolumeX,
  Maximize2,
  ArrowRight
} from 'lucide-react';

interface Car {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  specs: {
    topSpeed: string;
    acceleration: string;
    power: string;
    engine: string;
  };
  videoUrl: string;
  accent: string;
}

const CARS: Car[] = [
  {
    id: 'velocity-x',
    brand: 'AETHER',
    name: 'VELOCITY X',
    tagline: 'Defying the boundaries of aerodynamics.',
    description: 'A masterpiece of precision engineering and raw power. The Velocity X represents the pinnacle of hypercar evolution, designed for those who demand ultimate performance without compromise.',
    specs: {
      topSpeed: '420 KM/H',
      acceleration: '2.1S 0-100',
      power: '1,600 HP',
      engine: 'Quad-Turbo W16'
    },
    videoUrl: 'https://videos.pexels.com/video-files/854671/854671-hd_1280_720_25fps.mp4',
    accent: '#ffffff'
  },
  {
    id: 'apex-rs',
    brand: 'ZENITH',
    name: 'APEX RS',
    tagline: 'Sculpted by the wind.',
    description: 'The Apex RS is track-focused performance refined for the open road. Every curve serves a purpose, generating maximum downforce while maintaining an elegant silhouette.',
    specs: {
      topSpeed: '385 KM/H',
      acceleration: '2.4S 0-100',
      power: '1,100 HP',
      engine: 'V8 Hybrid'
    },
    videoUrl: 'https://videos.pexels.com/video-files/1526909/1526909-hd_1280_720_24fps.mp4',
    accent: '#ff3e3e'
  },
  {
    id: 'phantom-gt',
    brand: 'NOIR',
    name: 'PHANTOM GT',
    tagline: 'Silent power, absolute luxury.',
    description: 'Experience the ultimate in electric GT touring. The Phantom GT combines whisper-quiet operation with instantaneous torque, wrapped in a hand-crafted carbon fiber chassis.',
    specs: {
      topSpeed: '320 KM/H',
      acceleration: '2.8S 0-100',
      power: '900 HP',
      engine: 'Tri-Motor Electric'
    },
    videoUrl: 'https://videos.pexels.com/video-files/3126938/3126938-hd_1920_1080_25fps.mp4',
    accent: '#00ccff'
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  const currentCar = CARS[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + CARS.length) % CARS.length);
  };

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
    })
  };

  return (
    <div className="relative h-screen w-full bg-black select-none overflow-hidden font-sans text-white">
      {/* Background with Video Transitions */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentCar.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" }
          }}
          className="absolute inset-0 z-0 bg-black"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
          <video
            src={currentCar.videoUrl}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="h-full w-full object-cover scale-[1.05]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-8 md:p-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="h-10 w-10 bg-white flex items-center justify-center rounded-sm">
            <div className="h-6 w-6 bg-black rotate-45" />
          </div>
          <span className="text-xl font-display font-bold tracking-widest">VELOCITY</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.3em] text-white/50">
          {['MODELS', 'DESIGN', 'PERFORMANCE', 'OWNERSHIP'].map((item) => (
            <button key={item} className="hover:text-white transition-colors uppercase">
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Maximize2 size={20} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-24 px-8 md:px-24">
        <div className="max-w-4xl">
          <motion.div
            key={`brand-${currentCar.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-white/50" />
            <span className="text-sm font-display tracking-[0.4em] text-white/70 uppercase">
              {currentCar.brand}
            </span>
          </motion.div>

          <motion.h1
            key={`name-${currentCar.id}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", damping: 15 }}
            className="text-7xl md:text-[10rem] font-display font-bold mb-6 tracking-tighter leading-[0.8]"
          >
            {currentCar.name}
          </motion.h1>

          <motion.p
            key={`desc-${currentCar.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 font-light leading-relaxed font-sans"
          >
            {currentCar.description}
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/10 pt-12">
            {Object.entries(currentCar.specs).map(([key, value], idx) => (
              <motion.div
                key={`${currentCar.id}-${key}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                <div className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-xl md:text-2xl font-display font-medium tracking-tight">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6 pr-8 md:pr-12">
         <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)', color: '#000' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="glass-morphism h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300"
         >
           <ChevronLeft size={28} />
         </motion.button>
         <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)', color: '#000' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="glass-morphism h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300"
         >
           <ChevronRight size={28} />
         </motion.button>
      </div>

      {/* Progress & Pagination */}
      <div className="absolute bottom-12 right-12 md:right-24 z-30 flex items-center gap-12">
        <div className="flex items-center gap-3">
          {CARS.map((_, idx) => (
            <motion.div 
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              animate={{ 
                width: idx === currentIndex ? 64 : 12,
                backgroundColor: idx === currentIndex ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.2)'
              }}
              className="h-1 rounded-full cursor-pointer"
            />
          ))}
        </div>
        <div className="text-[12px] font-mono tracking-widest text-white/40">
          0{currentIndex + 1} / 0{CARS.length}
        </div>
      </div>

      {/* Explore Link */}
      <div className="absolute bottom-12 left-8 md:left-24 z-30">
        <motion.button
          whileHover={{ x: 10 }}
          className="flex items-center gap-6 group"
        >
          <span className="text-[11px] font-bold tracking-[0.4em] text-white/70 group-hover:text-white transition-colors">
            DOWNLOAD FULL FILM
          </span>
          <div className="h-12 w-12 glass-morphism rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowRight size={20} />
          </div>
        </motion.button>
      </div>
      
      {/* Film Grain Texture */}
      <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
}
