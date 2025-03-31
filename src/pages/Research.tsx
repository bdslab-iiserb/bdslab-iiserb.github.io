import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FocusAreaModal from '../components/FocusAreaModal';
import { Brain, BookOpen, Activity } from 'lucide-react';

// Define a function to get the correct image path
function getImagePath(name: string): string {
  // Use relative paths starting with ./ for GitHub Pages compatibility
  return `/images/${name}`;
}

const researchProjects = [
  {
    icon: <Brain size={32} />,
    title: "Automatic Tumor Contouring",
    description: "Head and Neck Cancer (HNC) is the most common cancer in India, with over 500,000 new cases worldwide annually. Radiation therapy is frequently recommended, but requires precise segmentation of tumors in CT scans. This process is labor-intensive and prone to inter-observer variability. We aim to develop a deep learning-based image segmentation framework for automatic tumor contouring to improve accuracy and efficiency in radiotherapy planning.",
    image: getImagePath('braintumour.png')
  },
  {
    icon: <BookOpen size={32} />,
    title: "Automated Brain Hemorrhage Classification",
    description: "Intracranial hemorrhage and stroke are critical medical conditions requiring immediate attention. Our research focuses on developing advanced deep learning algorithms for rapid detection and classification of hemorrhages and strokes from CT scans. These tools aim to assist radiologists in making faster, more accurate diagnoses, potentially saving crucial time in emergency situations.",
    image: getImagePath('hemorrhage.png')
  },
  {
    icon: <Activity size={32} />,
    title: "Scientific Literature Mining for Evidence Synthesis",
    description: "We employ NLP-driven transformer models such as BERT and SciBERT to extract, analyze, and synthesize key insights from vast scientific literature. These models enable automated knowledge retrieval, helping researchers identify trends, gaps, and reliable evidence for decision-making.",
    image: getImagePath('clinical.png')
  }
];

export default function Research() {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // More pronounced pop animation variants
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 1
    },
    inView: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    hover: { 
      scale: 1.05, 
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    tap: { 
      scale: 0.97,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">Our Research Initiatives</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Research Focus</h2>
          <p className="text-gray-600 mb-8">
            The <b>Biomedical Data Science Lab</b> focuses on developing AI-driven solutions for healthcare, bioinformatics, and medical imaging. Our research is aimed at improving disease diagnosis, treatment planning, and healthcare delivery through data science and machine learning.
          </p>

          <h3 className="text-xl font-semibold mb-4">Research Interests</h3>
          <ul className="list-disc list-inside mb-8 text-gray-600">
            <li>AI for Better Medical Diagnostics and Treatment Planning</li>
            <li>Biomedical Data Science</li>
            <li>Knowledge Discovery in Radiology Data</li>
            <li>Information Extraction from Unstructured Text</li>
            <li>Natural Language Processing (NLP)</li>
            <li>Social Media and Scientific Literature Mining</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Current Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchProjects.map((project, index) => (
              <motion.div 
                key={index}
                initial="initial"
                whileInView="inView"
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
                onClick={() => setSelectedProject(index)}
                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer border border-transparent hover:border-blue-200 relative z-10"
              >
                <div className="text-blue-600 mb-4 transform transition-transform group-hover:scale-110">
                  <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }}>
                    {project.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 line-clamp-4">{project.description}</p>
                <motion.button 
                  className="mt-4 text-blue-600 hover:text-blue-800 flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <span>Learn more</span> 
                  <motion.span 
                    className="ml-1"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 1 
                    }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm italic">
            Hover over projects to learn more
          </div>
        </section>

        {selectedProject !== null && (
          <FocusAreaModal
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
            title={researchProjects[selectedProject].title}
            description={researchProjects[selectedProject].description}
            image={researchProjects[selectedProject].image}
          />
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Publications</h2>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Journal Articles</h3>
              <ul className="space-y-4 text-gray-600">
                <li>Archana Yadav, Biswajit Patra, Tanmay Basu, <i>Modeling International Tourist Arrivals: An NLP Perspective</i>. <b>Operations Research Forum</b>, Springer Nature, 2024.</li>
                <li>Arnab Roy, Tanmay Basu, <i>Postimpact Similarity: A Similarity Measure for Effective Grouping of Unlabelled Text</i>. <b>Knowledge and Information Systems</b>, Springer, 2022.</li>
                <li>Tanmay Basu, Simon Goldsworthy, Georgios V. Gkoutos, <i>A Sentence Classification Framework to Identify Geometric Errors in Radiation Therapy</i>. <b>Information, MDPI</b>, 2021.</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Conference Papers</h3>
              <ul className="space-y-4 text-gray-600">
                <li>Shraddha Agarwal, Vinod Kumar Kurmi, Abhirup Banerjee, Tanmay Basu, <i>TCPNet: A Novel Tumor Contour Prediction Network using MRIs</i>. <b>IEEE International Conference on Healthcare Informatics</b>, USA, 2024.</li>
                <li>Anuradha Mahato, Prateek Sarangi, Vinod Kumar Kurmi, <i>Uncertainty Quantification in Deep Learning Framework for Mallampati Classification</i>. <b>IEEE International Conference on Healthcare Informatics</b>, USA, 2024.</li>
                <li>Arkapal Panda, Tanmay Basu, Vaibhav Kumar, <i>An Ensemble Learning Framework for Visibility Prediction</i>. <b>ICLR Tiny Papers</b>, 2023.</li>
              </ul>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}