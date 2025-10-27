/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { FaTimesCircle } from 'react-icons/fa';

export default function PaymentCancel() {
  const router = useRouter();

  const handleRetry = () => {
    router.push('/courses');
  };

  return (
    <Layout title="Payment Cancelled | Michal Drajna" description="Your payment was cancelled.">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Payment Cancelled</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your payment was cancelled. No charges were made to your account.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you encountered any issues during checkout or have questions about the course, please
            don&apos;t hesitate to reach out.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRetry}
            className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors text-lg font-semibold"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-8 py-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-lg font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    </Layout>
  );
}
