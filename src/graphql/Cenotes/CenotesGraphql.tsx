export const ALL_CENOTES = `
query GetCenotes($sort: SortField, $pagination: PaginationInput, $name: String, $userId: String) {
  getCenotes(sort: $sort, pagination: $pagination, name: $name, userId: $userId) {
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
        isFavorite
    }
  }
}`;

export const GET_CENOTE_BY_ID = `
query Query($cenoteByIdId: ID!) {
  cenoteById(id: $cenoteByIdId) {
       firestore_id
        name
        state
        municipality
        type
        touristic
        latitude
        longitude
  }
}`;

export const DELETE_CENOTE = `
mutation DeleteCenote($deleteCenoteId: ID!) {
  deleteCenote(id: $deleteCenoteId)
}`;

export const CREATE_CENOTE = `
mutation CreateCenote($newCenote: NewCenoteInput!) {
  createCenote(new_cenote: $newCenote) {
    firestore_id
  }
}`;

export const UPDATE_CENOTE =  `
mutation UpdateCenote($updatedCenote: UpdatedCenoteInput!, $cenoteId: String!) {
  updateCenote(updated_cenote: $updatedCenote, cenoteId: $cenoteId) {
    firestore_id
  }
}`;

export const ADD_FAVORITE_CENOTE = `
  mutation AddFavoriteCenote($favoriteCenotes: NewFavoriteCenote!) {
    addFavoriteCenote(favoriteCenotes: $favoriteCenotes) {
      firestore_id
    }
  }`;

export const GET_ENUM_CENOTE_TYPE = `
  query GetEnumValues {
    __type(name: "CenoteType") {
      name
      enumValues {
        name
      }
    }
  }
`;