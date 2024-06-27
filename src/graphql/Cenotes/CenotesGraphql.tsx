export const ALL_CENOTES = `
query GetCenotes($sort: SortField, $pagination: PaginationInput, $name: String) {
  getCenotes(sort: $sort, pagination: $pagination, name: $name) {
    totalCount
    cenotes {
        firestore_id
        name
        state
        municipality
        type
        touristic
        createdAt
        updatedAt
        variable_count
    }
  }
}`;