
export const GET_VARIABLES = `
query GetVariables($sort: SortField, $pagination: PaginationInput, $name: String) {
    getVariables(sort: $sort, pagination: $pagination, name: $name) {
      totalCount
      variables {
        category
        accessLevel
        createdAt
        description
        firestore_id
        methodology
        name
        origin
        sphere
        theme
        timeseries
        type
        units
        updatedAt
      }
    }
}`;

export const GET_VARIABLE_BY_ID = `
query GetVariableById($getVariableByIdId: ID!) {
  getVariableById(id: $getVariableByIdId) {
    name
	  description
    category
    accessLevel
	  type
    theme
    sphere
    origin
	  units
    methodology
    timeseries
    variableRepresentation
    icon
  }
}`;

export const GET_CATEGORY_BY_THEME = `
query Query($theme: VariableTheme!) {
  getCategoriesByTheme(theme: $theme)
}`;

export const GET_VARIABLES_BY_CATEGORY = `
query GetVariablesByCategory($category: VariableCategory!) {
  getVariablesByCategory(category: $category) {
    firestore_id
    name
    description
    category
    accessLevel
    origin
    units
    sphere
    theme
    type
    timeseries
    variableRepresentation
    icon
  }
}`;

export const GET_VARIABLES_BY_THEME = `
query GetVariablesByTheme($theme: VariableTheme!) {
  getVariablesByTheme(theme: $theme) {
    firestore_id
    name
    description
    category
    icon
    variableRepresentation
  }
}`;

export const GET_MOF_BY_CENOTE_AND_VARIABLE = 
`query Query($cenoteId: ID!, $variableId: ID!) {
  getCenoteDataByVariable(cenoteId: $cenoteId, variableId: $variableId) {
    cenoteId
    firstTimestamp
    id
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

export const DELETE_VARIABLE =`
mutation DeleteVariable($deleteVariableId: ID!) {
  deleteVariable(id: $deleteVariableId)
}`;

export const CREATE_VARIABLE = `
mutation CreateVariable($newVariable: NewVariableInput!) {
  createVariable(new_variable: $newVariable) {
    firestore_id
  }
}`;

export const UPDATE_VARIABLE = `
mutation UpdateVariable($firestoreId: String!, $updatedVariable: UpdateVariableInput!) {
  updateVariable(firestore_id: $firestoreId, updated_variable: $updatedVariable) {
  firestore_id 
  }
}`;

/*mutation Mutation($updatedVariable: UpdateVariableInput!, $variableId: String!) {
  updateVariable(updated_variable: $updatedVariable, variableId: $variableId) {
    firestore_id
  }
}

*/

//ENUMS
export const GET_ENUM_CATEGORY_VALUES = `
  query GetEnumValues {
    __type(name: "VariableCategory") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_ACCESS_LEVEL_VALUES = `
  query GetEnumValues {
    __type(name: "AccessLevel") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_VARIABLE_TYPE_VALUES = `
  query GetEnumValues {
    __type(name: "VariableType") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_SPHERE_VALUES = `
  query GetEnumValues {
    __type(name: "VariableSphere") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_ORIGIN_VALUES = `
  query GetEnumValues {
    __type(name: "VariableOrigin") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_VARIABLE_REPRESENTATION = `
  query GetEnumValues {
    __type(name: "VariableRepresentation") {
      name
      enumValues {
        name
      }
    }
  }
`;



