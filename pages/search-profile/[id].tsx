


import {Avatar, Box,Button,Flex,Text} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import Router,{useRouter}  from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import CustomButton from '../../components/CustomButton'
import { useMeQuery, useSearchProfileQuery } from '../../generated/graphql'
import { urqlClient } from '../../utils/urqlClient'


function UserProfile(){
        const router=useRouter()
        const {id}=router.query
        const [{data,fetching}]=useSearchProfileQuery({variables:{username:id as any}})

        if (fetching){
        }

    return (
        <Layout title="Search Results">
        <Box display="grid" placeItems="center" height="65vh">
        <Flex flexDir="row">
        <Avatar size="xl"src="https://bit.ly/broken-link" mr="5rem" mb="2rem" />
        <Box mr="3rem" mt="1rem" maxW="100%">
        <Flex>
        <Text mb="5rem" fontSize="30px" >{data?.searchProfile?.user.username}</Text>
        <CustomButton data={data}/>
        </Flex>
        <Flex flexDir="column" mb="4.5rem">
            <Text>{data?.searchProfile.user.Followers?.length} Followers</Text>
        </Flex>
        </Box>
        </Flex>
        <Flex pos="absolute" top="60%" left="35%" >
            <Text>This is my bio</Text>
        </Flex>
        </Box>
        </Layout>
    )
}



export default withUrqlClient(urqlClient,{ssr:false})(UserProfile)



