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
    isFavorite: boolean;
  
    photos: string[];
    maps: string[];
  
    createdAt: string;
    updatedAt: string;
  }

  export interface CreateCenoteInterface{
    name: string;
    municipality: string;
    state: string;
    touristic: boolean;
    type: string;
    longitude?: string;
    latitude?: string; 
  }

  export interface UpdateCenoteInterface{
    name: string;
    municipality: string;
    state: string;
    touristic: boolean;
    type: string;
    longitude?: string;
    latitude?: string; 
  }
  
  export interface FavoriteCenote {
    firestore_id: string;
    userId: string;
    cenoteId: string;
    cenoteName: string;
  }

  export interface AddFavoriteCenote {
    userId: string;
    cenoteId: string;
  }