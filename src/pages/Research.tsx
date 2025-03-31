import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Research() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">Our Research</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Research Focus</h2>
          <p className="text-gray-600 mb-8">
            The <b>Biomedical Data Science Lab</b> focuses on developing AI-driven solutions for healthcare, bioinformatics, and medical imaging. Our research is aimed at improving disease diagnosis, treatment planning, and healthcare delivery through data science and machine learning.
          </p>

          <h3 className="text-xl font-semibold mb-4">Research Interests</h3>
          <ul className="list-disc list-inside mb-8 text-gray-600">
            <li>Biomedical Data Science</li>
            <li>Knowledge in Radiology Data</li>
            <li>Information Extraction from Unstructured Text</li>
            <li>Machine Learning</li>
            <li>Natural Language Processing (NLP)</li>
            <li>Social Media and Scientific Literature Mining</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Current Projects</h2>
          
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">Automatic Tumor Contouring</h3>
              <p className="text-gray-600">
                Head and Neck Cancer (HNC) is the most common cancer in India, with over 500,000 new cases worldwide annually. Radiation therapy is frequently recommended, but requires precise segmentation of tumors in CT scans. This process is labor-intensive and prone to inter-observer variability. We aim to develop a deep learning-based image segmentation framework for automatic tumor contouring to improve accuracy and efficiency in radiotherapy planning.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">Biomedical Literature Mining</h3>
              <p className="text-gray-600">
                Biomedical literature contains valuable domain-specific knowledge. Our research focuses on NLP techniques for automated information extraction, knowledge graph construction, and biomarker identification. We develop transformer-based models to analyze PubMed and other biomedical sources for efficient knowledge discovery.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">Clinical Text Mining</h3>
              <p className="text-gray-600">
                Clinical notes contain crucial information about patients, including diagnoses, medications, and treatment plans. We develop NLP frameworks for automated text mining from clinical reports to support early disease prediction, adverse event detection, and improved patient care. Our research also integrates image and text-based analysis for enhanced radiology diagnostics.
              </p>
            </motion.div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Publications</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Journal Articles</h3>
              <ul className="space-y-4 text-gray-600">
                <li>Archana Yadav, Biswajit Patra, Tanmay Basu, <i>Modeling International Tourist Arrivals: An NLP Perspective</i>. <b>Operations Research Forum</b>, Springer Nature, 2024.</li>
                <li>Arnab Roy, Tanmay Basu, <i>Postimpact Similarity: A Similarity Measure for Effective Grouping of Unlabelled Text</i>. <b>Knowledge and Information Systems</b>, Springer, 2022.</li>
                <li>Tanmay Basu, Simon Goldsworthy, Georgios V. Gkoutos, <i>A Sentence Classification Framework to Identify Geometric Errors in Radiation Therapy</i>. <b>Information, MDPI</b>, 2021.</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Conference Papers</h3>
              <ul className="space-y-4 text-gray-600">
                <li>Shraddha Agarwal, Vinod Kumar Kurmi, Abhirup Banerjee, Tanmay Basu, <i>TCPNet: A Novel Tumor Contour Prediction Network using MRIs</i>. <b>IEEE International Conference on Healthcare Informatics</b>, USA, 2024.</li>
                <li>Anuradha Mahato, Prateek Sarangi, Vinod Kumar Kurmi, <i>Uncertainty Quantification in Deep Learning Framework for Mallampati Classification</i>. <b>IEEE International Conference on Healthcare Informatics</b>, USA, 2024.</li>
                <li>Arkapal Panda, Tanmay Basu, Vaibhav Kumar, <i>An Ensemble Learning Framework for Visibility Prediction</i>. <b>ICLR Tiny Papers</b>, 2023.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}