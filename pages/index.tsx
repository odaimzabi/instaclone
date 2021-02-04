import Link from 'next/link'
import Layout from '../components/Layout'
import {Box, Button,Center,Flex, Skeleton, VStack} from '@chakra-ui/react'
import PostItem from '../components/PostItem'
import React, { useEffect, useState } from 'react'
import { useFollowRequestSentSubscription, useMeQuery, usePaginatePostsQuery } from '../generated/graphql'
import { withUrqlClient } from 'next-urql'
import {urqlClient}  from '../utils/urqlClient'
import { useToast } from "@chakra-ui/react"

const IndexPage = () =>{ 

  const toast=useToast()



  const [page,setPage]=useState(1)
  const [{data:request}]=useFollowRequestSentSubscription()
  const [{data,fetching}]=usePaginatePostsQuery({variables:{page}})
  
  
 

  useEffect(()=>{
    if (request?.followRequestSent.from){
      toast({description:`${request.followRequestSent.from} has sent you a follow request`,position:"top-left"})
        
    }

    

  },[request])

  return(
  <Layout title="InstaClone">

      <Box  display="grid" placeItems="center" height="100%" mt="2rem" mb="2rem">
      <Flex alignItems="center" justifyContent="center"  flexDirection="column">
      <VStack
  spacing={9}
  align="stretch"
      >
      {data?.paginatePosts?.posts?.map((item)=>(
        
        <PostItem id={item.id} creator={item.creator} details={item.details} imgSrc={item.imgSrc}/>
      ))}
    </VStack>
            {data?.paginatePosts && data?.paginatePosts?.nextPage!=-1 && data?.paginatePosts?.posts.length!=0?
            (
            <Button onClick={()=>setPage(page+1) } isLoading={fetching} mt="2rem">Load More</Button>
            ):null
            
            }
      </Flex>
      </Box>
  </Layout>
)

  }
export default withUrqlClient(urqlClient,{ssr:false})(IndexPage)
