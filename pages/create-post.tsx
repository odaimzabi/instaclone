import { Box, Button, Flex, Input, Textarea } from '@chakra-ui/react'
import {Formik} from 'formik'
import React from 'react'
import { inMemoryToken } from '../auth/authToken'
import { useCreatePostMutation, useLoginMutation, useMeQuery } from '../generated/graphql'
import Router from 'next/router'
import { withUrqlClient } from 'next-urql'
import { urqlClient } from '../utils/urqlClient'
import Head from 'next/head'

 function createPost(){

      const [{fetching:loading},createPost]=useCreatePostMutation()
      const [{fetching,data}]=useMeQuery()
      return (
        
        <Box w="100%" display="flex" alignItems="center" justifyContent="center" pos="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" mt="15rem">
          <Head>
          <title>Create Post</title>
        </Head>
        <Formik

       initialValues={{ ImageSrc: '', details: '',creator:""}}

       validate={values => {

         const errors = {} as any;

         if (!values.ImageSrc) {

           errors.ImageSrc = 'Required';

         } 
         
        if (!values.details){
            errors.password='Required'
        }

      

         return errors;

       }}

       onSubmit={ async(values, { setSubmitting }) => {

              values.creator= data?.me?.username as any
             const response=await createPost(
              {creator:values.creator,
              details:values.details,imgSrc:values.ImageSrc} as any
              )

             console.log(response)
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

             type="text"

             name="ImageSrc"

             onChange={handleChange}

             onBlur={handleBlur}

            placeholder="Image Source"

             value={values.ImageSrc}
                mb="1rem"

                isInvalid={errors.ImageSrc?true:false}
           />

           {errors.ImageSrc && touched.ImageSrc && errors.ImageSrc}

           <Textarea

             type="text"

             name="details"

             onChange={handleChange}

            placeholder="Details"

             onBlur={handleBlur}

            isInvalid={errors.details?true:false}

             value={values.details}
             mb="1rem"
           />

           {errors.details && touched.details && errors.details}

           <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>

             Submit

           </Button>

         </form>

       )}

     </Formik>
     </Box>
      )
    }

    export default withUrqlClient(urqlClient,{ssr:false})(createPost)
