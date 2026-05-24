import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Function to get image path
function getImagePath(name: string): string {
  return `/images/gallery/${name}`;
}

export default function Gallery() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Add your gallery images here
  const galleryImages = [
    {
      image: getImagePath('conference1.jpg'),
      caption: 'Conference Presentation at MICCAI 2026',
    },
    {
      image: getImagePath('thesis1.jpg'),
      caption: 'Master Thesis Presentation',
    },
    {
      image: getImagePath('dinner1.jpg'),
      caption: 'Lab Group Dinner',
    },
    {
      image: getImagePath('workshop1.jpg'),
      caption: 'Workshop Participation',
    },
    {
      image: getImagePath('team1.jpg'),
      caption: 'MUR Lab Team Photo',
    },
    {
      image: getImagePath('event1.jpg'),
      caption: 'Research Discussion Session',
    },
  ];

  return (
    <div className="pt-32 pb-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-gray-600 text-lg">
            Moments, memories, and milestones from MUR Lab
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Caption */}
              <div className="p-4">
                <p className="text-gray-700 text-center text-sm md:text-base">
                  {photo.caption}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
