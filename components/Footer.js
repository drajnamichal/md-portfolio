import Typewriter from 'typewriter-effect';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  return (
    <div className="text-gray-400 dark:text-gray-500">
      <div className="space-y-2">
        <div className="text-sm font-burtons h-6 flex justify-center items-center">
          <Typewriter
            options={{
              strings: ["developedbymichal"],
              autoStart: true,
              loop: true,
              delay: 100,
              deleteSpeed: 100,
            }}
          />
        </div>
        <div className="flex flex-col items-center space-y-1">
          <p className="text-sm">
            Copyright © <span className="text-gray-400 dark:text-gray-500">2025</span>
          </p>
          <VisitorCounter />
        </div>
      </div>
    </div>
  );
} 