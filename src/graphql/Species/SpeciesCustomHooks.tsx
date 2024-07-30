import { useCallback, useEffect, useState } from "react";
import { PaginationInterface, SortInterface } from "../../Types/UserTypes";
import { GET_SPECIES } from "./SpeciesGraphql";
import { gql, useQuery } from "@apollo/client";

export const useSpecies = (initialPagination: PaginationInterface, initialSort: SortInterface,  initialName: string | null = null) => {
    const [pagination, setPagination] = useState<PaginationInterface>(initialPagination);
    const [sort, setSort] = useState<SortInterface>(initialSort);
    const [name, setName] = useState<string | null>(initialName);
  
    const { data, error, loading, refetch } = useQuery(gql`${GET_SPECIES}`, {
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

    const searchSpecieByName = useCallback((newName: string | null) => {
          setName(newName);
    }, []);

    useEffect(() => {
        refetch();
    }, [pagination, sort, refetch]);

    useEffect(() => {
      refetch();
  }, [name, refetch]);


    return {
        speciesData: data ? data.getSpecies.species : [],
        speciesError: error,
        speciesLoading: loading,
        refetchSpecies: refetch,
        updatePagination,
        updateSort,
        searchSpecieByName,
        currentSortOrder: sort.sortOrder,
        totalItems: data ? data.getSpecies.totalCount : 0,
    };
};