// src/pages/Research.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Activity, Github } from 'lucide-react'; // Github icon for links

import { modalProjects, ModalProject, ExtendedProjectDetailCardProps } from '../data/detailedProjectData'; // Ensure correct path and import Extended...
import ProjectModal from '../components/ProjectModal'; // Ensure correct path

const getImagePath = (name: string): string => `/images/${name}`;

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

        {/* Recent Publications Section */}
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h2 className="text-3xl font-bold mb-8 text-gray-700">Recent Publications</h2>
            <div className="space-y-8">
                <motion.div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Journal Articles</h3>
                    <ul className="space-y-4 text-gray-700 text-lg leading-relaxed">
                        <li>Archana Yadav, Biswajit Patra, Tanmay Basu, <i>Modeling International Tourist Arrivals: An NLP Perspective</i>. <b>Operations Research Forum</b>, Springer Nature, 2024.</li>
                        <li>Arnab Roy, Tanmay Basu, <i>Postimpact Similarity: A Similarity Measure for Effective Grouping of Unlabelled Text</i>. <b>Knowledge and Information Systems</b>, Springer, 2022.</li>
                        <li>Tanmay Basu, Simon Goldsworthy, Georgios V. Gkoutos, <i>A Sentence Classification Framework to Identify Geometric Errors in Radiation Therapy</i>. <b>Information, MDPI</b>, 2021.</li>
                    </ul>
                </motion.div>
                <motion.div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Conference Papers</h3>
                    <ul className="space-y-4 text-gray-700 text-lg leading-relaxed">
                        <li>Shraddha Agarwal, Vinod Kumar Kurmi, Abhirup Banerjee, Tanmay Basu, <i>TCPNet: A Novel Tumor Contour Prediction Network using MRIs</i>. <b>IEEE International Conference on Healthcare Informatics</b>, USA, 2024.</li>
                        <li>Anuradha Mahato, Prateek Sarangi, Vinod Kumar Kurmi, <i>Uncertainty Quantification in Deep Learning Framework for Mallampati Classification</i>. <b>IEEE International Conference on Healthcare Informatics</b>, USA, 2024.</li>
                        <li>Arkapal Panda, Tanmay Basu, Vaibhav Kumar, <i>An Ensemble Learning Framework for Visibility Prediction</i>. <b>ICLR Tiny Papers</b>, 2023.</li>
                    </ul>
                </motion.div>
            </div>
        </motion.section>
      </div>

      <ProjectModal
        isOpen={activeProjectModalData !== null}
        onClose={() => setActiveProjectModalData(null)}
        projectData={activeProjectModalData}
      />
    </div>
  );
}