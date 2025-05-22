// src/components/ProjectModal.tsx
import React, { useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ProjectDetailCard, { ProjectDetailCardProps } from './ProjectDeatailCard';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: ProjectDetailCardProps | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectData }) => {
  // Effect to lock/unlock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Or 'auto' or ''
    }
    // Cleanup function to reset body scroll when component unmounts or isOpen changes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]); // Re-run effect when isOpen changes

  if (!isOpen || !projectData) return null;

  return (
    <AnimatePresence>
      {/* No need for another isOpen check here as it's handled by the hook and the return above */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-2 sm:p-4"
          onClick={onClose} // Close on overlay click
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }} // Slightly adjusted animation
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }} // Adjusted transition
            // IMPORTANT: Set a max-width and max-height for the modal content area
            // The inner div will handle the scrolling.
            className="bg-transparent w-full max-w-4xl max-h-[90vh] sm:max-h-[95vh] rounded-lg sm:rounded-xl relative flex flex-col" // Added flex flex-col
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* This div will contain the ProjectDetailCard and enable scrolling */}
            {/* ProjectDetailCard itself provides the white background and padding */}
            <div className="overflow-y-auto flex-grow rounded-lg sm:rounded-xl"> {/* Added flex-grow and rounding */}
                <ProjectDetailCard {...projectData} />
            </div>

            <button
                onClick={onClose}
                className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 bg-gray-700/60 hover:bg-gray-600/80 rounded-full text-white z-[120] transition-colors"
                aria-label="Close project details"
            >
                <X size={18} strokeWidth={2.5} />
            </button>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;