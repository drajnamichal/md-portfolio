import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaChevronDown, FaLightbulb, FaTools, FaChartLine } from 'react-icons/fa';

export default function CaseStudy({ study }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sections = [
    { icon: FaLightbulb, title: 'Challenge', content: study.challenge },
    { icon: FaTools, title: 'Solution', content: study.solution },
    { icon: FaChartLine, title: 'Results', content: study.results },
  ];

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative h-64 w-full">
        <Image src={study.image} alt={study.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h3 className="text-2xl font-semibold mb-2">{study.title}</h3>
            <p className="text-gray-200">{study.client}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h4 className="text-xl font-medium text-gray-900 dark:text-white">Project Details</h4>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <FaChevronDown className="text-gray-500 dark:text-gray-400" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-8">
                {sections.map(({ icon: Icon, title, content }, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                        <Icon className="text-teal-600 dark:text-teal-400" />
                      </div>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {title}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300">{content}</p>
                    </div>
                  </div>
                ))}

                {study.metrics && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {study.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center"
                      >
                        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
