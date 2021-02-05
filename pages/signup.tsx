import { Box, Button, Flex, Heading, Input, Link,Text, useToast } from '@chakra-ui/react'
import {Formik} from 'formik'
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react'
import { useSignUpMutation } from '../generated/graphql';
import { urqlClient } from '../utils/urqlClient';


 function signup(){


    const [{fetching},signUp]=useSignUpMutation()
    const toast=useToast()
      return (
        
        <Box w="100%" display="flex" alignItems="center" justifyContent="center" pos="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" mt="15rem" flexDir="column">
          <Heading mb="1rem">Sign Up</Heading>
          <Head>
          <title>Sign Up</title>
        </Head>
        <Formik

       initialValues={{ email: '', password: '',username:"" }}

       validate={values => {

         const errors = {} as any;

         if (!values.email) {

           errors.email = 'Required';

         } 
         
        if (!values.password){
            errors.password='Required'
        }

        if (!values.username){
          errors.username='Required'
      }

         if (

           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                && values.email
         ) {

           errors.email = 'Invalid email address';

         }

         return errors;

       }}

       onSubmit={ async (values, { setSubmitting }) => {

          const response=await signUp({userDetails:values as any})
            if (response.error?.message){
                toast({description:"User already Exist! Please choose another Email",status:"error"})
            }
          if (response.data?.signUp!=null){
            Router.push('/login')
          }
           setSubmitting(false);


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

<Input

type="text"

name="username"

onChange={handleChange}

placeholder="Username"

onBlur={handleBlur}

isInvalid={errors.username?true:false}

value={values.username}
mb="1rem"
/>

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


            

           <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>

             Submit

           </Button>

           <Flex mt="1rem">
            <Text>Already have an account?</Text> <Link href="/login" color="teal.500" ml="0.5rem">Login</Link>
            </Flex>

         </form>

         

       )}

     </Formik>
     </Box>
      )
    }

    export default withUrqlClient(urqlClient,{ssr:false})(signup)


