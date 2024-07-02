export const GET_ALL_REFERENCES = `
query GetReferences($sort: SortField, $pagination: PaginationInput, $title: String) {
  getReferences(sort: $sort, pagination: $pagination, title: $title) {
    totalCount
    references {
        firestore_id
        short_name
        title
        type
        date_primary
        authors
        pdf_name
        doi
        cenotes_count
        journal_name
        institution
        has_pdf
        book
        url
        mendeley_ref
    }
  }
}`;