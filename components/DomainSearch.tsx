<<<<<<< HEAD


import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { generateDomainSuggestions } from '../services/geminiService';
import { SuggestedDomain } from '../types';
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93

const DomainSearch: React.FC = () => {
  const [domainName, setDomainName] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
<<<<<<< HEAD
  const [availabilityStatus, setAvailabilityStatus] = useState<'available' | 'taken' | 'error' | null>(null);
  
  const [suggestedDomains, setSuggestedDomains] = useState<SuggestedDomain[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);

  const videoUrl = "https://videos.pexels.com/video-files/5981045/5981045-hd_1920_1080_25fps.mp4"; // Data center video

  const handleSearch = useCallback(async (currentDomainToSearch: string) => {
    if (!currentDomainToSearch.trim()) {
      setSearchResult('Please enter a domain name.');
      setAvailabilityStatus('error');
      setSuggestedDomains([]);
      setSuggestionsError(null);
      return;
    }

    setIsSearching(true);
    setAvailabilityStatus(null);
    setSearchResult(`Searching for ${currentDomainToSearch}...`);
    setSuggestedDomains([]); // Clear previous suggestions
    setSuggestionsError(null);


    // Simulate API call for primary domain
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    const isAvailable = Math.random() > 0.5;
    let currentAvailabilityStatusText: 'available' | 'taken';

    if (isAvailable) {
      setSearchResult(`Congratulations! "${currentDomainToSearch}" is available.`);
      setAvailabilityStatus('available');
      currentAvailabilityStatusText = 'available';
    } else {
      setSearchResult(`Sorry, "${currentDomainToSearch}" is already taken. Try another?`);
      setAvailabilityStatus('taken');
      currentAvailabilityStatusText = 'taken';
    }
    setIsSearching(false);

    // Fetch AI suggestions
    setIsFetchingSuggestions(true);
    try {
      const suggestions = await generateDomainSuggestions(currentDomainToSearch, currentAvailabilityStatusText);
      if (suggestions) {
        setSuggestedDomains(suggestions);
        setSuggestionsError(null);
      } else {
        setSuggestedDomains([]);
        setSuggestionsError("Nova couldn't fetch suggestions this time. Try again?");
      }
    } catch (error) {
      console.error("Error fetching domain suggestions in component:", error);
      setSuggestedDomains([]);
      setSuggestionsError("An error occurred while fetching suggestions.");
    } finally {
      setIsFetchingSuggestions(false);
    }
  }, []);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(domainName);
  };

  const handleSuggestionClick = (suggestion: SuggestedDomain) => {
    const fullSuggestedDomain = `${suggestion.name}${suggestion.tld}`;
    setDomainName(fullSuggestedDomain); // Update input field
    handleSearch(fullSuggestedDomain); // Trigger search for this suggestion
  };
  
  const getResultTextColor = () => {
    if (availabilityStatus === 'available') return 'text-green-400';
    if (availabilityStatus === 'taken') return 'text-red-400';
    if (availabilityStatus === 'error') return 'text-yellow-400';
    return 'text-gray-100'; // Default for "Searching..."
  };


  return (
    <section className="relative w-full h-[1800px] py-12 flex items-center justify-center overflow-hidden">
      <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          poster="https://picsum.photos/seed/webhosting_poster/1920/1080"
      >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>

      <div className="relative z-20 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Find Your Perfect Domain
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          Start your online journey with a unique domain name. Powered by Nova AI suggestions.
        </p>
        
        <form onSubmit={handleSubmitForm} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={domainName}
            onChange={(e) => {
              setDomainName(e.target.value);
              // Optionally clear results on new typing
              // setSearchResult(null); 
              // setAvailabilityStatus(null);
              // setSuggestedDomains([]);
            }}
            placeholder="e.g., myawesomeidea.com"
            className="flex-grow px-5 py-3.5 text-base text-gray-900 placeholder-gray-500 bg-white/95 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nexusbyte-accent-green/80 transition-shadow shadow-sm"
            disabled={isSearching || isFetchingSuggestions}
            aria-label="Desired domain name"
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-nexusbyte-accent-green text-nexusbyte-primary-dark font-semibold rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
            disabled={isSearching || isFetchingSuggestions}
=======

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
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {searchResult && (
<<<<<<< HEAD
          <p className={`mb-4 text-xl font-medium ${getResultTextColor()}`}>
=======
          <p className={`mb-8 text-md font-medium ${searchResult.includes('Congratulations') ? 'text-green-600' : searchResult.includes('Sorry') ? 'text-red-600' : 'text-nexusbyte-primary-dark'}`}>
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
            {searchResult}
          </p>
        )}

<<<<<<< HEAD
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-8">
          <a href="#" className="text-sm font-semibold text-white hover:underline">
            Register a Domain
          </a>
          <Link to="/signup" className="text-sm font-semibold text-white hover:underline">
            Sign Up
          </Link>
          <Link to="/signin" className="text-sm font-semibold text-white hover:underline">
            Customer Login
          </Link>
        </div>

        {isFetchingSuggestions && (
          <div className="mt-6 text-center">
            <p className="text-gray-300 italic text-md">Nova is searching for creative alternatives...</p>
            {/* Optional: Add a spinner SVG here */}
          </div>
        )}

        {suggestionsError && !isFetchingSuggestions && (
           <div className="mt-6 text-center">
            <p className="text-yellow-400 text-md">{suggestionsError}</p>
          </div>
        )}

        {!isFetchingSuggestions && suggestedDomains.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-500/50">
            <h3 className="text-2xl font-semibold text-white mb-6">AI-Powered Suggestions:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedDomains.map((suggestion, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-md text-left flex flex-col justify-between">
                  <div>
                    <p className="text-lg font-medium text-white break-all">
                      {suggestion.name}{suggestion.tld}
                    </p>
                    {/* Placeholder for future status/price */}
                    {/* <p className="text-xs text-green-300 mt-1">Likely available</p> */}
                  </div>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isSearching || isFetchingSuggestions}
                    className="mt-3 w-full px-4 py-2 text-sm font-semibold bg-lime-500 text-gray-900 rounded-md hover:bg-lime-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Check this domain
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

=======
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
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
      </div>
    </section>
  );
};

export default DomainSearch;