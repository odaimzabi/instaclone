import { Box, Heading,  Link, Spinner, Stack,Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { useUserResultsQuery } from '../../generated/graphql'
import { urqlClient } from '../../utils/urqlClient'
import NextLink from 'next/link'
interface Props {
    

}

function Feature({ title, desc, ...rest }:any) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" {...rest} borderRadius="1rem" width="350px" mb="1rem">
        <Link  href={`/search-profile/${title}`} mt={4} fontSize="18px">{title}</Link>
      </Box>
    )
  }


const search_results = (props: Props) => {
  const router=useRouter()
   const {id}=router.query
   const [{data,fetching}]=useUserResultsQuery({variables:{term:id as any}})
    console.log(data)
    if ( !fetching && data?.getUsersByTerm.length==0){
      return(
        <Layout title="Search Results">
      <Box display="grid" placeItems="center" mt="5rem">
          <Text>No results for {id}</Text>
      </Box>
      </Layout>
      )
    }
    return (  
        <Layout title="Search Results">
        
        {fetching?
         <Spinner size="xl" pos="absolute" left="50%" top="50%" transform="translate(-50%,-50%)" mt="14rem"/>:
        (<Stack spacing={8}  display="grid" placeItems="center" mt="5rem">
        {data?.getUsersByTerm.map((item,index)=>(
             <Feature
            title={item.username}
            key={index}
            />
        ))}
     
    </Stack>
        )
}
    </Layout>
    )
}

export default withUrqlClient(urqlClient,{ssr:false})(search_results)
