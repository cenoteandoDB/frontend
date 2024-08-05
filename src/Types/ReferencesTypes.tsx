export interface ReferencesInterface {
    cenoteando_id?: string;
    firestore_id: string;
    type: string;
    title: string;
    short_name: string;
    date_primary: number;
    journal_name: string;
    institution: string;
    book: string;
    pages: string;
    doi: string;
    url: string;
    authors: string[];
    keywords: string[];
    mendeley_ref: boolean;
    has_pdf: boolean;
    uploaded_dropbox: boolean;
    uploaded_gcp: boolean;
    uploaded_mendeley: boolean;
    validated_mendeley: boolean;
    pdf_url?: string;
    referenced_cenotes: string[];
    referenced_species: string[];
    unique_code?: string;
}

export interface CreateReferencesInterface {
    cenoteando_id?: string;
    type: string;
    title: string;
    short_name: string;
    date_primary: number;
    journal_name: string;
    institution: string;
    book: string;
    pages: string;
    doi: string;
    url: string;
    authors: string[];
    keywords: string[];
    mendeley_ref: boolean;
    has_pdf: boolean;
    uploaded_dropbox: boolean;
    uploaded_gcp: boolean;
    uploaded_mendeley: boolean;
    validated_mendeley: boolean;
  
    referenced_cenotes: string[];
    referenced_species: string[];

    
}

export interface UpdateReferencesInterface {
    cenoteando_id?: string;
    type: string;
    title: string;
    short_name: string;
    date_primary: number;
    journal_name: string;
    institution: string;
    book: string;
    pages: string;
    doi: string;
    url: string;
    authors: string[];
    keywords: string[];
    mendeley_ref: boolean;
    has_pdf: boolean;
    uploaded_dropbox: boolean;
    uploaded_gcp: boolean;
    uploaded_mendeley: boolean;
    validated_mendeley: boolean;
  
    referenced_cenotes: string[];
    referenced_species: string[];
   
    unique_code: string;
}