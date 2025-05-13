export interface VariableInterface {
    id?: string;
    firestore_id: string;
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
    cenote_count: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    variableRepresentation: string;
    
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
    firestore_id: string | null | undefined;
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
