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
        species {
          createdAt
          gbifId
          id
          inaturalistId
          name
          thumbnail
          updatedAt
        }
  }
}`;

export const GET_CENOTE_THEMES_BY_CENOTE = `
query Query($cenoteId: ID!) {
  getThemesByCenote(cenoteId: $cenoteId)
}`;

export const GET_CENOTE_DATA_BY_THEME= `
query GetCenoteDataByTheme($cenoteId: ID!, $theme: VariableTheme!) {
  getCenoteDataByTheme(cenoteId: $cenoteId, theme: $theme) {
    id
    firstTimestamp
    cenoteId
    lastTimestamp
    measurements {
      timestamp
      value
    }
    variableIcon
    variableId
    variableName
    variableRepresentation
    variableUnits
  }
}`;

export const GET_FAVORITE_CENOTES = ` query Query($getFavouriteCenotesId: ID!) {
  getFavouriteCenotes(id: $getFavouriteCenotesId)
}`;

export const GET_MOF_BY_THEME = `query GetCenoteDataByTheme($cenoteId: ID!, $theme: VariableTheme!) {
  getCenoteDataByTheme(cenoteId: $cenoteId, theme: $theme) {
    category
    mofs {
       cenoteId
    firstTimestamp
    id
    lastTimestamp
    variableIcon
    variableId
    variableName
    variableRepresentation
    variableUnits
    measurements {
      timestamp
      value
    }
    }
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

export const CREATE_MOF =  
 `mutation CreateMof($newMof: NewMeasurementOrFactInput!) {
  createMof(new_mof: $newMof) {
    id
  }
} `;

export const UPDATE_CENOTE =  `
mutation UpdateCenote($updatedCenote: UpdatedCenoteInput!, $cenoteId: String!) {
  updateCenote(updated_cenote: $updatedCenote, cenoteId: $cenoteId) {
    firestore_id
  }
}`;

export const UPDATE_MOF = `
mutation UpdateMof($updateMofInput: UpdateMofInput!) {
  updateMof(update_mof_input: $updateMofInput)
}`;

export const ADD_FAVORITE_CENOTE = `
mutation Mutation($userId: ID!, $cenoteId: ID!) {
  addFavouriteCenote(userId: $userId, cenoteId: $cenoteId)
}`;

export const REMOVE_FAVORITE_CENOTE = `mutation RemoveFavouriteCenote($userId: ID!, $cenoteId: ID!) {
  removeFavouriteCenote(userId: $userId, cenoteId: $cenoteId)
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