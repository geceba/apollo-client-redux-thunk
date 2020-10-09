import { gql } from '@apollo/client';


export const GET_CHARS = gql`
    query ($page:Int){
        characters(page:$page){
        info{
            pages
            next
            prev
        }
        results{
            name
            image
        }
        }
    }
`