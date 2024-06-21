
import { gql } from "@apollo/client"; 

//FRAGMENTS
export const PROFILE_DATA_FIELDS = gql`
  fragment ProfileDataFields on ProfileData {
    companyName
    companyUrl
    school
    degree
    subject
    googleScholar
    orchid
    researchGate
    linkedin
    govern_type
    govern_institution
    govern
    institution
  }
`;

// QUERYS
export const  ALL_USERS = `
query { 
  getUsers { 
    id 
    name 
    surname 
    email 
    createdAt 
    role
    profileData {
      companyName
      companyUrl
      school
      degree
      subject
      googleScholar
      orchid
      researchGate
      linkedin
      govern_type
      govern_institution
      govern
      institution
    }
  }
}`;

export const  USERS_BY_NAME = `
  query GetUserByName($name: String) {
    getUserByName(name: $name) {
      id
      name
      surname
      email
      createdAt
    }
}`;

export const USER_BY_ID = `
query GetUserById($getUserByIdId: ID!) {
  getUserById(id: $getUserByIdId) {
    email
    name
    role
    surname
  }
}`;

export const ALL_USERS_BY_SORT = `
  query GetUsers($pagination: PaginationInput, $sort: SortField, $name: String) {
    getUsers(pagination: $pagination, sort: $sort, name: $name) {
      id
      name
      surname
      email
      createdAt
      profile
    }
}`;

export const VERIFY_USER = `
  query VerifyCode($code: String!) {
    verifyCode(code: $code) {
      id
    }
}`;

export const GET_USER_BY_EMAIL = `
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      surname
      role
      email
    }
}`;

//MUTATIONS
export const INVITE_USER =`
  mutation InviteUser($email: EmailAddress!, $name: String!, $userRole: UserRole!) {
      inviteUser(email: $email, name: $name, userRole: $userRole)  
}`;

export const DELETE_USER =`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
}`;

export const UPDATE_USER_INFO = `
mutation UpdateUserInfo($userInfo: UpdateUserInfoInput!, $userId: String!) {
  updateUserInfo(userInfo: $userInfo, userId: $userId){id name role surname}
}`;

export const LOGIN = `mutation Login($email: EmailAddress!, $password: String!) {
  login(email: $email, password: $password)
}`;

export const REGISTER_TOURIST = `
  mutation RegisterTourist($userInfo: RegisterUserInput!, $profileData: RegisterTouristInput!) {
  registerTourist(userInfo: $userInfo, profileData: $profileData) {
    id
  }
}`;

export const REGISTER_TEACHER = `
mutation RegisterTeacher($userInfo: RegisterUserInput!, $profileData: RegisterStudentInput!) {
  registerTeacher(userInfo: $userInfo, profileData: $profileData) {
    id
  }
}`;

export const REGISTER_STUDENT = `
mutation RegisterStudent($userInfo: RegisterUserInput!, $profileData: RegisterStudentInput!) {
  registerStudent(userInfo: $userInfo, profileData: $profileData) {
    id
  }
}`;

export const REGISTER_INVESTIGATOR = `
mutation RegisterInvestigator($userInfo: RegisterUserInput!, $profileData: RegisterInvestigatorInput!) {
  registerInvestigator(userInfo: $userInfo, profileData: $profileData) {
    id
  }
}`;

export const REGISTER_GOVERN  = `
mutation RegisterGovern($userInfo: RegisterUserInput!, $profileData: RegisterGovernInput!) {
  registerGovern(userInfo: $userInfo, profileData: $profileData) {
    id
  }
}`;

//ENUMS
export const GET_ENUM_USER_ROLE_VALUES = `
  query GetEnumValues {
    __type(name: "UserRole") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_USER_PROFILE_VALUES = `
  query GetEnumValues {
    __type(name: "UserProfile") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_GOVERN_TYPE_VALUES = `
  query GetEnumValues {
    __type(name: "GovernType") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ENUM_THEME_VALUES = `
  query GetEnumValues {
    __type(name: "VariableTheme") {
      name
      enumValues {
        name
      }
    }
  }
`;

