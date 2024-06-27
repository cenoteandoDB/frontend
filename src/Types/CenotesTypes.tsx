export interface CenoteInterface {
    firestore_id?: string;
    cenoteando_id?: string;
  
    name: string;
    altnames: string;
    state: string;
    municipality: string;
    type: string;
  
    touristic: boolean;
    latitude: string;
    longitude: string;
  
    variable_count: number;
    reference_count: number;
    species_count: number;
  
    photos: string[];
    maps: string[];
  
    createdAt: string;
    updatedAt: string;
  }
  