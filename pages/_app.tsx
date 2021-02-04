import { CSSReset,ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react"
import { cacheExchange } from "@urql/exchange-graphcache";

import { createClient,Provider,debugExchange,fetchExchange, gql } from 'urql';
import {inMemoryToken} from '../auth/authToken'
import { simplePagination } from '@urql/exchange-graphcache/extras';
import { devtoolsExchange } from '@urql/devtools';
import { PaginatePostsDocument } from "../generated/graphql";






// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })



function MyApp({ Component, pageProps }: any) {


  return (

 <ChakraProvider theme={theme}>
   <CSSReset/>
  <Component {...pageProps} />
  </ChakraProvider>

    
  )
}

export default MyApp