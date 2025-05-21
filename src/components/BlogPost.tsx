// src/components/BlogPost.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, Pause, X, MousePointer, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { useAutoPlay } from '../hooks/useAutoPlay';

export interface BlogPostProps {
  title: string;
  authors: string;
  abstract: string;
  presentationImageFolderName: string;
  presentationNumPages: number;
  presentationCaption?: string;
  videoUrl: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  authors,
  abstract,
  presentationImageFolderName,
  presentationNumPages,
  presentationCaption,
  videoUrl
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageLoading, setCurrentImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const {
    currentIndex: currentPageIndex, // 0-indexed
    isPlaying,
    togglePlay: baseTogglePlay,
    nextSlide: nextPage,
    prevSlide: prevPage,
    setCurrentIndex: setCurrentPage
  } = useAutoPlay(
    presentationNumPages,
    7000,
    isExpanded && presentationNumPages > 1
  );

  const truncatedAbstract = abstract.split('.').slice(0, 2).join('.') + (abstract.split('.').length > 2 ? '...' : '.');

  const togglePlay = useCallback(() => baseTogglePlay(), [baseTogglePlay]);

  useEffect(() => {
    if (!isExpanded && isPlaying) {
      togglePlay();
    }
  }, [isExpanded, isPlaying, togglePlay]);

  useEffect(() => {
    setCurrentImageLoading(true);
    setImageError(false);
  }, [currentPageIndex, presentationImageFolderName]);

  const currentImageUrl = `/presentation_images/${presentationImageFolderName}/${currentPageIndex + 1}.png`;

  return (
    <motion.div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isExpanded && setIsExpanded(true)}
      layout
    >
      <AnimatePresence>
        {!isExpanded && (
          <motion.div className="p-8 cursor-pointer" exit={{ opacity: 0 }}>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 leading-tight">{title}</h2>
            <p className="text-gray-600 text-sm mb-6 font-medium">{authors}</p>
            <p className="text-gray-700 line-clamp-3 text-lg leading-relaxed">{truncatedAbstract}</p>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent flex items-center justify-center"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <div className="bg-white/95 px-6 py-3 rounded-full flex items-center shadow-xl transform hover:scale-105 transition-transform">
                    <MousePointer size={18} className="mr-3 text-blue-600" />
                    <span className="text-blue-600 font-semibold">View Presentation</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="p-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 leading-tight">{title}</h2>
              <button
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close presentation"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-8 font-medium">{authors}</p>

            <div
              className="relative mb-12 rounded-xl overflow-hidden bg-gray-900 shadow-2xl flex items-center justify-center"
              style={{ height: '500px' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageUrl}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {currentImageLoading && !imageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-800">
                      <ImageIcon size={48} className="animate-pulse mb-2" />
                      <span>Loading Page {currentPageIndex + 1}...</span>
                    </div>
                  )}
                  {imageError && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-red-400 bg-gray-800 text-center">
                        <AlertTriangle size={32} className="mb-2" />
                        <p>Could not load page {currentPageIndex + 1}.</p>
                        <p className="text-xs mt-1">Missing: {currentImageUrl}</p>
                    </div>
                  )}
                  <img
                    src={currentImageUrl}
                    alt={`${presentationCaption || title} - Page ${currentPageIndex + 1}`}
                    className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${currentImageLoading || imageError ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => { setCurrentImageLoading(false); setImageError(false); }}
                    onError={() => { setCurrentImageLoading(false); setImageError(true); }}
                    style={{ display: imageError ? 'none' : 'block' }}
                  />
                </motion.div>
              </AnimatePresence>

              {presentationNumPages > 1 && (
                <>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center space-x-1.5 z-20">
                    {Array.from(new Array(presentationNumPages), (_, index) => (
                      <button
                        key={`dot-${index}`}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out transform focus:outline-none
                                    ${currentPageIndex === index ? 'bg-white scale-125 w-4' : 'bg-gray-400 hover:bg-gray-200'}`}
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(index); }}
                        aria-label={`Go to page ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevPage(); }}
                    className="absolute top-1/2 -translate-y-1/2 left-3 p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors z-20 focus:outline-none"
                    aria-label="Previous Page"
                  > <ChevronLeft size={22} /> </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextPage(); }}
                    className="absolute top-1/2 -translate-y-1/2 right-3 p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors z-20 focus:outline-none"
                    aria-label="Next Page"
                  > <ChevronRight size={22} /> </button>
                  <button
                      onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                      className="absolute bottom-3 right-3 p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors z-20 focus:outline-none"
                      aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                    > {isPlaying ? <Pause size={18} /> : <Play size={18} />} </button>
                </>
              )}
              {presentationCaption && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/60 py-1.5 px-4 rounded-full text-xs text-white font-medium z-10">
                  {presentationCaption} {presentationNumPages > 0 && `(Page ${currentPageIndex + 1} of ${presentationNumPages})`}
                </div>
              )}
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-2xl mb-12">
              <iframe
                src={videoUrl} title="Project Video" className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Abstract</h3>
              <p className="text-gray-700 leading-relaxed">{abstract}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogPost;