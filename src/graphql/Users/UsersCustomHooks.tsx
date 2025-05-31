import { useState, useMemo  } from "react";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"; 
import { GET_ENUM_USER_ROLE_VALUES, INVITE_USER,
      VERIFY_USER, UPDATE_USER_INFO, LOGIN, GET_ENUM_USER_PROFILE_VALUES,
      REGISTER_TOURIST, REGISTER_TEACHER, REGISTER_STUDENT, REGISTER_INVESTIGATOR, REGISTER_GOVERN,
      GET_ENUM_GOVERN_TYPE_VALUES,
      GET_ENUM_DEGREE} from "./UsersGraphql";
import {
    InviteUserInterface,
    UserInterface,
    LoginRequestDto,
    ProfileDataInterface,
} from "../../Types/UserTypes";
import { removeEmptyFields } from "../../Services/UtilsService";
import {apiRequest, BASE_API_URL} from "../../api/rest-api.ts";

//QUERIES
export const loginPost = async (loginRequestDto: LoginRequestDto) => {
    return await apiRequest(`${BASE_API_URL}/login`, 'POST', loginRequestDto);
}

export const getUsersList = async ()=> {
    return await apiRequest(`${BASE_API_URL}/api/users`, 'GET');
}

export const getUserById = async (id: string | null | undefined) => {
    return apiRequest(`${BASE_API_URL}/api/users/${id}`, 'GET');
};

export const getUserFavouriteCenotes = (id: string | null | undefined) => {
    return apiRequest(`${BASE_API_URL}/api/users/${id}/cenotes`, 'GET');
}

export const updateUser = async  (id: string | null | undefined, updatedUser: any) => {
    return await apiRequest(`${BASE_API_URL}/api/users/${id}`, 'PUT', updatedUser);
}

export const deleteUser = async  (id: string) => {
    return await apiRequest(`${BASE_API_URL}/api/users/${id}`, 'DELETE');
}

export const addFavouriteCenote = async  (userId: string | null | undefined, cenoteId: string | null | undefined) => {
    return await apiRequest(`${BASE_API_URL}/api/users/${userId}/favouriteCenotes/${cenoteId}`, 'PUT');
}

export const removeFavouriteCenote = async  (userId: string | null | undefined, cenoteId: string | null | undefined) => {
    return await apiRequest(`${BASE_API_URL}/api/users/${userId}/favouriteCenotes/${cenoteId}`, 'DELETE');
}

// Registration

export const verifyCode = async  (code: string | null | undefined ) => {
    return await apiRequest(`${BASE_API_URL}/api/invite/${code}`, 'GET');
}

export const registerInvitedUser = async  (code: string | null | undefined, updatedUser: any) => {
    return await apiRequest(`${BASE_API_URL}/api/invite/${code}`, 'POST', updatedUser);
}

export const useVerifyUser = () => {

    const [verifyUser, { data, loading, error}] = useLazyQuery(gql`${VERIFY_USER}`)
    
    const handleVerifyUser = async (code_str: string) => {
        try {
          await verifyUser({variables: {code: code_str}})
         
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('Error verifying code:', error.message);
                // Handle the error (e.g., show an error message to the user)
            } else {
                console.error('An unknown error occurred');
            }
        }
    }

    return { handleVerifyUser, data, loading, error}

}

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

    return { inviteUser, loading, error, success, dataInviteUser: data?.inviteUser };
}

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

export const useDegree = () => {
  const {data, loading, error} = useQuery(gql`${GET_ENUM_DEGREE}`);

  return {
    degreeData: data ? data.__type.enumValues : null,
    degreeError: error,
    degreeLoading: loading
};
}