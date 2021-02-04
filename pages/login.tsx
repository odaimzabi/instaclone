import { Box, Button, Flex, Input } from '@chakra-ui/react'
import {Formik} from 'formik'
import React from 'react'
import { inMemoryToken } from '../auth/authToken'
import { useLoginMutation } from '../generated/graphql'
import Router from 'next/router'
import { withUrqlClient } from 'next-urql'
import { urqlClient } from '../utils/urqlClient'
import Head from 'next/head'

 function login(){

  

      const [{fetching:loading},login]=useLoginMutation()
      return (
 

        <Box w="100%" display="flex" alignItems="center" justifyContent="center" pos="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" mt="15rem">
          <Head>
          <title>Login</title>
        </Head>
        <Formik

       initialValues={{ email: '', password: '' }}

       validate={values => {

         const errors = {} as any;

         if (!values.email) {

           errors.email = 'Required';

         } 
         
        if (!values.password){
            errors.password='Required'
        }

         if (

           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                && values.email
         ) {

           errors.email = 'Invalid email address';

         }

         return errors;

       }}

       onSubmit={ async(values, { setSubmitting }) => {
             const response=await login(values as any)
             localStorage.setItem('token',response.data?.login.accessToken as string)
             Router.push('/')
       }}

     >

       {({

         values,

         errors,

         touched,

         handleChange,

         handleBlur,

         handleSubmit,

         isSubmitting,

         /* and other goodies */

       }) => (

         <form onSubmit={handleSubmit}>

           <Input

             type="email"

             name="email"

             onChange={handleChange}

             onBlur={handleBlur}

            placeholder="Email"

             value={values.email}
                mb="1rem"

                isInvalid={errors.email?true:false}
           />

           {errors.email && touched.email && errors.email}

           <Input

             type="password"

             name="password"

             onChange={handleChange}

            placeholder="Password"

             onBlur={handleBlur}

            isInvalid={errors.password?true:false}

             value={values.password}
             mb="1rem"
           />

           {errors.password && touched.password && errors.password}

           <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>

             Submit

           </Button>

         </form>

       )}

     </Formik>
     </Box>
      )
    }

    export default withUrqlClient(urqlClient,{ssr:false})(login)
