// src/pages/Blog.tsx (or your equivalent page component)
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogPost from '../components/BlogPost';
import { blogPosts } from '../data/blogData';

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center mb-4 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Research
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover our cutting-edge research projects and breakthroughs in medical AI and image analysis.
          Click on any project to explore presentations and video demonstrations.
        </motion.p>

        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.4 }}
            >
              <BlogPost
                title={post.title}
                authors={post.authors}
                abstract={post.abstract}
                presentationImageFolderName={post.presentationImageFolderName}
                presentationNumPages={post.presentationNumPages}
                presentationCaption={post.presentationCaption}
                videoUrl={post.videoUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}