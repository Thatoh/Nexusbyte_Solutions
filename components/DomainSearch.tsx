import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DomainSearch: React.FC = () => {
  const [domainName, setDomainName] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) {
      setSearchResult('Please enter a domain name.');
      return;
    }
    setIsSearching(true);
    setSearchResult(`Searching for ${domainName}...`);
    setTimeout(() => {
        const isAvailable = Math.random() > 0.5;
        if(isAvailable) {
            setSearchResult(`Congratulations! ${domainName} is available.`);
        } else {
            setSearchResult(`Sorry, ${domainName} is already taken.`);
        }
        setIsSearching(false);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-nexusbyte-primary-dark mb-4">Find Your Perfect Domain</h2>
        <p className="text-lg text-gray-600 mb-8">Start your online journey with a unique domain name.</p>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            placeholder="Enter your desired domain name"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-nexusbyte-accent-green focus:border-transparent outline-none transition-shadow"
            disabled={isSearching}
          />
          <button
            type="submit"
            className="px-8 py-3 bg-nexusbyte-accent-green text-nexusbyte-primary-dark font-semibold rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {searchResult && (
          <p className={`mb-8 text-md font-medium ${searchResult.includes('Congratulations') ? 'text-green-600' : searchResult.includes('Sorry') ? 'text-red-600' : 'text-nexusbyte-primary-dark'}`}>
            {searchResult}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-nexusbyte-primary-dark text-white font-medium rounded-md hover:bg-opacity-90 transition-colors text-sm">
            Register a Domain
          </button>
          <Link
            to="/signup"
            className="px-6 py-3 border-2 border-nexusbyte-primary-dark text-nexusbyte-primary-dark font-medium rounded-md hover:bg-nexusbyte-primary-dark hover:text-white transition-colors text-sm"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="px-6 py-3 border-2 border-nexusbyte-accent-green text-nexusbyte-accent-green font-medium rounded-md hover:bg-nexusbyte-accent-green hover:text-nexusbyte-primary-dark transition-colors text-sm"
          >
            Customer Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DomainSearch;