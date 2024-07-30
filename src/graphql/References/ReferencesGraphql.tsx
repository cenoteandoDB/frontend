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
        journal_name
        institution
        has_pdf
        book
        url
        mendeley_ref
    }
  }
}`;

export const GET_REFERENCE_BY_ID = `
query Query($getReferenceByIdId: ID!) {
  getReferenceById(id: $getReferenceByIdId) {
    cenoteando_id
    firestore_id
    type
    title
    short_name
    date_primary
    journal_name
    institution
    book
    pages
    doi
    url
    authors
    keywords
    mendeley_ref
    has_pdf
    uploaded_dropbox
    uploaded_gcp
    uploaded_mendeley
    validated_mendeley
    referenced_cenotes
    referenced_species
    unique_code
  }
}`;

export const CREATE_REFERENCE = `
mutation Mutation($newReference: NewReferenceInput!) {
  createReference(new_reference: $newReference) {
    title
  }
}`;

export const UPDATE_REFERENCE =  `
mutation UpdateReference($updateReferenceId: ID!, $updatedReference: UpdatedReferenceInput!) {
  updateReference(id: $updateReferenceId, updated_reference: $updatedReference) {
    firestore_id
  }
}`;

export const GET_ENUM_REFERENCE_TYPES = `
query GetEnumValues {
  __type(name: "ReferenceType") {
    name
    enumValues {
      name
    }
  }
}`;
