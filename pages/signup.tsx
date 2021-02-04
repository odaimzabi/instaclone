import { Box, Button, Flex, Input } from '@chakra-ui/react'
import {Formik} from 'formik'
import Head from 'next/head';
import React from 'react'


export default function signup(){


    
      return (
        
        <Box w="100%" display="flex" alignItems="center" justifyContent="center" pos="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" mt="15rem">
          <Head>
          <title>Sign Up</title>
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

       onSubmit={(values, { setSubmitting }) => {

         setTimeout(() => {

           alert(JSON.stringify(values, null, 2));

           setSubmitting(false);

         }, 400);

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

           <Button type="submit" colorScheme="teal" disabled={isSubmitting}>

             Submit

           </Button>

         </form>

       )}

     </Formik>
     </Box>
      )
    }



