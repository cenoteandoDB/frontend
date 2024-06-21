
export const GET_VARIABLES = `
query GetVariables($sort: SortField, $pagination: PaginationInput, $name: String) {
    getVariables(sort: $sort, pagination: $pagination, name: $name) {
      category
      accessLevel
      cenote_count
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
}`;

export const DELETE_VARIABLE =`
mutation DeleteVariable($deleteVariableId: ID!) {
  deleteVariable(id: $deleteVariableId)
}`;

export const CREATE_VARIABLE = `
mutation CreateVariable($newVariable: NewVariableInput!) {
  createVariable(new_variable: $newVariable) {
    name
  }
}`;

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