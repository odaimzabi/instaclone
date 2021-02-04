import {Button} from '@chakra-ui/react'
import { useSendRequestMutation } from '../generated/graphql'

export default function CustomButton({data}:any){

    const [fetching,sendRequest]=useSendRequestMutation()
    
if (data?.searchProfile.isFollowing){
   return (<Button ml="2rem" isDisabled>Following</Button>)
}else if (data?.searchProfile.isRequested){
    return (<Button ml="2rem" isDisabled>Request Sent</Button>) 
}else if (data?.searchProfile.isFollowing==false){
    return (<Button ml="2rem" onClick={()=>{
        
        sendRequest({to:data.searchProfile.user.username})
        window.location.reload()
    }}>Follow</Button>) 
}

    return (<Button ml="2rem">Send Request</Button>)

}