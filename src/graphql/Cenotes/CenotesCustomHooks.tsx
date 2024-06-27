import { useCallback, useEffect, useState } from "react";
import { PaginationInterface, SortInterface } from "../../Types/UserTypes";
import { gql, useQuery } from "@apollo/client";
import { ALL_CENOTES } from "./CenotesGraphql";
import { CenoteInterface } from "../../Types/CenotesTypes";

export const useCenotes = (initialPagination: PaginationInterface, initialSort: SortInterface,  initialName: string | null = null) => {
    const [pagination, setPagination] = useState<PaginationInterface>(initialPagination);
    const [sort, setSort] = useState<SortInterface>(initialSort);
    const [name, setName] = useState<string | null>(initialName);
  
    const { data, error, loading, refetch } = useQuery(gql`${ALL_CENOTES}`, {
        variables: { pagination, sort, name  },
        fetchPolicy: 'cache-and-network'
    });
    console.log(data)
    console.log(error)
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

    const searchCenoteByName = useCallback((newName: string | null) => {
          setName(newName);
    }, []);

    useEffect(() => {
        refetch();
    }, [pagination, sort, refetch]);

    useEffect(() => {
      refetch();
  }, [name, refetch]);


    return {
        cenotesData: data ? data.getCenotes.cenotes : [],
        cenotesError: error,
        cenotesLoading: loading,
        refetchCenotes: refetch,
        updatePagination,
        updateSort,
        searchCenoteByName,
        currentSortOrder: sort.sortOrder,
        totalItems: data ? data.getCenotes.totalCount : 0,
    };
};