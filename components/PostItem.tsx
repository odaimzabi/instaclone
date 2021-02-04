import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Badge,Image,Text, Flex, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, toast, useToast } from "@chakra-ui/react"
import React from "react"
import { useEditPostMutation, useMeQuery,useDeletePostMutation } from "../generated/graphql"




function PostItem({id,creator,details,imgSrc}:any){

  const toast=useToast()


  const [{fetching:loading,data}]=useMeQuery({requestPolicy:"cache-first"})
  const [,editPost]=useEditPostMutation()
  const [,deletePost]=useDeletePostMutation()
  const [opened, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  


  const { isOpen, onOpen, onClose } = useDisclosure()
    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        baths: 2,
        title: "Modern home in city center in the heart of historic Los Angeles",
        formattedPrice: "$1,900.00",
        reviewCount: 34,
        rating: 4,
      }
      let [value, setValue] = React.useState(details)

      let handleInputChange = (e:any) => {
        let inputValue = e.target.value
        setValue(inputValue)
      }
      return(

        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" key={id}>
          <Box bg="white" w="100%" p={3}  borderBottom="1px solid #888888" display="flex">
          <Text>{creator}</Text>
          <Box ml="auto">
            {data?.me && data.me.username===creator?
            (
              <>

          <Modal isOpen={isOpen} onClose={onClose}
               
               motionPreset="slideInBottom"
               >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Text mb="8px">Details</Text>
      <Textarea
        value={value}
        onChange={handleInputChange}
        size="sm"
      />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={async ()=>{
              const response= await editPost({id,details:value})
              if (!response.data?.editPost){
                console.log("something happened")
              }
            }}>Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Popover
        returnFocusOnClose={false}
        isOpen={opened}
        onClose={close}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
        <DeleteIcon onClick={()=>setIsOpen(!opened)} boxSize="1.5em" color="red.500" cursor="pointer"/>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to delete this post?
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline">Cancel</Button>
              <Button colorScheme="red" onClick={async()=>{
                
               const response= await deletePost({id:id})
                if (response.data?.deletePost){
                  toast({description:"Post has been deleted",status:"success"})
                }
                setIsOpen(!opened)
                }}>Delete</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      <EditIcon cursor="pointer" boxSize="1.5em" onClick={onOpen} ml="1rem" />
      </>

            ):null}
          </Box>
            </Box>

      <Image src={imgSrc} alt={property.imageAlt} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {creator}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {details}
        </Box>

       
        <Box d="flex" mt="2" alignItems="center">
        </Box>
      </Box>
    </Box>


      )

}



export default PostItem