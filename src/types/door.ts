export interface Door {
  id: string;
  imageUrl: string;
  location: string;
  neighborhood: string;
  material: string;
  color: string;
  style: string;
  description?: string;
  isFavorite: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type DoorMaterial = 'Wood' | 'Metal' | 'Glass' | 'Stone' | 'Composite';
export type DoorColor = 'Green' | 'Blue' | 'Black' | 'White' | 'Cream' | 'Brown' | 'Red' | 'Gray';
export type DoorStyle = 'Haussmann' | 'Art Nouveau' | 'Modern' | 'Vintage' | 'Industrial' | 'Classic';