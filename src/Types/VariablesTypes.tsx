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
    timeseries: string;
    cenote_count: string;
    createdAt: string;
    updatedAt: string;
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
}
