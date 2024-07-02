export interface ReferencesInterface {
    firestore_id: string;
    short_name: string;
    title: string;
    type: string;
    date_primary: string;
    authors: string[];
    pdf_name: string;
    doi: string;
    cenotes_count: number;
    journal_name: string;
    institution: string;
    has_pdf: string;
    book: string;
    url: string;
    mendeley_ref: boolean;
}