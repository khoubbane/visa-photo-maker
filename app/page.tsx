import { visaData } from '../data/visas';
import VisaGrid from './VisaGrid';

export const metadata = {
  title: 'Free Visa & Passport Photo Maker Online | All Countries',
  description: 'Create perfect, compliant visa and passport photos for US, Schengen, UK, Canada, and 50+ countries. 100% Free, online, and high quality.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Free Visa & Passport <span className="text-blue-600">Photo Maker</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Select your destination country or search below. Our smart tool will automatically format and resize your photo to meet official requirements.
        </p>
      </div>

      {/* L-Grid w L-Search Bar */}
      <VisaGrid visaData={visaData} />
    </div>
  );
}
