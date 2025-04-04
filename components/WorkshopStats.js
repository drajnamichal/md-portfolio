import { motion } from 'framer-motion';
import { FaUsers, FaStar, FaGraduationCap, FaBuilding } from 'react-icons/fa';
import AnimatedCounter from './AnimatedCounter';

export default function WorkshopStats({ stats }) {
  const defaultStats = {
    participantCount: '10+',
    satisfactionRate: '4.8/5',
    workshopsDelivered: '1',
    companiesServed: '1',
  };

  const finalStats = { ...defaultStats, ...stats };

  const statItems = [
    {
      icon: FaUsers,
      value: '10',
      suffix: '+',
      label: 'Participants Trained',
      isAnimated: true,
    },
    {
      icon: FaStar,
      value: finalStats.satisfactionRate,
      label: 'Satisfaction Rate',
    },
    {
      icon: FaGraduationCap,
      value: finalStats.workshopsDelivered,
      label: 'Workshops Delivered',
    },
    {
      icon: FaBuilding,
      value: finalStats.companiesServed,
      label: 'Companies Served',
    },
  ];

  return (
    <div className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mx-auto w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
              <item.icon className="text-xl text-teal-600 dark:text-teal-400" />
            </div>
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              {item.isAnimated ? (
                <AnimatedCounter value={item.value} suffix={item.suffix || ''} duration={2} />
              ) : (
                <span>{item.value}</span>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {stats?.testimonialHighlight && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-xl italic text-gray-700 dark:text-gray-300">
            &ldquo;{stats.testimonialHighlight.text}&rdquo;
          </blockquote>
          <div className="mt-4 text-gray-600 dark:text-gray-400">
            {stats.testimonialHighlight.author}
          </div>
        </motion.div>
      )}
    </div>
  );
}
