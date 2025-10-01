import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PhotoCarousel from '../components/PhotoCarousel';
import { li } from 'framer-motion/client';
import { link } from 'fs';

// Define a function to get the correct image path
function getImagePath(name: string): string {
  // Use relative paths starting with ./ for GitHub Pages compatibility
  return `/images/${name}`;
}

export default function Team() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const teamMembers = {
    supervisor: {
      name: "Dr. Tanmay Basu",
      role: "Assistant Professor and Head, Department of Data Science and Engineering, IISER Bhopal",
      specialization: "AI in Healthcare, Predictive Analytics",
      email: "tanmay@iiserb.ac.in",
      image: getImagePath("tanmay.jpg"),
      scholarProfile: "https://scholar.google.co.in/citations?user=utfyHkMAAAAJ&hl=en",
      website: "https://sites.google.com/view/tanmaybasu/"
    },
    phdScholars: [
      {
        name: "Mr. Prateek Sarangi",
        research: "Deep Learning for Radiotherapy Planning, Medical Image Segmentation",
        email: "prateek24@iiserb.ac.in",
        scholarProfile: "https://scholar.google.com/citations?hl=en&user=WkTHFiIAAAAJ",
        image: getImagePath("prateek.jpg")
      },
      {
        name: "Mr. Rasel Mondal",
        research: "Fuzzy Learning for Medical Image Segmentation",
        email: "rasel23@iiserb.ac.in",
        scholarProfile: "https://scholar.google.com/citations?hl=en&user=lSnr930AAAAJ",
        image: getImagePath("rasel.jpg")
      },
      {
        name: "Mr. Sumit Kumar",
        research: "NLP for Scientific Literature Mining and Clinical Text Analysis for Evidence Synthesis",
        email: "sumit23@iiserb.ac.in",
        linkedIn: "https://www.linkedin.com/in/sumit-kumar-787203178",
        image: getImagePath("sumit.jpg")
      }
    ],
    mastersStudents: [
      {
        name: "Srutanik Bhaduri",
        research: "Semi-Supervised Learning and Domain Adaptation for Medical Image Analysis",
        email: "srutanik21@iiserb.ac.in",
        image: getImagePath("srutanik.jpg")
      },
      {
        name: "Saisab Sadhu",
        research: "Overcoming Imperfect Retrieval Augmentation and Knowledge Conflicts in RAG Frameworks",
        email: "saisa21@iiserb.ac.in",
        image: getImagePath("saisab.jpg")
      },
      {
        name: "Ashim Dhor",
        research: "Deep Learning for Histopathology Image Analysis",
        email: "ashim21@iiserb.ac.in",
        scholarProfile: "https://scholar.google.com/citations?user=KnN80Q4AAAAJ&hl=en",
        image: getImagePath("ashim.jpg")
      },
      {
        name: "Himadri Sonowal",
        research: "Legal Text Summarization",
        email: "himadri20@iiserb.ac.in",
        image: getImagePath("himadri.jpg")
      }
    ],
    alumni: [
      {
        name: "Ramavath Tharun",
        current: "Currently Solutions Analyst at Nucleus Software",
        linkedIn: "https://www.linkedin.com/in/ramavath-tharun-493496263/",
        email: "ramavath21@iiserb.ac.in",
        image: getImagePath("tharun.jpg")
      },
      {
        name: "Vishwaraj Chavan",
        email: "chavan21@iiserb.ac.in",
        linkedIn: "https://www.linkedin.com/in/vishwarajchavan/",
        image: getImagePath("vishwaraj.jpg")
      },
      {
        name: "Ms Shraddha Agarwal",
        current: "Currently MBA student at Indian Institute of Management Calcutta",
        linkedIn: "https://in.linkedin.com/in/shraddha-agarwal-98743320a",
        image: getImagePath("shraddha.jpg")
      },
      {
        name: "Ms. Archana Yadav",
        current: "Currently Graduate Researcher at Stowers Institute for Medical Research USA",
        github: "https://github.com/A-2809",
        image: getImagePath("archana.jpg")
      },
      {
        name: "Mr. Hritik Bana",
        current: "Currently pursuing PhD in Economics at Rice University USA",
        linkedIn: "https://in.linkedin.com/in/hritik-bana",
        image: getImagePath("hritik.jpg")
      },
      {
        name: "Mr. Anirban Dutta",
        current: "",
        linkedIn: "https://in.linkedin.com/in/anirban-dutta",
        image: getImagePath("anirban.jpg")
      }
    ]
  };

  return (
    <div className="pt-32 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">Meet Our Team</h1>
        
        {/* Photo Carousel */}
        <div className="mb-16">
          <PhotoCarousel />
        </div>

        {/* Supervisor Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Supervisor</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src={teamMembers.supervisor.image} 
                  alt={teamMembers.supervisor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  <a 
                    href={teamMembers.supervisor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:text-blue-600 transition-colors"
                  >
                    {teamMembers.supervisor.name}
                  </a>
                </h3>
                <p className="text-gray-600">{teamMembers.supervisor.role}</p>
                <p className="text-gray-600">{teamMembers.supervisor.specialization}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <a 
                    href={`mailto:${teamMembers.supervisor.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Email
                  </a>
                  {teamMembers.supervisor.scholarProfile && (
                    <a 
                      href={teamMembers.supervisor.scholarProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Google Scholar
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PhD Scholars Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">PhD Scholars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.phdScholars.map((scholar, index) => (
              <motion.div
                key={scholar.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={scholar.image} 
                      alt={scholar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{scholar.name}</h3>
                  <p className="text-gray-600 mb-2">{scholar.research}</p>
                  <div className="flex gap-4">
                    <a 
                      href={`mailto:${scholar.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Email
                    </a>
                    {scholar.scholarProfile && (
                      <a 
                        href={scholar.scholarProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Scholar
                      </a>
                    )}
                    {scholar.linkedIn && (
                      <a 
                        href={scholar.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Master's Students Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Master's Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.mastersStudents.map((student, index) => (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={student.image} 
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{student.name}</h3>
                  <p className="text-gray-600 mb-2">{student.research}</p>
                  <div className="flex gap-4">
                    <a 
                      href={`mailto:${student.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Email
                    </a>
                    {student.scholarProfile && (
                      <a 
                        href={student.scholarProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Scholar
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Alumni Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-8">Alumni</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.alumni.map((alum, index) => (
              <motion.div
                key={alum.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={alum.image} 
                      alt={alum.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{alum.name}</h3>
                  <p className="text-gray-600 mb-2">{alum.current}</p>
                  <div className="flex gap-4">
                    {alum.linkedIn && (
                      <a 
                        href={alum.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        LinkedIn
                      </a>
                    )}
                    {alum.github && (
                      <a 
                        href={alum.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
