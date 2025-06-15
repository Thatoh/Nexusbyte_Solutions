import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const DomainSearch: React.FC = () => {
  const [domainName, setDomainName] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<'available' | 'taken' | 'error' | null>(null);
  
  const [suggestedDomains, setSuggestedDomains] = useState<{ name: string, tld: string }[]>([]);
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

    if (isAvailable) {
      setSearchResult(`Congratulations! "${currentDomainToSearch}" is available.`);
      setAvailabilityStatus('available');
    } else {
      setSearchResult(`Sorry, "${currentDomainToSearch}" is already taken. Try another?`);
      setAvailabilityStatus('taken');
    }
    setIsSearching(false);

  }, []);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(domainName);
  };

  const handleSuggestionClick = (suggestion: { name: string, tld: string }) => {
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
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {searchResult && (
          <p className={`mb-4 text-xl font-medium ${getResultTextColor()}`}>
            {searchResult}
          </p>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-8">
          <a href="#" className="text-sm font-semibold text-white hover:underline">
            Register a Domain
          </a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-sm font-semibold text-white hover:underline">
            Transfer a Domain
          </a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-sm font-semibold text-white hover:underline">
            Explore TLDs
          </a>
        </div>

        {isFetchingSuggestions && (
          <div className="flex justify-center items-center mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nexusbyte-accent-green"></div>
            <p className="ml-3 text-gray-200">Nova is thinking...</p>
          </div>
        )}

        {suggestionsError && (
          <p className="mt-6 text-yellow-400">{suggestionsError}</p>
        )}

        {suggestedDomains.length > 0 && (
          <div className="mt-10 w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Nova's Suggestions For You</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedDomains.map((s, index) => (
                <li 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-lg border border-white/20 text-left transition-all hover:bg-white/20 hover:border-white/30 cursor-pointer"
                  onClick={() => handleSuggestionClick(s)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg text-white">{s.name}<span className="text-nexusbyte-accent-green">{s.tld}</span></p>
                      <p className="text-sm text-gray-300">Click to search this domain</p>
                    </div>
                    <span className="text-lg text-green-400 font-semibold">✓</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {!isFetchingSuggestions && suggestedDomains.length === 0 && availabilityStatus === 'taken' && (
          <div className="mt-8 text-center">
            <p className="text-gray-300">Looks like Nova came up empty. Try a different search term for better suggestions!</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default DomainSearch;