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
    references {
      title
      short_name
      type
      date_primary
      authors
      pdf_url
    }
    photos {
      id
      isMain
      url
    }
  }
}
`;

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
        permissions {
          canDelete
          canEdit
          canView
        }
    }
  }
}`;

export const GET_MOF_BY_CATEGORY = `query GetCenoteDataByCategory($cenoteId: ID!, $category: VariableCategory!) {
  getCenoteDataByCategory(cenoteId: $cenoteId, category: $category) {
    mof {
      id
      cenoteId
      variableId
      variableName
      variableRepresentation
      variableIcon
      variableUnits
      measurements {
        timestamp
        value
      }
      permissions {
        canView
        canEdit
        canDelete
      }
      firstTimestamp
      lastTimestamp
    }
    variable {
      firestore_id
      name
      description
      type
      units
      methodology
      timeseries
      accessLevel
      origin
      theme
      variableRepresentation
      sphere
      category
      icon
      cenote_count
      createdAt
      updatedAt
    }
  }
}`;

export const GET_UPLOAD_IMAGE_URL= `query Query($cenoteId: ID!, $photoName: String!, $contentType: String!) {
  generateCenotePhotoUploadUrl(cenoteId: $cenoteId, photoName: $photoName, contentType: $contentType)
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

export const CREATE_MOF = `
mutation RequestCreateMof($newMof: NewMeasurementOrFactInput!) {
  requestCreateMof(new_mof: $newMof)
} `;

export const UPDATE_CENOTE =  `
mutation UpdateCenote($updatedCenote: UpdatedCenoteInput!, $cenoteId: String!) {
  updateCenote(updated_cenote: $updatedCenote, cenoteId: $cenoteId) {
    firestore_id
  }
}`;

export const UPDATE_MOF = `
mutation RequestUpdateMof($updateMofInput: UpdateMofInput!) {
  requestUpdateMof(update_mof_input: $updateMofInput)
}`;

export const ADD_FAVORITE_CENOTE = `
mutation Mutation($userId: ID!, $cenoteId: ID!) {
  addFavouriteCenote(userId: $userId, cenoteId: $cenoteId)
}`;

export const REMOVE_FAVORITE_CENOTE = `mutation RemoveFavouriteCenote($userId: ID!, $cenoteId: ID!) {
  removeFavouriteCenote(userId: $userId, cenoteId: $cenoteId)
}`;

export const CHANGE_CENOTE_MAIN_PHOTO = `mutation ChangeCenoteMainPhoto($cenoteId: ID!, $photoId: String!) {
  changeCenoteMainPhoto(cenoteId: $cenoteId, photoId: $photoId) {
    id
    isMain
    url
  }
}`;

export const DELETE_PHOTO = `mutation DeletePhoto($cenoteId: ID!, $photoId: String!) {
  deletePhoto(cenoteId: $cenoteId, photoId: $photoId) {
    id
    isMain
    url
  }
}`;

export const GET_MOF_MODIFICATIONS = `query MofModificationRequests {
  getMofModificationRequests {
    mofModificationRequests {
      cenoteId
      cenoteName
      creator
      creatorId
      firestore_id
      mof {
        timestamp
        value
      }
      old_mof {
        timestamp
        value
      }
      type
      variableCategory
      variableId
    }
  }
}`;

export const ACCEPT_MOF_REQUEST = `mutation AcceptMofRequest($updateMofId: ID!) {
  acceptMofRequest(update_mof_id: $updateMofId)
}`;

export const REJECT_MOF_REQUEST = `mutation RejectMofRequest($updateMofId: ID!) {
  rejectMofRequest(update_mof_id: $updateMofId)
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

