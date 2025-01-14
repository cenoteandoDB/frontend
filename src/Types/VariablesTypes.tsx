export interface VariableInterface {
    id: string;
    firestore_id: string;
    name: string;
    category: string;
    description: string;
    accessLevel: string;
    variableType: string;
    theme: string;
    origin: string;
    sphere: string;
    units: string;
    methodology: string;
    timeseries: boolean;
    cenote_count: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    representation: string;
}

export interface CreateVariableInterface {
    name: string;
    category: string;
    description: string;
    accessLevel: string;
    type: string;
    theme: string;
    origin: string;
    sphere: string;
    units: string;
    methodology: string;
    timeseries: boolean;
    variableRepresentation: string;
    icon: string;
}

export interface UpdateVariableInterface {
    id: string | null | undefined;
    name: string;
    category: string;
    description: string;
    accessLevel: string;
    type: string;
    theme: string;
    origin: string;
    sphere: string;
    units: string;
    methodology: string;
    timeseries: boolean;
    variableRepresentation: string;
    icon: string;
}

export enum AccessLevelEnum {
    PUBLIC = 'PUBLIC',
    SENSITIVE = 'SENSITIVE',
}

export enum VariableTypeEnum {
    NOMINAL = 'NOMINAL',
    CONTINUOUS = 'CONTINUOUS',
    ORDINAL = 'ORDINAL',
}

export enum VariableOriginEnum {
    FIELD = 'FIELD',
    OFFICE = 'OFFICE',
    CALCULATED = 'CALCULATED',
    CALCULATED_OFFICE = 'CALCULATED_OFFICE',
    FIELD_WEB = 'FIELD_WEB',
}

export enum VariableRepresentationEnum {
    ICON = 'ICON',
    CHECK = 'CHECK',
    UNITS = 'UNITS',
    LIST = 'LIST',
    TEXT = 'TEXT',
}

export enum VariableThemeEnum {
    IDENTIFICATION = 'IDENTIFICATION',
    GEOMORPHOLOGY = 'GEOMORPHOLOGY',
    TOURISM = 'TOURISM',
    CULTURAL = 'CULTURAL',
    WATER = 'WATER',
    BIODIVERSITY = 'BIODIVERSITY',
}

export enum VariableSphereEnum {
    KARSTICO_AMBIENT_SYSTEM = 'KARSTICO_AMBIENT_SYSTEM',
    HUMAN_SOCIO_ECONOMICAL = 'HUMAN_SOCIO_ECONOMICAL',
}

export enum VariableCategoryEnum {
    LAND = 'LAND',
    GEOLOGY ='LOCATION',
    WATER = 'WATER',
    SPELEDIVING = 'SPELEDIVING',
    HYDROLOGY ='HYDROLOGY',
    CLIMATE = 'CLIMATE',
    SOCIAL = 'SOCIAL',
    INFRASTRUCTURE = 'INFRASTRUCTURE',
    ADDITIONAL = 'ADDITIONAL',
    ESSENTIAL = 'ESSENTIAL',
    PROPERTY = 'PROPERTY',
    PROTECTION = 'PROTECTION',
    THREATS = 'THREATS',
    CULTURE = 'CULTURE',
    GOVERN = 'GOVERN',
    OTHER = 'OTHER',
    POLYNUCLEAR_AROMATIC_HYDROCARBONS = 'POLYNUCLEAR_AROMATIC_HYDROCARBONS',
    FARMACEUTIC = 'FARMACEUTIC',
    VOLATILE_HYDROCARBONS = 'VOLATILE_HYDROCARBONS',
    ORGANOPHOSPHATE_PESTICIDES = 'ORGANOPHOSPHATE_PESTICIDES',
    ORGANOCHLORINE_PESTICIDES = 'ORGANOCHLORINE_PESTICIDES',
    BIOMARKERS = 'BIOMARKERS',
    HEAVY_METAL = 'HEAVY_METAL',
    NUTRIENT = 'NUTRIENT',
    BASIC = 'BASIC',
}
