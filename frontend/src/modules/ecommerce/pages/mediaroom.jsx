import React from 'react';

const PUBLISHERS = [
  { id: 1, name: 'Daily Hunt', logo: '/images/daily.png', 
    link: 'https://m.dailyhunt.in/news/india/english/republic+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/quality+community+and+change+fourstep+corporate+llp+reshapes+the+indian+fmcg+scenery-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_066e8c30bb5011ee9567f933d6a1f1f3?sm=Y' },
  { id: 2, name: 'Republic News India', logo: '/images/republic.png', 
    link: 'https://republicnewsindia.com/quality-community-and-change-fourstep-corporate-llp-reshapes-the-indian-fmcg-scenery/' },
  { id: 3, name: 'The Indian Bulletin', logo: '/images/indian.png', 
    link: 'https://theindianbulletin.com/quality-community-and-change-fourstep-corporate-llp-reshapes-the-indian-fmcg-scenery/' },
  { id: 4, name: 'Abhyuday Times', logo: '/images/abhuday.png', 
    link: 'https://abhyudaytimes.com/quality-community-and-change-fourstep-corporate-llp-reshapes-the-indian-fmcg-scenery/' },
  { id: 5, name: 'Indian Sentinel', logo: '/images/indiansen.png', 
    link: 'https://indiansentinel.in/quality-community-and-change-fourstep-corporate-llp-reshapes-the-indian-fmcg-scenery/'},
  { id: 6, name: 'Bharat Herald', logo: '/images/bharat.png', 
    link: 'https://bharatherald.com/quality-community-and-change-fourstep-corporate-llp-reshapes-the-indian-fmcg-scenery/' },
  { id: 7, name: 'India Thrive', logo: '/images/india.png',
    link: 'https://indiathrive.com/quality-community-and-change-fourstep-corporate-llp-reshapes-the-indian-fmcg-scenery/' },
];


const PublisherCard = ({ name, logo, link }) => {
  
  // Handle click to open in new tab
  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer group flex flex-col bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
    >
      {/* Logo Section */}
      <div className="h-40 w-full flex items-center justify-center p-6 bg-white">
        <img 
          src={logo} 
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150x80?text=No+Image';
          }}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text Section */}
      <div className="py-4 px-2 text-center border-t border-gray-100">
        <span className="text-[15px] font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
          {name}
        </span>
      </div>
    </div>
  );
};

// 3. The Main Component
const Mediaroom = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Grid Layout: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PUBLISHERS.map((publisher) => (
            <PublisherCard 
              key={publisher.id}
              name={publisher.name}
              logo={publisher.logo}
              link={publisher.link}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Mediaroom;