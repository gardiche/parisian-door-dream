import { Door } from '@/types/door';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  doors: Door[];
  onDoorClick: (door: Door) => void;
}

export function MapView({ doors, onDoorClick }: MapViewProps) {
  // Group doors by neighborhood for the map view
  const doorsByNeighborhood = doors.reduce((acc, door) => {
    if (!acc[door.neighborhood]) {
      acc[door.neighborhood] = [];
    }
    acc[door.neighborhood].push(door);
    return acc;
  }, {} as Record<string, Door[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Explore by Neighborhood</h1>
          <p className="text-muted-foreground">Discover beautiful doors across Paris</p>
        </div>

        <div className="space-y-4">
          {Object.entries(doorsByNeighborhood).map(([neighborhood, neighborhoodDoors]) => (
            <Card key={neighborhood} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{neighborhood}</h3>
                  <p className="text-sm text-muted-foreground">
                    {neighborhoodDoors.length} door{neighborhoodDoors.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {neighborhoodDoors.map((door) => (
                  <button
                    key={door.id}
                    onClick={() => onDoorClick(door)}
                    className="aspect-square rounded-lg overflow-hidden group"
                  >
                    <img 
                      src={door.imageUrl} 
                      alt={`Door at ${door.location}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}