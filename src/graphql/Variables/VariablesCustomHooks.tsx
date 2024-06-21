import React,  { useState, useEffect, useCallback } from "react";
import { gql, useMutation, useQuery } from "@apollo/client"; 
import { GET_VARIABLES, DELETE_VARIABLE, CREATE_VARIABLE, GET_ENUM_CATEGORY_VALUES, GET_ENUM_ACCESS_LEVEL_VALUES, GET_ENUM_VARIABLE_TYPE_VALUES, GET_ENUM_SPHERE_VALUES, GET_ENUM_ORIGIN_VALUES} from "./VariablesGraphql";
import { VariableInterface } from "../../Types/VariablesTypes";
import { PaginationInterface, SortInterface } from "../../Types/UserTypes";
import { GET_ENUM_THEME_VALUES } from "../Users/UsersGraphql";

//QUERYS
export const useVariables = (initialPagination: PaginationInterface, initialSort: SortInterface,  initialName: string | null = null) => {
    const [pagination, setPagination] = useState<PaginationInterface>(initialPagination);
    const [sort, setSort] = useState<SortInterface>(initialSort);
    const [name, setName] = useState<string | null>(initialName);

    const { data, error, loading, refetch } = useQuery(gql`${GET_VARIABLES}`, {
        variables: { pagination, sort, name  },
        fetchPolicy: 'cache-and-network'
    });

    const updatePagination = useCallback((newPagination: Partial<PaginationInterface>) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            ...newPagination
        }));
    }, []);

    const updateSort = useCallback((newSort: Partial<SortInterface>) => {
        setSort((prevSort) => ({
            ...prevSort,
            ...newSort
        }));
    }, []);

    const searchVariableByName = useCallback((newName: string | null) => {
        setName(newName);
      }, []);

    useEffect(() => {
        refetch();
    }, [pagination, sort, name, refetch]);

    return {
        variableData: data ? data.getVariables : [],
        variableError: error,
        variableLoading: loading,
        refetchVariables: refetch,
        updatePagination,
        updateSort,
        searchVariableByName,
        currentSortOrder: sort.sortOrder 
    };
};

export const useCreateVariable = () => {
    const [ createVariableMutation, {data, error, loading,} ] = useMutation(gql`${CREATE_VARIABLE}`);
    const [success, setSuccess] = useState<boolean>(false);
    const createVariable = async (variables: VariableInterface) => {
        try {
            await createVariableMutation({ variables });
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
    };
    return { createVariable, loading, error, success };
}

export const useDeleteVariable = () => {
    const [deleteVariable, { data, loading, error }] = useMutation(gql`${DELETE_VARIABLE}`);
  
    const handleDeleteVariable = async (deleteVariableId: string) => {
      try {
        await deleteVariable({ variables: { deleteVariableId } });
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    };
  
    return {
      handleDeleteVariable,
      deleteVariableData: data,
      deleteVariableLoading: loading,
      deleteVariableError: error,
    };
};

//ENUM
export const useCategories = ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_CATEGORY_VALUES}`);
    return {
        categoryData: data ? data.__type.enumValues : null,
        categoryError: error,
        categoryLoading: loading
    };
};

export const useAcessLevel = ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_ACCESS_LEVEL_VALUES}`);
    return {
        acessLevelData: data ? data.__type.enumValues : null,
        acessLevelError: error,
        acessLevelLoading: loading
    };
};

export const useVariableType = ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_VARIABLE_TYPE_VALUES}`);
    return {
        variableTypeData: data ? data.__type.enumValues : null,
        variableTypeError: error,
        variableTypeLoading: loading
    };
};

export const useThemes = ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_THEME_VALUES}`);
    return {
        themesData: data ? data.__type.enumValues : null,
        themesError: error,
        themesLoading: loading
    };
};

export const useSpheres= ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_SPHERE_VALUES}`);
    return {
        spheresData: data ? data.__type.enumValues : null,
        spheresError: error,
        spheresLoading: loading
    };
};

export const useOrigin= ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_ORIGIN_VALUES}`);
    return {
        originData: data ? data.__type.enumValues : null,
        originError: error,
        originLoading: loading
    };
};