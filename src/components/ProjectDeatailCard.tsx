// src/components/ProjectDetailCard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, Pause, Image as ImageIcon, AlertTriangle, Github } from 'lucide-react'; // Added Github icon
import { useAutoPlay } from '../hooks/useAutoPlay';

// Updated Props to include optional githubUrl
export interface ProjectDetailCardProps {
  title: string;
  authors: string;
  abstract: string;
  presentationImageFolderName: string;
  presentationNumPages: number;
  presentationCaption?: string;
  videoUrl: string;
  githubUrl?: string; // Optional GitHub URL
}

const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({
  title,
  authors,
  abstract,
  presentationImageFolderName,
  presentationNumPages,
  presentationCaption,
  videoUrl,
  githubUrl // Destructure githubUrl
}) => {
  const [currentImageLoading, setCurrentImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const {
    currentIndex: currentPageIndex,
    isPlaying,
    togglePlay: baseTogglePlay,
    nextSlide: nextPage,
    prevSlide: prevPage,
    setCurrentIndex: setCurrentPage
  } = useAutoPlay(
    presentationNumPages,
    7000,
    presentationNumPages > 1
  );

  const togglePlay = useCallback(() => baseTogglePlay(), [baseTogglePlay]);

  useEffect(() => {
    if (presentationNumPages > 0) {
        setCurrentImageLoading(true);
        setImageError(false);
    }
  }, [currentPageIndex, presentationImageFolderName, presentationNumPages]);

  const currentImageUrl = `/presentation_images/${presentationImageFolderName}/${currentPageIndex + 1}.png`;

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800 leading-tight">{title}</h2>
        <p className="text-gray-600 text-md mb-8 font-medium">{authors}</p>

        {/* Presentation Slides Section (no change) */}
        {presentationNumPages > 0 && (
            <div
            className="relative mb-10 rounded-lg overflow-hidden bg-gray-900 shadow-xl flex items-center justify-center"
            style={{ height: 'clamp(300px, 60vh, 500px)' }}
            >
            {/* ... existing slide content ... */}
            <AnimatePresence mode="wait">
                <motion.div
                key={currentImageUrl}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center"
                >
                {currentImageLoading && !imageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 bg-gray-800">
                    <ImageIcon size={40} className="animate-pulse mb-2" />
                    <span>Loading Page {currentPageIndex + 1}...</span>
                    </div>
                )}
                {imageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-red-300 bg-gray-800 text-center">
                    <AlertTriangle size={28} className="mb-2" />
                    <p>Could not load page {currentPageIndex + 1}.</p>
                    <p className="text-xs mt-1">Missing: {currentImageUrl}</p>
                    </div>
                )}
                {!imageError && presentationNumPages > 0 && (
                    <img
                    src={currentImageUrl}
                    alt={`${presentationCaption || title} - Page ${currentPageIndex + 1}`}
                    className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${currentImageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => { setCurrentImageLoading(false); setImageError(false); }}
                    onError={() => { setCurrentImageLoading(false); setImageError(true); }}
                    />
                )}
                </motion.div>
            </AnimatePresence>

            {presentationNumPages > 1 && (
                <>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-1.5 z-20">
                    {Array.from({ length: presentationNumPages }, (_, index) => (
                    <button
                        key={`dot-${index}`}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out transform focus:outline-none
                                    ${currentPageIndex === index ? 'bg-white scale-125 w-3.5' : 'bg-gray-400/70 hover:bg-gray-200/90'}`}
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(index); }}
                        aria-label={`Go to page ${index + 1}`}
                    />
                    ))}
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); prevPage(); }}
                    className="absolute top-1/2 -translate-y-1/2 left-2 md:left-3 p-1.5 md:p-2 bg-black/50 rounded-full hover:bg-black/70 text-white transition-colors z-20 focus:outline-none"
                    aria-label="Previous Page"
                > <ChevronLeft size={20} /> </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextPage(); }}
                    className="absolute top-1/2 -translate-y-1/2 right-2 md:right-3 p-1.5 md:p-2 bg-black/50 rounded-full hover:bg-black/70 text-white transition-colors z-20 focus:outline-none"
                    aria-label="Next Page"
                > <ChevronRight size={20} /> </button>
                <button
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    className="absolute bottom-3 right-3 p-1.5 md:p-2 bg-black/50 rounded-full hover:bg-black/70 text-white transition-colors z-20 focus:outline-none"
                    aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                    > {isPlaying ? <Pause size={16} /> : <Play size={16} />} </button>
                </>
            )}
            {presentationCaption && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 py-1 px-3 rounded-full text-xs text-white font-medium z-10">
                {presentationCaption} {presentationNumPages > 0 && `(Page ${currentPageIndex + 1} of ${presentationNumPages})`}
                </div>
            )}
            </div>
        )}

        {/* Video Section (no change) */}
        {videoUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 shadow-xl mb-10">
            <iframe
                src={videoUrl} title={`${title} - Video Presentation`} className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>
        )}

        {/* Abstract Section - Heading REMOVED */}
        <div className="mt-6 bg-slate-50 rounded-lg p-6">
            {/* <h3 className="text-xl font-bold mb-3 text-gray-700">Abstract</h3> REMOVED */}
            <p className="text-gray-600 leading-relaxed text-base">{abstract}</p>
        </div>

        {/* GitHub Link Section - ADDED */}
        {githubUrl && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Project Repository</h3>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors group"
            >
              <Github size={20} className="mr-2 text-gray-700 group-hover:text-blue-700 transition-colors" />
              View on GitHub
            </a>
          </div>
        )}
    </div>
  );
};

export default ProjectDetailCard;