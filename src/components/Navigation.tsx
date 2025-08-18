import { Home, Map, Heart, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-lg transition-colors",
              activeTab === id 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}