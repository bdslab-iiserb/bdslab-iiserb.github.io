import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, BookOpen, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import FocusAreaModal from '../components/FocusAreaModal';

// Define a function to get the correct image path
function getImagePath(name: string): string {
  // Use relative paths starting with ./ for GitHub Pages compatibility
  return `/images/${name}`;
}

// Use the function to define image paths
const backgroundImages = [
  getImagePath('histopath.jpg'),
  getImagePath('braintumour.png'),
  getImagePath('lungstum.jpg'),
  getImagePath('nlpusecase.png')
];

const focusAreas = [
  {
    icon: <Brain size={32} />,
    title: "Automatic Tumor Contouring",
    description: "Head and Neck Cancer (HNC) is the most common cancer in India, with over 500,000 new cases worldwide annually. Radiation therapy is frequently recommended, but requires precise segmentation of tumors in CT scans. This process is labor-intensive and prone to inter-observer variability. We aim to develop a deep learning-based image segmentation framework for automatic tumor contouring to improve accuracy and efficiency in radiotherapy planning.",
    image: getImagePath('braintumour.png')
  },
  {
    icon: <BookOpen size={32} />,
    title: "Hemorrhage and Stroke Detection and Classification",
    description: "Intracranial hemorrhage and stroke are critical medical conditions requiring immediate attention. Our research focuses on developing advanced deep learning algorithms for rapid detection and classification of hemorrhages and strokes from CT scans. These tools aim to assist radiologists in making faster, more accurate diagnoses, potentially saving crucial time in emergency situations.",
    image: getImagePath('hemorrhage.png')
  },
  {
    icon: <Activity size={32} />,
    title: "Clinical Text Mining",
    description: "Clinical notes contain crucial information about patients, including diagnoses, medications, and treatment plans. We develop NLP frameworks for automated text mining from clinical reports to support early disease prediction, adverse event detection, and improved patient care. Our research also integrates image and text-based analysis for enhanced radiology diagnostics.",
    image: getImagePath('clinical.png')
  }
];

// Lab videos data
const labVideos = [
  {
    id: "wsSue55t3Jo",
    title: "Podcast on AI in Mental Health by Dr. Tanmay Basu"
  },
  {
    id: "ArjP3hiCtuQ",
    title: "Inside Our Lab"
  }
];

export default function Home() {
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Preload images
  useEffect(() => {
    backgroundImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((current) => (current + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Video navigation functions
  const nextVideo = () => {
    setCurrentVideoIndex((current) => (current + 1) % labVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((current) => (current - 1 + labVideos.length) % labVideos.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black opacity-75"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <img
                src={backgroundImages[currentImageIndex]}
                alt="Background"
                className="w-full h-full object-cover blur-sm" 
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-xl" 
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Biomedical Data Science Lab
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-gray-100 mb-8 tracking-wide">
              Indian Institute of Science Education and Research{' '}
              <span className="text-blue-300 font-bold">(IISER)</span>{' '}
              <span className="text-blue-400 font-bold">Bhopal</span>
            </p>            
            <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
              Advancing healthcare through artificial intelligence and data science innovations. 
              Our research focuses on medical imaging, clinical text analysis, and biomedical literature mining.
            </p>
            <button 
              onClick={() => navigate('/research')}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto text-lg"
            >
              Explore Our Research
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Research Focus Areas */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Research Focus Areas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedArea(index)}
              >
                <div className="text-blue-600 mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                <p className="text-gray-600 line-clamp-3">{area.description}</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800">
                  Learn more →
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedArea !== null && (
          <FocusAreaModal
            isOpen={selectedArea !== null}
            onClose={() => setSelectedArea(null)}
            title={focusAreas[selectedArea].title}
            description={focusAreas[selectedArea].description}
            image={focusAreas[selectedArea].image}
          />
        )}
      </section>

      {/* News Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Latest News
            </span>
          </motion.h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Recent achievements and updates from our lab</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Paper Accepted at Artificial Intelligence and Medicine Journal",
                description: "Congratulations to Prateek and team!",
                icon: "🎉",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                title: "Paper Accepted at Neuroscience Informatics Journal",
                description: "Congratulations to Srutanik and team!",
                icon: "🧠",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                title: "AAAI-2026 Student Abstract Accepted",
                description: "Congratulations to Ashim!",
                icon: "🌟",
                gradient: "from-cyan-500 to-cyan-600"
              },
              {
                title: "Paper Accepted at IJCNLP-AACL 2025",
                description: "Congratulations to Himadri and Saisab!",
                icon: "📝",
                gradient: "from-green-500 to-green-600"
              },
              {
                title: "Paper Accepted at FinNLP @ EMNLP 2025",
                description: "Congratulations to Saisab!",
                icon: "💼",
                gradient: "from-orange-500 to-orange-600"
              }
            ].map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient top border */}
                <div className={`h-1.5 bg-gradient-to-r ${news.gradient}`}></div>
                
                <div className="p-6">
                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {news.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight">
                    {news.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {news.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${news.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Videos Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Media</h2>
          
          {/* Video container with navigation */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVideoIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video"
                >
                  <iframe 
                    src={`https://www.youtube.com/embed/${labVideos[currentVideoIndex].id}`}
                    title={labVideos[currentVideoIndex].title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevVideo}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous video"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextVideo}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Next video"
            >
              <ChevronRight size={24} />
            </button>

            {/* Video indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {labVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentVideoIndex 
                      ? 'bg-blue-600 scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>

            {/* Video title */}
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {labVideos[currentVideoIndex].title}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}