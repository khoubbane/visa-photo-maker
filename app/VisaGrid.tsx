'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VisaGrid({ visaData }: { visaData: any[] }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Ch7al mn blad f kol page (t9der tbdelha)

  // Mli y-tapez chi 7aja f search, rje3 l-page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // L-Boldan li m-filtryin b l-mots clés
  const filteredVisas = visaData.filter(visa => 
    visa.title.toLowerCase().includes(search.toLowerCase()) || 
    visa.country.toLowerCase().includes(search.toLowerCase())
  );

  // L-Mantig dyal l-Pagination
  const totalPages = Math.ceil(filteredVisas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVisas.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {currentItems.length > 0 ? (
          currentItems.map((visa) => (
            <Link 
              key={visa.country} 
              href={`/${visa.country}-visa-photo`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-200">
                {/* Drapo mn FlagCDN b Lazy Loading bach mayt9elch */}
                <img 
                  src={`https://flagcdn.com/w80/${visa.iso}.png`} 
                  alt={`${visa.title} flag`}
                  loading="lazy"
                  className="w-10 object-cover"
                />
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

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
          
          <span className="text-gray-600 dark:text-gray-400 px-4">
            Page <span className="font-bold">{currentPage}</span> of {totalPages}
          </span>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
