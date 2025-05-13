import { ReferencesInterface } from "./ReferencesTypes";
import { VariableInterface } from "./VariablesTypes";

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
    references? : ReferencesInterface[];
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

  
  export interface FavoriteCenote_v2 {
    type: string;
    touristic: string;
    thumbnail: string;
    state: string;
    name: string;
    municipality: string;
    firestore_id: string;
    cenoteando_id: string;
  
  }

   
  export interface AddFavoriteCenote {
    userId: string;
    cenoteId: string;
  }

  export interface MeasurementsInterface {
    timestamp: string;
    value: string;
  }

  export interface PermissionsInterface{
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
  }

  export interface mofInterface {
    id: string;
    firstTimestamp: string;
    cenoteId: string;
    lastTimestamp: string;
    measurements: MeasurementsInterface[];
    permissions: PermissionsInterface;
    variableIcon: string;
    variableId: string;
    variableName: string;
    variableRepresentation: string;
    variableUnits: string;
  }


  export interface createMofInterface {
    cenoteId: string | null | undefined;
    timestamp: string | null | undefined;
    value: string;
    variableId: string | null | undefined;
  }

  export interface updateMofInterface {
    cenoteId: string | null | undefined;
    timestamp: string | null | undefined;
    oldTimestamp: string | null | undefined;
    value: string;
    oldValue: string
    variableId: string | null | undefined;
  }

  export interface mofByThemeInterface {
    category: string;
    mofs: mofInterface[];
    order?: number | null | undefined;
    icon?: string | null | undefined;
    color?: string;
  }

  export interface mofByCategoryInterface {
    mof: mofInterface,
    variable: VariableInterface

  }