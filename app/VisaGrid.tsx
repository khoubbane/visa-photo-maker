'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VisaGrid({ visaData }: { visaData: any[] }) {
  const [search, setSearch] = useState('');
  
  const filteredVisas = visaData.filter(visa => 
    visa.title.toLowerCase().includes(search.toLowerCase()) || 
    visa.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm transition-all"
            placeholder="Search for a country (e.g., Canada, Japan, UK)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid dyal l-Boldan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVisas.length > 0 ? (
          filteredVisas.map((visa) => (
            <Link 
              key={visa.country} 
              href={`/${visa.country}-visa-photo`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
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
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400 text-lg">
            No country found matching "{search}".
          </div>
        )}
      </div>
    </div>
  );
}
