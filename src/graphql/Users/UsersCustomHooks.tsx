import React,  { useState, useEffect, useCallback, useMemo  } from "react";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"; 
import { ALL_USERS, ALL_USERS_BY_SORT, USER_BY_ID, GET_ENUM_USER_ROLE_VALUES, INVITE_USER, DELETE_USER, 
      PROFILE_DATA_FIELDS, VERIFY_USER, UPDATE_USER_INFO, LOGIN, GET_USER_BY_EMAIL, GET_ENUM_USER_PROFILE_VALUES,
      REGISTER_TOURIST, REGISTER_TEACHER, REGISTER_STUDENT, REGISTER_INVESTIGATOR, REGISTER_GOVERN,
    GET_ENUM_GOVERN_TYPE_VALUES} from "./UsersGraphql";
import { InviteUserInterface, PaginationInterface, SortInterface, UserInterface, LoginInterface, ProfileDataInterface } from "../../Types/UserTypes";
import { removeEmptyFields } from "../../Services/UtilsService";

//QUERYS
export const useUsers = (initialPagination: PaginationInterface, initialSort: SortInterface,  initialName: string | null = null) => {
    const [pagination, setPagination] = useState<PaginationInterface>(initialPagination);
    const [sort, setSort] = useState<SortInterface>(initialSort);
    const [name, setName] = useState<string | null>(initialName);
  
    const { data, error, loading, refetch } = useQuery(gql`${ALL_USERS_BY_SORT}`, {
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

    const searchUserByName = useCallback((newName: string | null) => {
          setName(newName);
    }, []);

    useEffect(() => {
        refetch();
    }, [pagination, sort, refetch]);

    useEffect(() => {
      refetch();
  }, [name, refetch]);


    return {
        usersData: data ? data.getUsers : [],
        usersError: error,
        usersLoading: loading,
        refetchUsers: refetch,
        updatePagination,
        updateSort,
        searchUserByName,
        currentSortOrder: sort.sortOrder 
    };
};

export const useUsersList = ()=> {
    const { data, error, loading } = useQuery(gql`${ALL_USERS}`);
    return {
        usersData: data ? data.getUsers : null,
        usersError: error,
        usersLoading: loading
    };
}

export const useVerifyUser = () => {

    const [verifyUser, { data, loading, error}] = useLazyQuery(gql`${VERIFY_USER}`)
    
    const handleVerifyUser = async (code_str: string) => {
        try {
          await verifyUser({variables: {code: code_str}})
         
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Error verifying code:', error.message);
                console.error('Error verifying code:', error.message);
                // Handle the error (e.g., show an error message to the user)
            } else {
                console.error('An unknown error occurred');
            }
        }
    }

    return { handleVerifyUser, data, loading, error}

}

export const useUserByEmail = (email: string) => {
  const { data, loading, error } = useQuery(gql`${GET_USER_BY_EMAIL}`, {
    variables: { email },
    skip: !email,
  });

  const [user, setUser] = useState<UserInterface | undefined>(undefined);

  useEffect(() => {
    if (data && !loading && !error) {
      setUser(data.getUserByEmail);
    }
  }, [data, loading, error]);

  return { user, loading, error };
};

export const useGetUserById = (id: string | null) => {
  const { data, loading, error } = useQuery(gql`${USER_BY_ID}`, {
    variables: { getUserByIdId: id },
    skip: !id, // Skip query if no id is provided
  });

  return { userData: data?.getUserById, loadingData:loading, errorData: error };
};

//MUTATIONS
export const useInviteUser = () => {
    const [ inviteUserMutation, {data, error, loading,} ] = useMutation(gql`${INVITE_USER}`);
    const [success, setSuccess] = useState<boolean>(false);

    const inviteUser = async (variables: InviteUserInterface) => {
        try {
            await inviteUserMutation({ variables });
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
    };

    return { inviteUser, loading, error, success };
}

export const useDeleteUser = () => {
    const [deleteUser, { data, loading, error }] = useMutation(gql`${DELETE_USER}`);
  
    const handleDeleteUser = async (userId: string) => {
      try {
        await deleteUser({ variables: { userId } });
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    };
  
    return {
      handleDeleteUser,
      deleteUserData: data,
      deleteUserLoading: loading,
      deleteUserError: error,
    };
};

export const useUpdateUserInfo = () => {
    const [updateUser, { data, loading, error }] = useMutation(gql`${UPDATE_USER_INFO}`);

    const updateUserInfo = async(id: string, userInfo: UserInterface) => {
        try {
            const r = await updateUser({ variables: {
                userInfo: userInfo,
                userId: id
              } });
            console.log(r)
          } catch (e) {
            console.error(e);
          }
    }
    return {data, loading, error, updateUserInfo };
}

export const useAuth = () => {
  const [loginMutation, { data, loading, error }] = useMutation(gql`${LOGIN}`);

  const login = async (loginData: LoginInterface) => {
    try {
      const response = await loginMutation({ variables: loginData });
      const token = response.data.login;
      return { token };
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  return {
    login,
    data,
    loading,
    error,
  };
};

export const useRegister = (userProfile: string) => {
  const REGISTER = useMemo(() => {
    switch(userProfile) {
      case 'TOURIST':
        return REGISTER_TOURIST;
      case 'TEACHER':
        return REGISTER_TEACHER;
      case 'STUDENT':
        return REGISTER_STUDENT;
      case 'INVESTIGATOR':
        return REGISTER_INVESTIGATOR;
      case 'GOVERN':
        return REGISTER_GOVERN;
      default:
        return REGISTER_TOURIST;
    }
  }, [userProfile]);

  const [register, { data, loading, error }] = useMutation(gql`${REGISTER}`);
  const registerUser = async (userInfo: UserInterface, profileData: ProfileDataInterface) => {
    try {
      const sanitizedProfileData = removeEmptyFields(profileData);
      const r = await register({ variables: { userInfo: userInfo, profileData: sanitizedProfileData  } });
      console.log(r)
    } catch (e) {
      console.error(e);
    }
  };

  return {data, loading, error, registerUser };
};

//ENUMS

export const useUserRoles = ()=> {
  const { data, error, loading } = useQuery(gql`${GET_ENUM_USER_ROLE_VALUES}`);

  return {
      rolesData: data ? data.__type.enumValues : null,
      rolesError: error,
      rolesLoading: loading
  };
}

export const useUserProfile = () => {
  const {data, loading, error} = useQuery(gql`${GET_ENUM_USER_PROFILE_VALUES}`);

  return {
    profileData: data ? data.__type.enumValues : null,
    profileError: error,
    profileLoading: loading
};
}

export const useGovernType = () => {
  const {data, loading, error} = useQuery(gql`${GET_ENUM_GOVERN_TYPE_VALUES}`);

  return {
    governData: data ? data.__type.enumValues : null,
    governError: error,
    governLoading: loading
};
}