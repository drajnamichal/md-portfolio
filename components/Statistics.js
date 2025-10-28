import { FaUserGraduate, FaLaptopCode, FaStar, FaBuilding } from 'react-icons/fa';
import AnimatedCounter from './AnimatedCounter';
import { motion } from 'framer-motion';

export default function Statistics() {
  const stats = [
    {
      icon: FaUserGraduate,
      value: '1200',
      suffix: '+',
      label: 'Students Trained',
      color: 'text-blue-500',
    },
    {
      icon: FaLaptopCode,
      value: '2',
      suffix: '',
      label: 'Courses Created',
      color: 'text-purple-500',
    },
    {
      icon: FaStar,
      value: '5',
      prefix: '',
      label: 'Course Rating',
      color: 'text-yellow-500',
    },
    {
      icon: FaBuilding,
      value: '10',
      suffix: '+',
      label: 'Companies Served',
      color: 'text-green-500',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="py-16 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Impact & Achievement
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <stat.icon className={`text-4xl mb-4 ${stat.color}`} />
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
