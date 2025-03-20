import { motion } from 'framer-motion';

export default function SkillBar({ skill, level, icon: Icon }) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {Icon && <Icon className="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" />}
        <span className="text-gray-800 dark:text-gray-200 font-medium">{skill}</span>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-teal-600 dark:bg-teal-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
} 