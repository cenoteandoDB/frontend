import { gql } from '@apollo/client';

export const UPDATE_CENOTE_FRAGMENT = gql`
  fragment UpdateCenoteFields on Cenote {
    id
    name
    type
    touristic
    issues
    alternativeNames
  }
`;
