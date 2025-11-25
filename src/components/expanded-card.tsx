import React, { useState } from 'react';

// Fallback SVG sebagai data URL - tidak perlu network request
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23f3f4f6" width="400" height="500"/%3E%3Ctext fill="%239ca3af" font-family="system-ui" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Photo%3C/text%3E%3C/svg%3E';

// Types
interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface ExpandedCardProps {
  members: TeamMember[];
  className?: string;
  cardHeight?: string;
  minCardHeight?: string;
  gap?: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

// Loading Skeleton Component
const CardSkeleton: React.FC = () => (
  <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-200 animate-pulse">
    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-gray-300 to-gray-200" />
  </div>
);

// Empty State Component
const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="w-full h-full flex items-center justify-center">
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);

// Main Component
const ExpandedCard: React.FC<ExpandedCardProps> = ({
  members,
  className = '',
  cardHeight = '60vh',
  minCardHeight = '500px',
  gap = '1rem',
  isLoading = false,
  emptyMessage = 'Tidak ada data tim tersedia',
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Handle image error dengan prevention untuk infinite loop
  const handleImageError = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    // Hanya set fallback sekali untuk mencegah infinite loop
    if (!imageErrors.has(index)) {
      setImageErrors(prev => new Set(prev).add(index));
      e.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="flex w-full gap-3 md:gap-5"
          style={{ 
            height: cardHeight,
            minHeight: minCardHeight 
          }}
        >
          {[...Array(5)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!members || members.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="flex w-full"
          style={{ 
            height: cardHeight,
            minHeight: minCardHeight 
          }}
        >
          <EmptyState message={emptyMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div 
        className="flex w-full gap-3 md:gap-5"
        style={{ 
          height: cardHeight,
          minHeight: minCardHeight,
          gap: gap 
        }}
      >
        {members.map((member, index) => {
          const isActive = index === activeId;
          const { name, position, image } = member;
          
          return (
            <div
              key={`${member.name}-${index}`}
              className={`
                relative cursor-pointer rounded-none overflow-hidden
                transition-all ease-out
                ${isActive ? 'flex-[16] duration-300' : 'flex-5 duration-500'}
              `}
              onMouseEnter={() => setActiveId(index)}
              onMouseLeave={() => setActiveId(null)}
            >
              {/* Image - Full Container */}
              <div className="relative w-full h-full">
                <img
                  src={imageErrors.has(index) ? FALLBACK_IMAGE : image}
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(index, e)}
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Text Content - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div
                  className={`
                    transition-all duration-500
                    ${
                      activeId !== null
                        ? (isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')
                        : 'opacity-100 translate-y-0'
                    }
                  `}
                >
                  <p className="text-white text-xs md:text-sm font-medium mb-1 transition-all duration-500">
                    {position}
                  </p>
                  <h2 className="text-white font-bold text-base md:text-lg transition-all duration-500">
                    {name}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandedCard;