import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Consultations() {
  return (
    <Layout
      title="Consultations - Michal Drajna"
      description="Professional QA and test automation consultation services offered by Michal Drajna"
    >
      <div className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Services I Offer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Professional QA and Test Automation Services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Test Automation Strategy
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Development of comprehensive test automation strategies tailored to your project
              needs.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Playwright Implementation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Expert implementation of Playwright test automation framework for web applications.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              CI/CD Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Integration of automated tests into CI/CD pipelines for continuous quality assurance.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Code Review & Optimization
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Review and optimization of existing test automation code for better maintainability
              and performance.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Team Training
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive training for teams on test automation best practices and Playwright
              implementation.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Quality Assurance Consulting
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Expert advice on QA processes, tools, and methodologies to improve your testing
              workflow.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
