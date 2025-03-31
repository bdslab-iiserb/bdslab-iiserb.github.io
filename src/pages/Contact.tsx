import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// No image paths to update in this component

export default function Contact() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Dr. Tanmay Basu</h2>
            <p className="text-lg font-semibold mb-6">Assistant Professor</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="text-gray-600">
                  Department of Data Science and Engineering<br />
                  Indian Institute of Science Education and Research Bhopal<br />
                  Indore Bypass Road, Bhauri<br />
                  462066, MP, India
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-gray-600">(+91) 755-269-2683 (Office)</p>
                  <p className="text-gray-600">(+91) 755-269-2684 (Lab)</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <a 
                  href="mailto:tanmay@iiserb.ac.in"
                  className="text-blue-600 hover:text-blue-800"
                >
                  tanmay@iiserb.ac.in
                </a>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-2">Office Hours</p>
                  <p className="text-gray-600">Monday - Friday: 9 AM - 5 PM</p>
                  <p className="text-gray-600">Saturday & Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Location</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.791351867835!2d77.27398387517927!3d23.28702994180217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c60d9f8872aef%3A0x9b99241b1431032!2sIndian%20Institute%20of%20Science%20Education%20and%20Research%20Bhopal%20(IISERB)!5e0!3m2!1sen!2sin!4v1741268660854!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}