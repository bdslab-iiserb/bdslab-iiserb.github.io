import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// No image paths to update in this component

export default function Blog() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const posts = [
    {
      title: "Advances in Medical Image Analysis",
      date: "March 15, 2024",
      excerpt: "Recent developments in deep learning have revolutionized how we analyze medical images...",
      author: "Dr. Tanmay Basu"
    },
    {
      title: "NLP in Healthcare: Current Trends",
      date: "March 1, 2024",
      excerpt: "Natural Language Processing continues to transform healthcare data analysis...",
      author: "Prateek Sarangi"
    },
    {
      title: "The Future of AI in Clinical Diagnosis",
      date: "February 15, 2024",
      excerpt: "Artificial Intelligence is reshaping how we approach clinical diagnosis...",
      author: "Rasel Mondal"
    }
  ];

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">Latest Updates</h1>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
              <p className="text-gray-600">{post.excerpt}</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800">
                Read more →
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}