// src/pages/Research.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Activity, Github } from 'lucide-react';

import { modalProjects, ModalProject, ExtendedProjectDetailCardProps } from '../data/detailedProjectData';
import ProjectModal from '../components/ProjectModal';
import PublicationCarousel, { Publication } from '../components/PublicationCarousel';

const getImagePath = (name: string): string => `/images/${name}`;

// Publications data for carousel
const publications: Publication[] = [
   {
    id: '1',
    title: 'ProtoRadNet: Prototypical patches of Convolutional Features for Radiology Image Classification Network',
    authors: 'Prateek Sarangi, Riya Agarwal, Tanmay Basu',
    venue: 'Artificial Intelligence in Medicine, Elsevier',
    year: 2025,
    type: 'journal',
    link:'https://www.sciencedirect.com/science/article/pii/S0933365725002593',
    image:'/images/papers/protoradnet.png'
  },

     {
    id: '2',
    title: 'Attention-Gated CNN and discrete wavelet transform based ensemble framework for brain hemorrhage classification',
    authors: 'Srutanik Bhaduri, Rasel Mondal, Prateek Sarangi, Vinod Kumar Kurmi, Swati Goyal, Lovely Kaushal, Mahek Sodani, Tanmay Basu',
    venue: 'Neuroscience Informatics, Elsevier',
    year: 2025,
    type: 'journal',
    link:'https://www.sciencedirect.com/science/article/pii/S2772528625000585',
    image:'/images/papers/agcnn.png'
  },


     {
    id: '3',
    title: 'Structured Adversarial Synthesis: A Multi-Agent Framework for Generating Persuasive Financial Analysis from Earnings Call Transcripts',
    authors: 'Saisab Sadhu, Biswajit Patra, Tanmay Basu',
    venue: 'FinNLP @ EMNLP 2025',
    year: 2025,
    type: 'conference',
    link:'https://aclanthology.org/2025.finnlp-2.21.pdf',
    image:'/images/papers/sas.png'
  },

  {
    
    id: '4',
    title: 'Modeling International Tourist Arrivals: An NLP Perspective',
    authors: 'Archana Yadav, Biswajit Patra, Tanmay Basu',
    venue: 'Operations Research Forum, Springer Nature',
    year: 2024,
    type: 'journal',
    link: 'https://link.springer.com/article/10.1007/s43069-024-00365-1',
    image: '/images/papers/mita.png'
  },
  {
    id: '5',
    title: 'TCPNet: A Novel Tumor Contour Prediction Network using MRIs',
    authors: 'Shraddha Agarwal, Vinod Kumar Kurmi, Abhirup Banerjee, Tanmay Basu',
    venue: 'IEEE International Conference on Healthcare Informatics',
    year: 2024,
    type: 'conference',
    link: 'https://ieeexplore.ieee.org/document/10628585',
    image: '/images/papers/tcpnet.png'

  },
  {
    id: '6',
    title: 'Uncertainty Quantification in Deep Learning Framework for Mallampati Classification',
    authors: 'Anuradha Mahato, Prateek Sarangi, Vinod Kumar Kurmi',
    venue: 'IEEE International Conference on Healthcare Informatics',
    year: 2024,
    type: 'conference',
    link: 'https://ieeexplore.ieee.org/document/10628627c',
    image: '/images/papers/mallam.png'


  }
];

const staticTumorContouringProject = {
  icon: <Activity size={36} />,
  title: "Automatic Tumor Contouring",
  description: "Head and Neck Cancer (HNC) is the most common cancer in India, with over 500,000 new cases worldwide annually. Radiation therapy is frequently recommended, but requires precise segmentation of tumors in CT scans. This process is labor-intensive and prone to inter-observer variability. We aim to develop a deep learning-based image segmentation framework for automatic tumor contouring to improve accuracy and efficiency in radiotherapy planning.",
  image: getImagePath('braintumour.png'),
  githubUrl: "https://github.com/your-repo/tumor-contouring" // EXAMPLE: Replace or remove if none
};

export default function Research() {
  const location = useLocation();
  const [activeProjectModalData, setActiveProjectModalData] = useState<ExtendedProjectDetailCardProps | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeProjectModalData) {
        setActiveProjectModalData(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [activeProjectModalData]);

  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    inView: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20, delay: i * 0.1 }
    }),
    hover: {
      scale: 1.03,
      y: -6,
      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 350, damping: 15 }
    },
    tap: { scale: 0.97 }
  };

  const handleModalProjectClick = (project: ModalProject) => {
    setActiveProjectModalData({
        title: project.title,
        authors: project.authors,
        abstract: project.abstract,
        presentationImageFolderName: project.presentationImageFolderName,
        presentationNumPages: project.presentationNumPages,
        presentationCaption: project.presentationCaption,
        videoUrl: project.videoUrl,
        githubUrl: project.githubUrl
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <motion.h1
          className="text-5xl font-bold text-center mb-16 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Research Initiatives
        </motion.h1>

        {/* Research Focus and Interests Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-700">Research Focus</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            The <b>Biomedical Data Science Lab</b> focuses on developing AI-driven solutions for healthcare, bioinformatics, and medical imaging. Our research is aimed at improving disease diagnosis, treatment planning, and healthcare delivery through data science and machine learning.
          </p>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Research Interests</h3>
          <ul className="list-disc list-inside mb-8 text-gray-600 space-y-1 text-lg">
            <li>AI for Better Medical Diagnostics and Treatment Planning</li>
            <li>Biomedical Data Science</li>
            <li>Knowledge Discovery in Radiology Data</li>
            <li>Information Extraction from Unstructured Text</li>
            <li>Natural Language Processing (NLP)</li>
            <li>Social Media and Scientific Literature Mining</li>
          </ul>
        </motion.section>

        {/* Recent Publications Carousel Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recent Publications
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg leading-relaxed">
            Explore our latest research contributions in AI for healthcare, medical imaging, and biomedical data science.
          </p>
          <PublicationCarousel publications={publications} />
        </motion.section>

        {/* Project Spotlights Section */}
        <section className="mb-20">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay:0.1 }}
          >
            Project Spotlights
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore our key research projects. Click on projects with "View Details" for presentations and videos.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Static Card: Automatic Tumor Contouring */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="initial"
              whileInView="inView"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col group"
            >
              <div className="relative h-52 sm:h-60 w-full overflow-hidden">
                <img
                  src={staticTumorContouringProject.image}
                  alt={`${staticTumorContouringProject.title} preview`}
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute top-3 left-3 p-1.5 bg-black/50 rounded-full backdrop-blur-sm">
                   {React.cloneElement(staticTumorContouringProject.icon, { size: 22, className: "text-white" })}
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                  {staticTumorContouringProject.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 flex-grow">{staticTumorContouringProject.description}</p>
                {staticTumorContouringProject.githubUrl && (
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <a
                      href={staticTumorContouringProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors group/link"
                    >
                      <Github size={16} className="mr-1.5 text-gray-600 group-hover/link:text-blue-700 transition-colors" />
                      View on GitHub
                    </a>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Modal-opening Project Cards */}
            {modalProjects.map((project, index) => (
              <motion.div
                key={project.previewTitle + index}
                custom={index + 1}
                variants={cardVariants}
                initial="initial"
                whileInView="inView"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer flex flex-col group"
                onClick={() => handleModalProjectClick(project)}
              >
                <div className="relative h-52 sm:h-60 w-full overflow-hidden">
                  <img
                    src={project.previewImage}
                    alt={`${project.previewTitle} preview`}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute top-3 left-3 p-1.5 bg-black/50 rounded-full backdrop-blur-sm">
                     {React.cloneElement(project.previewIcon, { size: 22, className: "text-white" })}
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex-grow flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                    {project.previewTitle}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 sm:line-clamp-4 flex-grow">{project.shortDescription}</p>
                  <div
                    className="mt-auto self-start text-blue-600 group-hover:text-blue-700 font-medium text-sm sm:text-base py-1 transition-colors duration-200 flex items-center"
                  >
                    View Details
                    <motion.span className="ml-1.5" animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>→</motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <ProjectModal
        isOpen={activeProjectModalData !== null}
        onClose={() => setActiveProjectModalData(null)}
        projectData={activeProjectModalData}
      />
    </div>
  );
}