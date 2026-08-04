// src/pages/Courses.tsx
// Landing page listing all available courses. Each card links to the
// course's own page. As of now only Advanced NLP is offered.
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { courses } from '../data/courses';

export default function Courses() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Courses
          </span>
        </motion.h1>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto">
          Courses offered and mentored by the Biomedical Data Science Lab
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/courses/${course.slug}`}
                className="group block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-blue-100 hover:border-blue-300 overflow-hidden h-full"
              >
                <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                <div className="p-8">
                  <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform w-fit">
                    <GraduationCap size={36} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h2>
                  {course.shortDescription && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {course.shortDescription}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    {course.code && (
                      <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {course.code}
                      </span>
                    )}
                    {course.semester && (
                      <span className="bg-cyan-50 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {course.semester}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-blue-600 hover:text-cyan-600 font-semibold transition-colors">
                    View Course →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
