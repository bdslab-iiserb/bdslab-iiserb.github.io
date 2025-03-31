import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FocusAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
}

export default function FocusAreaModal({
  isOpen,
  onClose,
  title,
  description,
  image
}: FocusAreaModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="mx-auto max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500 hover:border-gray-700">
                    <X size={16} />
                  </div>
                </button>
                
                <div className="p-6">
                  <div className="aspect-video mb-6">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <Dialog.Title className="text-2xl font-bold mb-4">
                    {title}
                  </Dialog.Title>
                  
                  <Dialog.Description className="text-gray-600">
                    {description}
                  </Dialog.Description>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}