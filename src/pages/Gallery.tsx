import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Function to get image path
function getImagePath(name: string): string {
  return `/images/gallery_images/${name}`;
}

type Category = 'Awards & Media' | 'Conferences & Talks' | 'Milestones' | 'Lab Life';

interface Photo {
  image: string;
  caption: string;
  category: Category;
  width: number;
  height: number;
}

const categories: Category[] = [
  'Awards & Media',
  'Conferences & Talks',
  'Milestones',
  'Lab Life',
];

// Gallery Images
const galleryImages: Photo[] = [
  {
    image: getImagePath('saisab-sigir-2026-best-paper.jpg'),
    caption: 'Saisab receiving the Best Paper Award at SIGIR 2026',
    category: 'Awards & Media',
    width: 2550,
    height: 1829,
  },
  {
    image: getImagePath('sigir-2026-best-paper-memento.jpg'),
    caption: 'A small memento from BDS Lab on securing the Best Paper Award at SIGIR 2026',
    category: 'Awards & Media',
    width: 4000,
    height: 3000,
  },
  {
    image: getImagePath('toi-feature.jpg'),
    caption: 'BDS Lab research featured in The Times of India',
    category: 'Awards & Media',
    width: 1159,
    height: 1275,
  },
  {
    image: getImagePath('ashim-aaai-2026.jpg'),
    caption: 'Ashim presenting his paper at AAAI 2026, Singapore',
    category: 'Conferences & Talks',
    width: 1200,
    height: 1600,
  },
  {
    image: getImagePath('ecir-2026-presentation.jpg'),
    caption: "Dr. Dwaipayan Roy presenting Saisab's paper at ECIR 2026",
    category: 'Conferences & Talks',
    width: 1204,
    height: 1600,
  },
  {
    image: getImagePath('isbi-2026-london.jpg'),
    caption: 'Dr. Tanmay Basu presenting our paper at ISBI 2026, London, UK',
    category: 'Conferences & Talks',
    width: 1200,
    height: 1600,
  },
  {
    image: getImagePath('care-conference-lecture.jpg'),
    caption: 'Dr. Tanmay Basu delivering a lecture at the CARE Conference, IIT Guwahati',
    category: 'Conferences & Talks',
    width: 4080,
    height: 3060,
  },
  {
    image: getImagePath('oxford-collaboration-meet.jpg'),
    caption: 'Dr. Tanmay Basu with our collaborator Dr. Abhirup Banerjee at the University of Oxford',
    category: 'Conferences & Talks',
    width: 1280,
    height: 961,
  },
  {
    image: getImagePath('oxford-team-meet.jpg'),
    caption: 'Dr. Tanmay Basu with Dr. Abhirup Banerjee and the collaborating team',
    category: 'Conferences & Talks',
    width: 2016,
    height: 1512,
  },
  {
    image: getImagePath('ms-thesis-defence-group.jpg'),
    caption: 'Srutanik, Saisab, Himadri and Ashim after their MS thesis defence (left to right)',
    category: 'Milestones',
    width: 4160,
    height: 3120,
  },
  {
    image: getImagePath('ashim-thesis-defence.jpg'),
    caption: 'Ashim after his successful thesis defence',
    category: 'Milestones',
    width: 1600,
    height: 1200,
  },
  {
    image: getImagePath('himadri-thesis-defence.jpg'),
    caption: 'Himadri after her successful thesis defence',
    category: 'Milestones',
    width: 1200,
    height: 1600,
  },
  {
    image: getImagePath('saisab-thesis-defence.jpg'),
    caption: 'Saisab after his successful thesis defence',
    category: 'Milestones',
    width: 1200,
    height: 1600,
  },
  {
    image: getImagePath('ms-students-felicitation.jpg'),
    caption: 'Felicitation of the MS students at BDS Lab',
    category: 'Milestones',
    width: 4000,
    height: 3000,
  },
  {
    image: getImagePath('ms-felicitation-saisab.jpeg'),
    caption: 'Saisab receiving a memento at the felicitation of the MS students',
    category: 'Milestones',
    width: 1280,
    height: 960,
  },
  {
    image: getImagePath('ms-felicitation-srutanik.jpeg'),
    caption: 'Srutanik receiving a memento at the felicitation of the MS students',
    category: 'Milestones',
    width: 1280,
    height: 960,
  },
  {
    image: getImagePath('farewell-celebration.jpg'),
    caption: 'BDS Lab celebrating the passing out students',
    category: 'Milestones',
    width: 4000,
    height: 3000,
  },
  {
    image: getImagePath('lab-dinner-december-2025.jpg'),
    caption: 'BDS Lab dinner, December 2025',
    category: 'Lab Life',
    width: 4080,
    height: 3060,
  },
  {
    image: getImagePath('lab-dinner-abhirup-visit.jpg'),
    caption: "BDS Lab dinner during Dr. Abhirup Banerjee's visit in January",
    category: 'Lab Life',
    width: 1040,
    height: 780,
  },
  {
    image: getImagePath('saisab-prateek-birthday.jpg'),
    caption: "Saisab's and Prateek's birthday celebration at the lab",
    category: 'Lab Life',
    width: 3264,
    height: 2448,
  },
  {
    image: getImagePath('lab-jackets-2026.jpg'),
    caption: 'The lab jackets, finally unveiled',
    category: 'Lab Life',
    width: 1600,
    height: 1200,
  },
  {
    image: getImagePath('lab-outing-july-2026.jpg'),
    caption: 'BDS Lab get-together, July 2026',
    category: 'Lab Life',
    width: 1600,
    height: 1200,
  },
];

export default function Gallery() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const photos =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((photo) => photo.category === activeCategory);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % photos.length
    );
  }, [photos.length]);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    }

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, showPrev, showNext]);

  const activePhoto = lightboxIndex === null ? null : photos[lightboxIndex];

  return (
    <div className="pt-32 pb-20 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Gallery
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Moments, memories, conferences, thesis defenses, and celebrations from BDS Lab
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {(['All', ...categories] as const).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Masonry Gallery — images keep their natural aspect ratio (never cropped) */}
        <div
          key={activeCategory}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"
        >
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.image}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.6) }}
              whileHover={{ y: -4 }}
              onClick={() => setLightboxIndex(index)}
              className="group mb-6 break-inside-avoid cursor-zoom-in overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={photo.image}
                alt={photo.caption}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />

              <figcaption className="p-4 text-sm md:text-[0.95rem] leading-snug text-gray-700 group-hover:text-blue-700 transition-colors">
                <span className="block text-[0.7rem] uppercase tracking-wider text-gray-400 mb-1">
                  {photo.category}
                </span>
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.figure
              key={activePhoto.image}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="max-w-5xl w-full flex flex-col items-center"
            >
              <img
                src={activePhoto.image}
                alt={activePhoto.caption}
                className="max-h-[78vh] max-w-full w-auto object-contain rounded-lg shadow-2xl"
              />

              <figcaption className="mt-4 text-center text-sm sm:text-base text-gray-200 max-w-2xl">
                {activePhoto.caption}
                <span className="block mt-1 text-xs text-gray-400">
                  {(lightboxIndex ?? 0) + 1} / {photos.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
