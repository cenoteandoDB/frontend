import { gql, useMutation } from "@apollo/client";
import { UPDATE_PERMISIONS_CENOTE, UPDATE_PERMISIONS_VARIABLE } from "./PermissionsGraphql";
import { useState } from "react";
import { CenotePermissionInputInterface, VariablesPermissionInputInterface } from "../../Types/PermisionsTypes";

export const useUpdatePermissionCenote = () => {
    const [ UpdatePermissionsCenote, {data, error, loading,} ] = useMutation(gql`${UPDATE_PERMISIONS_CENOTE}`);
    const [success, setSuccess] = useState<boolean>(false);
    const updatePermissionCenote = async (data: CenotePermissionInputInterface) => {
        try {
            await UpdatePermissionsCenote({ variables: {cenotePermissionInput: data} });
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
    };
    return { updatePermissionCenote, cenotePermissionLoading: loading, cenotePermissionError: error, cenotePermissionSuccess: success, setSuccessCenote: setSuccess };
}

export const useUpdatePermissionVariable = () => {
    const [ UpdatePermissionsVariable, {data, error, loading,} ] = useMutation(gql`${UPDATE_PERMISIONS_VARIABLE}`);
    const [success, setSuccess] = useState<boolean>(false);
    const UpdatePermissionVariable = async (data: VariablesPermissionInputInterface) => {
        try {
            await UpdatePermissionsVariable({ variables: {variablesPermissionInput: data} });
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
    };
    return { UpdatePermissionVariable, variablesPermissionLoading: loading, variablesPermissionError: error, variablesPermissionSuccess: success, setSuccessVariable: setSuccess };
}