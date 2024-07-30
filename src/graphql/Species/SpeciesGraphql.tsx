export const GET_SPECIES = 
`query GetSpecies($sort: SortField, $pagination: PaginationInput, $name: String) {
  getSpecies(sort: $sort, pagination: $pagination, name: $name) {
    species {
      updatedAt
      createdAt
      gbifId
      inaturalistId
      name
      id
      thumbnail
    }
    totalCount
  }
}`;