import Typewriter from 'typewriter-effect';

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
        <p className="text-sm">
          Copyright © <span className="text-gray-400 dark:text-gray-500">2025</span>
        </p>
      </div>
    </div>
  );
} 