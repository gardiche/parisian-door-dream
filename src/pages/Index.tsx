import { useState, useMemo } from 'react';
import { doors as initialDoors } from '@/data/doors';
import { Door, DoorMaterial, DoorColor, DoorStyle } from '@/types/door';
import { DoorCard } from '@/components/DoorCard';
import { SearchFilter } from '@/components/SearchFilter';
import { Navigation } from '@/components/Navigation';
import { DoorDetail } from '@/components/DoorDetail';
import { MapView } from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

const Index = () => {
  const [doors, setDoors] = useState<Door[]>(initialDoors);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDoor, setSelectedDoor] = useState<Door | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<DoorMaterial[]>([]);
  const [selectedColors, setSelectedColors] = useState<DoorColor[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<DoorStyle[]>([]);

  const filteredDoors = useMemo(() => {
    return doors.filter(door => {
      const matchesSearch = searchTerm === '' || 
        door.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        door.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMaterial = selectedMaterials.length === 0 || 
        selectedMaterials.includes(door.material as DoorMaterial);

      const matchesColor = selectedColors.length === 0 || 
        selectedColors.includes(door.color as DoorColor);

      const matchesStyle = selectedStyles.length === 0 || 
        selectedStyles.includes(door.style as DoorStyle);

      return matchesSearch && matchesMaterial && matchesColor && matchesStyle;
    });
  }, [doors, searchTerm, selectedMaterials, selectedColors, selectedStyles]);

  const favoriteDoors = doors.filter(door => door.isFavorite);

  const toggleFavorite = (id: string) => {
    setDoors(prev => prev.map(door => 
      door.id === id ? { ...door, isFavorite: !door.isFavorite } : door
    ));
  };

  const handleDoorClick = (door: Door) => {
    setSelectedDoor(door);
  };

  const handleClearFilters = () => {
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedStyles([]);
  };

  const toggleMaterial = (material: DoorMaterial) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const toggleColor = (color: DoorColor) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleStyle = (style: DoorStyle) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  // Show door detail view
  if (selectedDoor) {
    const updatedDoor = doors.find(d => d.id === selectedDoor.id) || selectedDoor;
    return (
      <DoorDetail 
        door={updatedDoor}
        onBack={() => setSelectedDoor(null)}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  const renderContent = () => {
    const doorsToShow = activeTab === 'favorites' ? favoriteDoors : filteredDoors;

    switch (activeTab) {
      case 'map':
        return (
          <MapView 
            doors={doors}
            onDoorClick={handleDoorClick}
          />
        );

      case 'search':
        return (
          <div className="min-h-screen bg-background p-4 pb-20">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Search Doors</h1>
                <p className="text-muted-foreground">Find the perfect Parisian door</p>
              </div>

              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedMaterials={selectedMaterials}
                selectedColors={selectedColors}
                selectedStyles={selectedStyles}
                onMaterialToggle={toggleMaterial}
                onColorToggle={toggleColor}
                onStyleToggle={toggleStyle}
                onClearFilters={handleClearFilters}
              />

              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {doorsToShow.length} door{doorsToShow.length !== 1 ? 's' : ''} found
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {doorsToShow.map((door) => (
                    <DoorCard
                      key={door.id}
                      door={door}
                      onToggleFavorite={toggleFavorite}
                      onCardClick={handleDoorClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="min-h-screen bg-background p-4 pb-20">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">My Favorites</h1>
                <p className="text-muted-foreground">
                  {favoriteDoors.length} door{favoriteDoors.length !== 1 ? 's' : ''} you love
                </p>
              </div>

              {favoriteDoors.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                    <Heart className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">Start exploring and save doors you love!</p>
                  <Button onClick={() => setActiveTab('home')} className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Explore Doors
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {favoriteDoors.map((door) => (
                    <DoorCard
                      key={door.id}
                      door={door}
                      onToggleFavorite={toggleFavorite}
                      onCardClick={handleDoorClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default: // home
        return (
          <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4 pb-20">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  My Parisian Doors
                </h1>
                <p className="text-muted-foreground">
                  Discover the beautiful doors of Paris
                </p>
              </div>

              {/* Door Grid */}
              <div className="grid grid-cols-2 gap-4">
                {doors.map((door) => (
                  <DoorCard
                    key={door.id}
                    door={door}
                    onToggleFavorite={toggleFavorite}
                    onCardClick={handleDoorClick}
                  />
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderContent()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
