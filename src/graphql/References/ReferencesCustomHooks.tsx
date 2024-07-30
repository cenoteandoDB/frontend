import { useCallback, useEffect, useState } from "react";
import { PaginationInterface, SortInterface } from "../../Types/UserTypes";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_REFERENCE, GET_ALL_REFERENCES, GET_ENUM_REFERENCE_TYPES, GET_REFERENCE_BY_ID, UPDATE_REFERENCE } from "./ReferencesGraphql";
import { CreateReferencesInterface, UpdateReferencesInterface } from "../../Types/ReferencesTypes";

export const useReferences = (initialPagination: PaginationInterface, initialSort: SortInterface,  initialTitle: string | null = null) => {
    const [pagination, setPagination] = useState<PaginationInterface>(initialPagination);
    const [sort, setSort] = useState<SortInterface>(initialSort);
    const [title, setTitle] = useState<string | null>(initialTitle);

    const { data, error, loading, refetch } = useQuery(gql`${GET_ALL_REFERENCES}`, {
        variables: { pagination, sort, title },
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

    const searchReferenceByTitle = useCallback((newTitle: string | null) => {
        setTitle(newTitle);
    }, []);

    useEffect(() => {
        refetch();
    }, [pagination, sort, refetch]);

    useEffect(() => {
      refetch();
  }, [title, refetch]);


    return {
        referencesData: data ? data.getReferences.references : [],
        referencesError: error,
        referencesLoading: loading,
        refetchReferences: refetch,
        updatePagination,
        updateSort,
        searchReferenceByTitle,
        currentSortOrder: sort.sortOrder,
        totalItems: data ? data.getReferences.totalCount : 0,
    };
};

export const useGetReferenceById = (id: string | null | undefined) => {
    const { data, loading, error , refetch} = useQuery(gql`${GET_REFERENCE_BY_ID}`, {
      variables: { getReferenceByIdId: id },
      skip: !id, // Skip query if no id is provided
    });
    
    return { referenceData: data?.getReferenceById, loadingData:loading, errorData: error, refetchReferenceById: refetch };
};

export const useCreateReference = () => {
    const [ createReferenceMutation, {data, error, loading,} ] = useMutation(gql`${CREATE_REFERENCE}`);
    const [success, setSuccess] = useState<boolean>(false);
    const createReference = async (Reference_data: CreateReferencesInterface) => {
        try {
            await createReferenceMutation({ variables:{newReference: Reference_data} });
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
    };
    return { createReference, loading, error, success, setSuccess };
}

export const useUpdateReference = () => {
    const [updateReferenceMutation, { data, loading, error }] = useMutation(gql`${UPDATE_REFERENCE}`);

    const updateReference = async(id: string, ReferenceInfo: UpdateReferencesInterface) => {
        try {
            await updateReferenceMutation({ variables: {
                updatedReference: ReferenceInfo,
                updateReferenceId: id
              } });
          } catch (e) {
            console.log(e)
          }
    }
    return {data, loading, error, updateReference };
}



export const useReferenceType = ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_REFERENCE_TYPES}`);
    return {
        referenceTypeData: data ? data.__type.enumValues : null,
        referenceTypeError: error,
        referenceTypeLoading: loading
        
    };
};