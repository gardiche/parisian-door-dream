import { Door } from '@/types/door';
import { Card } from '@/components/ui/card';
import { Heart, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DoorCardProps {
  door: Door;
  onToggleFavorite: (id: string) => void;
  onCardClick: (door: Door) => void;
}

export function DoorCard({ door, onToggleFavorite, onCardClick }: DoorCardProps) {
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-card"
      onClick={() => onCardClick(door)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={door.imageUrl} 
          alt={`Door at ${door.location}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(door.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors",
              door.isFavorite ? "fill-red-500 text-red-500" : "text-white"
            )} 
          />
        </button>

        {/* Hover Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{door.neighborhood}</span>
          </div>
          <p className="text-xs opacity-90 mt-1">{door.style} • {door.color} {door.material}</p>
        </div>
      </div>
    </Card>
  );
}