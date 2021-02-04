import {Avatar, Box,Button,Flex,Text} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import Layout from '../components/Layout'
import { useMeQuery } from '../generated/graphql'
import { urqlClient } from '../utils/urqlClient'


function MyProfile(){

    const [{fetching,data}]=useMeQuery({requestPolicy:"cache-first"})
    return (
        <Layout title="My Profile">
        <Box display="grid" placeItems="center" height="65vh">
        <Flex flexDir="row">
        <Avatar size="xl"src="https://bit.ly/broken-link" mr="5rem" mb="2rem" />
        <Box mr="3rem" mt="1rem" maxW="100%">
        <Flex>
        <Text mb="5rem" fontSize="30px" >{data?.me?.username}</Text>
        <Button ml="2rem">Edit Profile</Button>
        </Flex>
        <Flex flexDir="column" mb="4.5rem">
            <Text>{data?.me?.Followers?.length} Followers</Text>
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



export default withUrqlClient(urqlClient,{ssr:false})(MyProfile)