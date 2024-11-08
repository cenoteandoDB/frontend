export const UPDATE_PERMISIONS_CENOTE = `
    mutation UpdatePermissionsCenote($cenotePermissionInput: CenotesPermissionInput!) {
    updatePermissionsCenote(cenotePermissionInput: $cenotePermissionInput)
    }
`;

export const UPDATE_PERMISIONS_VARIABLE = `
mutation UpdatePermissionsVariable($variablesPermissionInput: VariablePermissionInput!) {
    updatePermissionsVariable(variablesPermissionInput: $variablesPermissionInput)
}`;