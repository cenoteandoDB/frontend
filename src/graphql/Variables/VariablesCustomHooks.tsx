import React,  { useState, useEffect, useCallback } from "react";
import { gql, useMutation, useQuery } from "@apollo/client"; 
import { GET_VARIABLES, DELETE_VARIABLE, CREATE_VARIABLE, GET_ENUM_CATEGORY_VALUES, GET_ENUM_ACCESS_LEVEL_VALUES, GET_ENUM_VARIABLE_TYPE_VALUES, GET_ENUM_SPHERE_VALUES, GET_ENUM_ORIGIN_VALUES, UPDATE_VARIABLE, GET_VARIABLE_BY_ID, GET_VARIABLES_BY_THEME, GET_ENUM_VARIABLE_REPRESENTATION, GET_CATEGORY_BY_THEME, GET_VARIABLES_BY_CATEGORY, GET_MOF_BY_CENOTE_AND_VARIABLE} from "./VariablesGraphql";
import { CreateVariableInterface, UpdateVariableInterface, VariableInterface } from "../../Types/VariablesTypes";
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
        variableData: data ? data.getVariables.variables : [],
        variableError: error,
        variableLoading: loading,
        refetchVariables: refetch,
        updatePagination,
        updateSort,
        searchVariableByName,
        currentSortOrder: sort.sortOrder,
        totalItems: data ? data.getVariables.totalCount : 0,
    };
};

export const useGetVariableById = (id: string | null) => {
    const { data, loading, error, refetch } = useQuery(gql`${GET_VARIABLE_BY_ID}`, {
      variables: { getVariableByIdId: id },
      skip: !id, 
    });
  
    return { variableData: data?.getVariableById, loadingData:loading, errorData: error,  refetchVariableById: refetch };
};

export const useGetVariableByTheme = (theme: string | null) => {
    const { data, loading, error, refetch } = useQuery(gql`${GET_VARIABLES_BY_THEME}`, {
      variables: { theme: theme },
      skip: !theme, 
    });
  
    return { variablesByThemeData: data?.getVariablesByTheme, variablesByThemeLoading:loading, variablesByThemeError: error,  refetchVariableByTheme: refetch };
};

export const useGetCategoryByTheme = (theme: string | null) => {
    const { data, loading, error, refetch } = useQuery(gql`${GET_CATEGORY_BY_THEME}`, {
      variables: { theme: theme },
      skip: !theme, 
    });
  
    return { categoriesData: data?.getCategoriesByTheme, categoriesLoading:loading, categoriesError: error,  refetchCategoryByTheme: refetch };
};

export const useGetVariablesByCategory = (category: string | null) => {
    const { data, loading, error, refetch } = useQuery(gql`${GET_VARIABLES_BY_CATEGORY}`, {
      variables: { category: category },
      skip: !category, 
    });
  
    return { variableByCategoryData: data?.getVariablesByCategory, variableByCategoryLoading:loading, variableByCategoryError: error,  refetchVariablesByCategory: refetch };
};

export const useGetMofByCenoteAndVariable = (cenoteId: string | null | undefined, variableId: string | null) => {
    const { data, loading, error, refetch } = useQuery(gql`${GET_MOF_BY_CENOTE_AND_VARIABLE}`, {
      variables: { cenoteId: cenoteId, variableId: variableId  },
      skip: !cenoteId && !variableId, 
    });
  
    return { MofByVariableAndCenoteData: data?.getCenoteDataByVariable, MofByVariableAndCenoteLoading:loading, MofByVariableAndCenoteError: error,  refetchMofByVariableAndCenote: refetch };
};

//MUTATIONS
export const useCreateVariable = () => {
    const [ createVariableMutation, {data, error, loading,} ] = useMutation(gql`${CREATE_VARIABLE}`);
    const [success, setSuccess] = useState<boolean>(false);
    const createVariable = async (variable_data: CreateVariableInterface) => {
        try {
            await createVariableMutation({ variables:{newVariable: variable_data} });
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

export const useUpdateVariable = () => {
    const [updateUser, { data, loading, error }] = useMutation(gql`${UPDATE_VARIABLE}`);

    const updateVariable = async(id: string, variableInfo: UpdateVariableInterface) => {
        try {
            await updateUser({ variables: {
                updatedVariable: variableInfo,
                firestoreId: id
              } });
          } catch (e) {
            console.error(e);
          }
    }
    return {data, loading, error, updateVariable };
}

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

export const useVariablesRepresentation= ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_VARIABLE_REPRESENTATION}`);
    return {
        variablesRepresentationData: data ? data.__type.enumValues : null,
        variablesRepresentationError: error,
        variablesRepresentationLoading: loading
    };
};