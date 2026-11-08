import Link from 'next/link';
import { visaData } from '../data/visas';

export const metadata = {
  title: 'Free Visa & Passport Photo Maker Online | All Countries',
  description: 'Create perfect, compliant visa and passport photos for US, Schengen, UK, Canada, and 50+ countries. 100% Free, online, and high quality.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Free Visa & Passport <span className="text-blue-600">Photo Maker</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Select your destination country below. Our smart tool will automatically crop, format, and resize your photo to meet official government requirements in seconds.
        </p>
      </div>

      {/* Grid dyal l-Boldan */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visaData.map((visa) => (
            <Link 
              key={visa.country} 
              href={`/${visa.country}-visa-photo`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                {/* Iconn sghira (SVG) */}
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {visa.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {visa.width} x {visa.height} px
              </p>
            </Link>
          ))}
        </div>
      </div>
      
    </div>
  );
}
