import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Avatar, Box, Button, Flex, Input, List, ListItem, Menu, MenuButton, MenuItem, MenuList,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Text, useDisclosure,Divider, useToast} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram,} from '@fortawesome/free-brands-svg-icons'
import {faHome,faHeart} from '@fortawesome/free-solid-svg-icons'
import Router  from 'next/router'
import axios from 'axios'
import { useAcceptRequestMutation, useDeleteRequestMutation, useMeQuery } from '../generated/graphql'

type Props = {
  children?: ReactNode
  title?: string
}


// function UserRequests({isOpen,onClose}:any){

  
//   return (
    
//   )
// }


const Layout = ({ children, title = 'This is the default title' }: Props) => {

const { isOpen, onOpen, onClose } = useDisclosure()
const [{fetching,data}]=useMeQuery()
const [,deleteRequest]=useDeleteRequestMutation()
const [,acceptRequest]=useAcceptRequestMutation()
const [scrollBehavior, setScrollBehavior] = React.useState("inside")
const [value,setValue]=useState("")
const toast=useToast()


  useEffect(()=>{

    axios("https://instaclone-backend-graphql.herokuapp.com/refresh-token",{method:"POST"})
        .then((res:any)=>{
            if (res.data.accessToken){
              localStorage.setItem('token',res.data.accessToken)
            }
        })

  },[])

  
return(
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>

    <Box bg="white" w="100%" p={3}  borderBottom="1px solid #888888" display="flex"
          alignItems="center"
          justifyContent="space-between"
          zIndex={1}
         position="relative"
         top={0}
         left={0}
    >


      <FontAwesomeIcon icon={faInstagram} size="2x" color="black"/>
        <Input placeholder="Search" width="200px" variant="filled" ml="10rem"
          onKeyDown={(e)=>{
            if (e.key=="Enter"){
              Router.push(`/search-results/${value}`)
            }
          }}
          onChange={(e)=>setValue(e.target.value)}
        />
              <List listStyleType="none" display="flex" alignItems="center" justifyContent="center">
             <ListItem p="0 12px">
               <FontAwesomeIcon icon={faHome}  cursor="pointer" color="black" size="lg" onClick={()=>Router.push('/')}/>

               <Modal isOpen={isOpen} onClose={onClose}
               
               motionPreset="slideInBottom"
               scrollBehavior={"inside"}
               >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Follow Requests</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            { data?.me?.Requests.length!=0? data?.me?.Requests.map((item)=>
              (
                <>
                <Flex>
              <Box  w="100%" p={4} color="black" mb="1rem">
                {item.from}
              </Box>
                <Flex ml="auto" flexDir="row" mt="1rem">
                  <Button mr="1rem" onClick={ async ()=>{
                    
                    const response=await acceptRequest({id:item.id})
                    if (response.data?.acceptRequest){
                    toast({description:"Friend Request accepted",status:"success"})
                    }
                  }}>Accept</Button>
                  <Button colorScheme="red" onClick={
                    async ()=>{
                    
                      const response=await deleteRequest({id:item.id})
                      if (response.data?.deleteRequest){
                      toast({description:"Friend Request has been deleted",status:"success"})
                      }
                    }
                  }>Delete</Button>
                </Flex>
                </Flex>
                <Divider/>
                </>
              )
            ):<Text>No Requests available</Text>}
          </ModalBody>
        </ModalContent>
      </Modal>
             
             </ListItem>
             <ListItem p="0 12px"  onClick={onOpen}><FontAwesomeIcon  icon={faHeart} color="red" size="lg" cursor="pointer"/></ListItem>
             <ListItem p="0 12px">

             <Menu>
          <Avatar name={data?.me?.username} size="sm" as={MenuButton}>
            
          </Avatar>
          <MenuList>
            <MenuItem onClick={()=>Router.push('/my-profile')}>My Profile</MenuItem>
            <MenuItem onClick={()=>Router.push('/create-post')}>Create Post</MenuItem>
            <MenuItem onClick={
              ()=>{
                localStorage.removeItem('token')
                Router.push('/login')
              }
            }>Logout</MenuItem>
          </MenuList>
        </Menu>

             </ListItem>
              </List>
    </Box>
    </header>
    {children}
   
  </div>

)
        }

export default Layout
