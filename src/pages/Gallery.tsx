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

  // Gallery Images
  const galleryImages = [
    {
      image: getImagePath('AAAI_ashim.jpg'),
      caption: 'Ashim presented his paper at AAAI 2026 Conference at Singapore',
    },
    {
      image: getImagePath('Ashim_Thesi_Defended.jpg'),
      caption: 'Ashim after Successful Thesis Defense',
    },
    {
      image: getImagePath('CARE.jpg'),
      caption: 'Research Presentation at CARE',
    },
    {
      image: getImagePath('CARE_TB_Talk.jpg'),
      caption: 'Dr.Tanmay Basu delivered a tak at the CARE Conference at IIT Guwahati',
    },
    {
      image: getImagePath('Dinner_AB.jpg'),
      caption: 'Lab Dinner',
    },
    {
      image: getImagePath('ECIR.jpeg'),
      caption: 'Presentation of Saisab's paper at ECIR 2026 Conference by Dr. Dwaipayan Roy',
    },
    {
      image: getImagePath('himadri_defense.jpeg'),
      caption: 'Himadri after Thesis Defense',
    },
    {
      image: getImagePath('IISERB+Oxford_Meet.jpg'),
      caption: 'Dr. Tanmay Basu met our collaborator Dr. Abhirup Banerjee at Oxford University.',
    },
    {
      image: getImagePath('ISBI_TanmaySir.jpg'),
      caption: 'Presentation at of Ashim's paper at ISBI 2026 Conference',
    },
    {
      image: getImagePath('Lab_dinner_Dec.jpg'),
      caption: 'Lab Dinner',
    },
    {
      image: getImagePath('saisab_defense.jpeg'),
      caption: 'Saisab after Thesis Defense',
    },
    {
      image: getImagePath('Saisab_Prateek_BP.jpg'),
      caption: 'Saisab's and Prateek's Birthday Celebration',
    },
    {
      image: getImagePath('Thesis_Defended_BS-MS.jpg'),
      caption: 'MS Thesis Defense by Ashim, Himadri, Saisab amsd Srutanik (left to right)',
    },
  ];

  return (
    <div className="pt-32 pb-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Gallery
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Moments, memories, conferences, thesis defenses, and celebrations from MUR Lab
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {galleryImages.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
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
                <p className="text-gray-700 text-center text-sm md:text-base font-medium">
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
