import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaChevronDown } from 'react-icons/fa';

export default function Timeline({ experiences }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 w-8 h-8 bg-teal-600 dark:bg-teal-500 rounded-full flex items-center justify-center">
              <FaBriefcase className="text-white text-sm" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div
                className="cursor-pointer"
                onClick={() => setExpandedId(expandedId === index ? null : index)}
                data-test-id={`timeline-toggle-${index}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-medium text-gray-900 dark:text-white">{exp.title}</h4>
                  <motion.div
                    animate={{ rotate: expandedId === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown className="text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {exp.company} • {exp.period} • {exp.location}
                </p>
              </div>

              <AnimatePresence>
                {expandedId === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
