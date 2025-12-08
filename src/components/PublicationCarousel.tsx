import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'journal' | 'conference';
  link?: string;
  image?: string; // Path to paper screenshot
}

interface PublicationCarouselProps {
  publications: Publication[];
}

export default function PublicationCarousel({ publications }: PublicationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % publications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, publications.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + publications.length) % publications.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % publications.length);
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="grid md:grid-cols-2 gap-6 p-8">
              {/* Paper Preview/Image */}
              <div className="relative aspect-[8.5/11] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
                {publications[currentIndex].image ? (
                  <img 
                    src={publications[currentIndex].image} 
                    alt={`${publications[currentIndex].title} preview`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-3xl">📄</span>
                      </div>
                      <p className="text-sm text-gray-500">Paper Preview</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Paper Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      publications[currentIndex].type === 'journal' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {publications[currentIndex].type === 'journal' ? 'Journal' : 'Conference'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {publications[currentIndex].year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-800 leading-tight">
                    {publications[currentIndex].title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {publications[currentIndex].authors}
                  </p>

                  <p className="text-base font-medium text-blue-600 mb-6">
                    {publications[currentIndex].venue}
                  </p>
                </div>

                {publications[currentIndex].link && (
                  <a
                    href={publications[currentIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Paper
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all z-10"
          aria-label="Previous publication"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all z-10"
          aria-label="Next publication"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {publications.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentIndex 
                ? 'w-8 h-3 bg-blue-600' 
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to publication ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
