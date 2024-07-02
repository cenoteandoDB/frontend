import { useCallback, useEffect, useState } from "react";
import { PaginationInterface, SortInterface } from "../../Types/UserTypes";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ADD_FAVORITE_CENOTE, ALL_CENOTES, CREATE_CENOTE, DELETE_CENOTE, GET_CENOTE_BY_ID, GET_ENUM_CENOTE_TYPE, UPDATE_CENOTE } from "./CenotesGraphql";
import { AddFavoriteCenote, CenoteInterface, CreateCenoteInterface, UpdateCenoteInterface } from "../../Types/CenotesTypes";

export const useCenotes = (initialPagination: PaginationInterface, initialSort: SortInterface,  initialName: string | null = null, userId: string | undefined) => {
    const [pagination, setPagination] = useState<PaginationInterface>(initialPagination);
    const [sort, setSort] = useState<SortInterface>(initialSort);
    const [name, setName] = useState<string | null>(initialName);

    const { data, error, loading, refetch } = useQuery(gql`${ALL_CENOTES}`, {
        variables: { pagination, sort, name, userId },
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

export const useGetCenoteById = (id: string | null) => {
    const { data, loading, error } = useQuery(gql`${GET_CENOTE_BY_ID}`, {
      variables: { cenoteByIdId: id },
      skip: !id, // Skip query if no id is provided
    });
    
    return { cenoteData: data?.cenoteById, loadingData:loading, errorData: error };
};

//MUTATIONS
export const useCreateCenote = () => {
    const [ createCenoteMutation, {data, error, loading,} ] = useMutation(gql`${CREATE_CENOTE}`);
    const [success, setSuccess] = useState<boolean>(false);
    const createCenote = async (cenote_data: CreateCenoteInterface) => {
        try {
            await createCenoteMutation({ variables:{newCenote: cenote_data} });
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
    };
    return { createCenote, loading, error, success };
}

export const useDeleteCenote = () => {
    const [deleteCenote, { data, loading, error }] = useMutation(gql`${DELETE_CENOTE}`);
  
    const handleDeleteCenote = async (deleteCenoteId: string) => {
      try {
        await deleteCenote({ variables: { deleteCenoteId } });
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    };
  
    return {
      handleDeleteCenote,
      deleteCenoteData: data,
      deleteCenoteLoading: loading,
      deleteCenoteError: error,
    };
};

export const useUpdateCenote = () => {
    const [updateCenoteMutation, { data, loading, error }] = useMutation(gql`${UPDATE_CENOTE}`);

    const updateCenote = async(id: string, cenoteInfo: UpdateCenoteInterface) => {
        try {
            await updateCenoteMutation({ variables: {
                updatedCenote: cenoteInfo,
                cenoteId: id
              } });
          } catch (e) {
            console.log(e)
          }
    }
    return {data, loading, error, updateCenote };
}


export const useAddFavoriteCenote = () => {
  const [addFavoriteCenote, { data, loading, error }] = useMutation(gql`${ADD_FAVORITE_CENOTE}`);
  const [result, setResult] = useState(null);

  const addCenote = async (favoriteCenote: AddFavoriteCenote) => {
    try {
      const response = await addFavoriteCenote({ variables: { favoriteCenotes: favoriteCenote } });
      setResult(response.data.addFavoriteCenote);
    } catch (err) {
      console.error(err);
    }
  };

  return { addCenote, favCenoteData: result, favCenoteLoading: loading, favCenoteError: error };
};

export const useCenoteTypes = ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_CENOTE_TYPE}`);
    return {
        cenoteTypesData: data ? data.__type.enumValues : null,
        cenoteTypesError: error,
        cenoteTypesLoading: loading
    };
};