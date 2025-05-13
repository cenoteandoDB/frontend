import { useCallback, useEffect, useState } from "react";
import { PaginationInterface, SortInterface } from "../../Types/UserTypes";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ACCEPT_MOF_REQUEST, ADD_FAVORITE_CENOTE, ALL_CENOTES, CHANGE_CENOTE_MAIN_PHOTO, CREATE_CENOTE, CREATE_MOF, DELETE_CENOTE, DELETE_PHOTO, GET_CENOTE_BY_ID, GET_CENOTE_DATA_BY_THEME, GET_CENOTE_THEMES_BY_CENOTE, GET_ENUM_CENOTE_TYPE, GET_MOF_BY_CATEGORY, GET_MOF_BY_THEME, GET_MOF_MODIFICATIONS, GET_UPLOAD_IMAGE_URL, REJECT_MOF_REQUEST, REMOVE_FAVORITE_CENOTE, UPDATE_CENOTE, UPDATE_MOF } from "./CenotesGraphql";
import { AddFavoriteCenote, CreateCenoteInterface, createMofInterface, UpdateCenoteInterface, updateMofInterface } from "../../Types/CenotesTypes";
import { useAuthContext } from "../../Auth/AuthProvider";
import { changeMainPhotoInterface, PhotoInterface } from "../../Types/UtilsTypes";



export const useCenotes = (initialPagination: PaginationInterface, initialSort: SortInterface,  initialName: string | null = null) => {
    const [pagination, setPagination] = useState<PaginationInterface>(initialPagination);
    const [sort, setSort] = useState<SortInterface>(initialSort);
    const [name, setName] = useState<string | null>(initialName);

    const { data, error, loading, refetch } = useQuery(gql`${ALL_CENOTES}`, {
        variables: { pagination, sort, name},
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

export const useGetCenoteById = (id: string | null | undefined) => {
    const { data, loading, error, refetch } = useQuery(gql`${GET_CENOTE_BY_ID}`, {
      variables: { cenoteByIdId: id },
      skip: !id, // Skip query if no id is provided
    });
    
    return { cenoteData: data?.cenoteById, loadingData:loading, errorData: error, refetchCenoteById: refetch};
};

export const useGetUploadImageUrl = (id: string | null | undefined, photoName:  string | null | undefined) => {
  const { data, loading, error, refetch } = useQuery(gql`${GET_UPLOAD_IMAGE_URL}`, {
    variables: { 
      cenoteId: id,
      photoName: photoName,
      contentType: "application/octet-stream"
    },
    skip: !id || !photoName, // Skip query if no id is provided
  });
  return { urlData: data?.generateCenotePhotoUploadUrl, urlLoading:loading, urlError: error, refetchUrl: refetch};
};

export const useGetThemesByCenote = (id: string | null | undefined) => {
  const { token } = useAuthContext()
  const { data, loading, error } = useQuery(gql`${GET_CENOTE_THEMES_BY_CENOTE}`, {
    variables: { cenoteId: id },
    skip: !id,
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }, 
  });
  
  return { themesList: data?.getThemesByCenote, themesLoading:loading, themesError: error };
};

export const useGetCenoteByTheme = (cenoteId: string | null | undefined, theme: string | null | undefined) => {
  const { token } = useAuthContext()
  const { data, loading, error, refetch } = useQuery(gql`${GET_CENOTE_DATA_BY_THEME}`, {
    variables: { theme: theme ,cenoteId: cenoteId},
    skip: !theme || !cenoteId,
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }, 
  });
  return { cenoteThemeData: data?.getCenoteDataByTheme, cenoteThemeLoading: loading, cenoteThemeError: error, refetchCenoteTheme: refetch};
};

export const useGetMofByTheme = (cenoteId: string | null | undefined, theme: string | null | undefined) => {
  const { token } = useAuthContext()
  const { data, loading, error, refetch } = useQuery(gql`${GET_MOF_BY_THEME}`, {
    variables: { theme: theme ,cenoteId: cenoteId},
    skip: !theme || !cenoteId,
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }, 
  });
  console.log(data)
  return { mofsByThemeData: data?.getCenoteDataByTheme, mofsByThemeLoading: loading, mofsByThemeError: error, refetchMofByTheme: refetch};
};

export const useGetMofByCategory = (cenoteId: string | null | undefined, category: string | null | undefined) => {
  const { token } = useAuthContext()
  const { data, loading, error, refetch } = useQuery(gql`${GET_MOF_BY_CATEGORY}`, {
    variables: { category: category ,cenoteId: cenoteId},
    notifyOnNetworkStatusChange: true,
    skip: !category || !cenoteId,
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }, 
  });
  console.log(data)
  return { 
    mofsByCategoryData: data?.getCenoteDataByCategory ? data?.getCenoteDataByCategory : [],
    mofsByCategoryLoading: loading, 
    mofsByCategoryError: error, 
    refetchMofByCategory: refetch
  };
};

export const useGetMofModifications = () => {
  const { token } = useAuthContext(); // Retrieve the token from Auth context
  
  const { data, loading, error, refetch } = useQuery(gql`${GET_MOF_MODIFICATIONS}`, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Apply token as Bearer authorization
      },
    },
  });

  return {
    mofsModificationRefetch: refetch,
    mofsModificationData: data?.getMofModificationRequests?.mofModificationRequests,
    mofsModificationLoading: loading,
    mofsModificationError: error,
  };
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

export const useCreateMof = () => {
  const [ createMofMutation, {data, error, loading,} ] = useMutation(gql`${CREATE_MOF}`);
  const [createMofsuccess, setCreateMofsuccess] = useState<boolean>(false);
  const createMof = async (mof_data: createMofInterface) => {
      try {
          await createMofMutation({ variables:{newMof: mof_data} });
          setCreateMofsuccess(true);
      } catch (err) {
        setCreateMofsuccess(false);
      }
  };
  return { createMof, createMofLoading: loading, createMofError: error, createMofSuccess: data, setCreateMofsuccess };
}

export const useUpdateMof = () => {
  const [updateMofMutation, { data, loading, error }] = useMutation(gql`${UPDATE_MOF}`);
  const [updateMofsuccess, setUpdateMofsuccess] = useState<boolean>(false);
  const updateMof = async(MofInfo: updateMofInterface) => {
      try {
          await updateMofMutation({ variables: { updateMofInput: MofInfo } });
          setUpdateMofsuccess(true);
        } catch (e) {
          setUpdateMofsuccess(false);
        }
  }
  return {updateMofSucces: data, updateMofLoading: loading, updateMofError: error, updateMof, setUpdateMofsuccess };
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
      const response = await addFavoriteCenote({ variables: { userId: favoriteCenote.userId, cenoteId: favoriteCenote.cenoteId } });
      setResult(response.data.addFavouriteCenote);
    } catch (err) {
      console.error(err);
    }
  };

  return { addCenote, favCenoteData: result, favCenoteLoading: loading, favCenoteError: error };
};

export const useChangeCenoteMainPhoto = () => {
  const [changeCenoteMainPhoto, { data, loading, error }] = useMutation(gql`${CHANGE_CENOTE_MAIN_PHOTO}`);
  const [result, setResult] = useState(null);

  const changeMainPhoto = async (cenoteId: string, photoId: string) => {
    try {
      const response = await changeCenoteMainPhoto({ variables: { cenoteId: cenoteId, photoId: photoId } });
      setResult(response?.data?.changeCenoteMainPhoto);
    } catch (err) {
      console.error(err);
    }
  };

  return { changeMainPhoto, mainPhotoResult: result, mainPhotoLoading: loading, mainPhotoError: error, mainPhotoSetResult: setResult };
};

export const useDeletePhoto = () => {
  const [deletePhoto, { data, loading, error }] = useMutation(gql`${DELETE_PHOTO}`);
  const [result, setResult] = useState(null);

  const deleteOnePhoto = async (cenoteId: string, photoId: string) => {
    try {
      const response = await deletePhoto({ variables: { cenoteId: cenoteId, photoId: photoId } });
      setResult(response?.data?.changeCenoteMainPhoto);
    } catch (err) {
      console.error(err);
    }
  };

  return { deleteOnePhoto, deletePhotoResult: result, deletePhotoLoading: loading, deletePhotoError: error, deletePhotoSetResult: setResult };
};

export const useRemoveFavoriteCenote = () => {
  const [removeFavoriteCenote, { data, loading, error }] = useMutation(gql`${REMOVE_FAVORITE_CENOTE}`);
  const [result, setResult] = useState(null);

  const removeCenote = async (favoriteCenote: AddFavoriteCenote) => {
    try {
      const response = await removeFavoriteCenote({ variables: { userId: favoriteCenote.userId, cenoteId: favoriteCenote.cenoteId } });
      setResult(response.data.removeFavouriteCenote);
    } catch (err) {
      console.error(err);
    }
  };

  return { removeCenote, delFavCenoteData: result, delFavCenoteLoading: loading, delFavCenoteError: error };
};

export const useCenoteTypes = ()=> {
    const { data, error, loading } = useQuery(gql`${GET_ENUM_CENOTE_TYPE}`);
    return {
        cenoteTypesData: data ? data.__type.enumValues : null,
        cenoteTypesError: error,
        cenoteTypesLoading: loading
    };
};

export const useAcceptMofRequest = () => {
  const [acceptMofRequestMutation, { loading, error }] = useMutation(gql`${ACCEPT_MOF_REQUEST}`);
  const [result, setResult] = useState(null);
  const acceptMofRequest = async (updateMofId: string | number) => {
    try {
      const response = await acceptMofRequestMutation({
        variables: {"updateMofId": updateMofId },
      });
      setResult(response.data.acceptMofRequest);
    } catch (err) {
      console.error("Error accepting MOF request:", err);
      throw err;
    }
  };

  return { setAcceptMofRequestResult: setResult,  acceptMofRequest, acceptMofRequesData: result, acceptMofRequesLoading: loading, acceptMofRequesError: error };
};

export const useRejectMofRequest = () => {
  const [rejectMofRequestMutation, { loading, error }] = useMutation(gql`${REJECT_MOF_REQUEST}`);
  const [result, setResult] = useState(null);
  const rejectMofRequest = async (updateMofId: string | number) => {
    try {
      const response = await rejectMofRequestMutation({
        variables: {"updateMofId": updateMofId },
      });
      setResult(response.data.rejectMofRequest);
    } catch (err) {
      console.error("Error accepting MOF request:", err);
      throw err;
    }
  };

  return { setRejectMofRequestResult: setResult,  rejectMofRequest, rejectMofRequesData: result, rejectMofRequesLoading: loading, rejectMofRequesError: error };
};