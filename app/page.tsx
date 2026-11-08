import Link from 'next/link';
import { visaData } from '../data/visas';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 dark:bg-gray-900">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Free Global Visa & Passport Photo Maker
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Choose your country below to auto-crop your photo to exact government requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {visaData.map((visa) => (
          <Link 
            key={visa.country} 
            href={`/${visa.country}-visa-photo`}
            className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">{visa.title}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {visa.width}x{visa.height} px
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}