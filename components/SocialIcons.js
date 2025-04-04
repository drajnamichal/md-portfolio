import { AiFillFacebook, AiFillLinkedin, AiFillGithub, AiFillMail } from 'react-icons/ai';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    href: 'https://www.facebook.com/michaldrajna/',
    icon: AiFillFacebook,
    label: 'Facebook',
    color: '#1877f2',
  },
  {
    href: 'https://www.linkedin.com/in/michaldrajna-qa/',
    icon: AiFillLinkedin,
    label: 'LinkedIn',
    color: '#0077b5',
  },
  {
    href: 'https://github.com/drajnamichal',
    icon: AiFillGithub,
    label: 'GitHub',
    color: '#333',
  },
  {
    href: 'mailto:michal.drajna@gmail.com',
    icon: AiFillMail,
    label: 'Email',
    color: '#EA4335',
  },
];

export default function SocialIcons() {
  return (
    <div className="flex justify-center gap-8 py-3">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="cursor-pointer block p-3 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + index * 0.1,
            }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ zIndex: 20 }}
          >
            <Icon
              className="w-8 h-8 text-gray-600 dark:text-gray-300 transition-colors duration-200"
              style={{
                ':hover': {
                  color: social.color,
                },
              }}
            />
          </motion.a>
        );
      })}
    </div>
  );
}
