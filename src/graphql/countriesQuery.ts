import gql from 'graphql-tag'

export const GET_ALL_COUNTRIES = gql`{ 
    countries {
        code
        name
        capital
        currency
    }
  }`