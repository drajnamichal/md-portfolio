/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Layout from "../components/Layout";
import skillmea from '../public/skillmea.jpg';
import advanced from '../public/advanced.jpg';
import { AiFillStar } from 'react-icons/ai';
import { FaUserGraduate, FaQuoteLeft } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/ReviewSlider.module.css';
import AnimatedCounter from '../components/AnimatedCounter';

export default function Courses() {
  const courses = [
    {
      title: "Test Automation in Playwright",
      description: "Learn the fundamentals of test automation using Playwright. This comprehensive course covers everything from basic concepts to advanced testing techniques.",
      image: skillmea,
      link: "https://skillmea.sk/online-kurzy/test-automatizacia-playwright",
      topics: [
        "Introduction to Playwright",
        "Setting up your first test",
        "Selectors and element interactions",
        "Test organization and best practices",
        "Handling different scenarios",
        "Reporting and CI/CD integration"
      ]
    },
    {
      title: "Advanced Playwright",
      description: "Take your Playwright skills to the next level. This advanced course covers complex testing scenarios and professional automation techniques.",
      image: advanced,
      link: "https://skillmea.sk/online-kurzy/playwright-pre-pokrocilych",
      topics: [
        "Advanced test patterns",
        "API testing with Playwright",
        "Visual testing strategies",
        "Performance testing",
        "Custom test reporters",
        "Advanced automation patterns"
      ]
    }
  ];

  const reviews = [
    {
      text: "Kurz byl srozumitelně vysvětlen a celkově hodnotím plným počtem",
      stars: 5
    },
    {
      text: "Super kurz. Simultánne som si vytvárala vlastne automatické testy a upravovala a spoznávala nove funkcie a všetko funguje ako ma!",
      stars: 5
    },
    {
      text: "Zatiaľ najlepší kurz, aký som na Skillmea prešiel a kvalitou mi pripadal porovnateľný s tými lepšími zahraničnými. Plánujem si niektoré témy zopakovať a prejsť na kurz pre pokročilých, na ktorý sa už teším.",
      stars: 5
    },
    {
      text: "Kurz má vynikajúci obsah a praktické projekty. Oceňujem popis každej lekcie a Github repozitár. Odporúčam všetkým, ktorí chcú zdokonaliť svoje schopnosti v testovaní webových aplikácií.",
      stars: 5
    },
    {
      text: "Nato ze som nemal ziadne skusenosti tento pan mi vysvvetlil vsetko super",
      stars: 5
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Layout 
      title="Playwright Testing Courses | Michal Drajna"
      description="Learn test automation with Playwright through comprehensive online courses. From beginner to advanced levels, master modern testing techniques with practical examples."
      image="/skillmea.jpg"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
          Online Courses
        </h2>
        <p className="text-md py-5 leading-8 text-gray-800 dark:text-white md:text-xl max-w-2xl mx-auto">
          Master test automation with my comprehensive Playwright courses. From fundamentals to advanced techniques, learn everything you need to become a testing expert.
        </p>
      </div>

      <div className="flex justify-center items-center gap-8 mb-16">
        <div className="text-center">
          <div className="flex items-center justify-center text-4xl text-teal-600 mb-2">
            <FaUserGraduate className="mr-2" />
            <AnimatedCounter value="800" suffix="+" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">Students Trained</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-4xl text-teal-600 mb-2">
            <AiFillStar className="mr-2" />
            <AnimatedCounter value="5" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
        </div>
      </div>

      <div className="mb-16 px-4">
        <h3 className="text-3xl text-center text-teal-600 font-medium mb-8">What Students Say</h3>
        <div className="max-w-6xl mx-auto">
          <Slider {...sliderSettings} className={styles.reviewSlider}>
            {reviews.map((review, index) => (
              <div key={index} className="px-3">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full">
                  <div className="text-teal-600 mb-3">
                    <FaQuoteLeft className="text-2xl opacity-50" />
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(review.stars)].map((_, i) => (
                      <AiFillStar key={i} className="text-lg" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic text-sm">
                    "{review.text}"
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-6xl mx-auto px-4">
        {courses.map((course, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
          >
            <a href={course.link} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
              <div className="relative aspect-video w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                  priority={true}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {course.description}
                </p>
                <div className="mt-auto">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    What you'll learn:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {course.topics.map((topic, topicIndex) => (
                      <li 
                        key={topicIndex}
                        className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                      >
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="inline-block bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition-colors">
                    Start Learning
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
} 