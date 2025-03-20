import { useState, useEffect } from 'react';

const recommendations = [
  {
    name: "Tomáš Piňos",
    title: "QA Engineer",
    date: "October 13, 2023",
    relationship: "worked with Michal on the same team",
    text: "As a former colleague of Michal's from Currys, I must confirm his strong skills in QA engineering, particularly in the area of automation using Playwright. What sets Michal apart is not just his technical expertise, but also his willingness to help others. He's always ready to assist and share his knowledge, making him a valuable team member and a pleasure to work with. Overall, Michal's expertise in automation, proficiency with Playwright, and commitment to modern testing principles make him an indispensable asset to our QA team. His contributions have consistently enhanced our product's reliability and quality."
  },
  {
    name: "Erik Marki",
    title: "Motto",
    date: "May 16, 2023",
    relationship: "worked with Michal on the same team",
    text: "I had the pleasure of working with Michal at Currys, where we were part of the same team. Michal is a highly skilled and dedicated QA Engineer who consistently delivers quality work. He demonstrates a strong commitment to his role and continuously seeks opportunities for growth and learning in the field of software testing, with a particular focus on Automation Testing. Michal's effectiveness, determination, and valuable contributions make him a true professional. I highly recommend Michal to any team looking for a talented and focused QA Engineer."
  },
  {
    name: "Jozef Salanci",
    title: "Test Automation Engineer at Visma Labs",
    date: "April 18, 2023",
    relationship: "worked with Michal on the same team",
    text: "I had the pleasure of working with Michal during our time together at GlobalLogic. As a QA Engineer, Michal consistently demonstrated a high level of technical proficiency and an excellent eye for detail. He has an impressive ability to identify potential issues and provide actionable feedback to the development team, which proved invaluable in ensuring the quality of products. Michal is always willing to offer support and advice to his colleagues. He's a pleasure to work with, and I would highly recommend him to anyone seeking a talented and dedicated QA Engineer to join their team."
  },
  {
    name: "Martin Podborský",
    title: "Engineering Manager | Bloomreach & Consultant | FasterFish s.r.o.",
    date: "March 3, 2023",
    relationship: "managed Michal directly",
    text: "I appreciate Michal for his productivity, profesionalism and goodwill. I see Michal as a true profesional and master of his craft. Michal is very effective, systematic and determined to get his job done. He's always on a hunt to learn, watch new trends and grow his already significant skillset in the field of software engineering, especially Automation Testing. I remember that Michal is not talking much, but when he does it's always to the point and valuable."
  }
];

export default function Recommendations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
      <div className="max-w-3xl mx-auto">
        <div 
          className="transition-opacity duration-500"
          key={currentIndex}
        >
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{recommendations[currentIndex].name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{recommendations[currentIndex].title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {recommendations[currentIndex].date}, {recommendations[currentIndex].relationship}
            </p>
          </div>
          <blockquote className="text-gray-800 dark:text-gray-200 text-center italic">
            "{recommendations[currentIndex].text}"
          </blockquote>
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {recommendations.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-teal-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 