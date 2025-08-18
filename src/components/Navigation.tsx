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

  const getActiveStyle = (tabId: string) => {
    switch(tabId) {
      case 'home': return "text-white bg-gradient-to-br from-primary to-secondary shadow-lg";
      case 'search': return "text-white bg-gradient-to-br from-sage to-gold shadow-lg";
      case 'map': return "text-white bg-gradient-to-br from-secondary to-lavender shadow-lg";
      case 'favorites': return "text-white bg-gradient-to-br from-accent to-rose shadow-lg";
      default: return "text-primary bg-primary/10";
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-lavender/30 z-50">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 transform hover:scale-105",
              activeTab === id 
                ? getActiveStyle(id)
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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