import { useCallback, useEffect, useState } from "react";
import { PaginationInterface, SortInterface } from "../../Types/UserTypes";
import { gql, useQuery } from "@apollo/client";
import { GET_ALL_REFERENCES } from "./ReferencesGraphql";

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