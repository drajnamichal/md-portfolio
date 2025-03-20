import Typewriter from 'typewriter-effect';

export default function Footer() {
  return (
    <footer className="py-16 mt-16 text-center text-gray-400 dark:text-gray-500">
      <div className="space-y-4">
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
        <p>
          Copyright © <span className="text-gray-400 dark:text-gray-500">2025</span>
        </p>
      </div>
    </footer>
  );
} 