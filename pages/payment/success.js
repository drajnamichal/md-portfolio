/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function PaymentSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (session_id) {
      // Store session ID to localStorage for future access verification
      localStorage.setItem('stripe_session_id', session_id);

      // Get email from localStorage if it was stored during checkout
      const storedEmail = localStorage.getItem('course_email');
      if (storedEmail) {
        setEmail(storedEmail);
      }

      // Simulate a brief loading period
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [session_id]);

  const handleAccessCourse = () => {
    router.push('/course/playwright-mcp');
  };

  return (
    <Layout
      title="Payment Successful | Michal Drajna"
      description="Your payment was successful. Access your course now."
    >
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <FaSpinner className="text-6xl text-teal-600 animate-spin mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">Processing your payment...</p>
          </div>
        ) : (
          <>
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Thank you for your purchase! You now have lifetime access to the course.
            </p>

            <div className="bg-teal-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
                What's Next?
              </h2>
              <ul className="text-left space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span>Check your email for a receipt and access instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span>Access the course immediately using the button below</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span>
                    Save your email ({email || 'the one you used'}) to access the course in the
                    future
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleAccessCourse}
              className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors text-lg font-semibold mb-4"
            >
              Access Your Course Now
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can access this course anytime by visiting the course page with your email.
            </p>
          </>
        )}
      </div>
    </Layout>
  );
}
