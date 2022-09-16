import React from 'react'
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
export const Header = () =>{
    return(
        <>
    <Flex justifyContent={'space-between'} alignItems={"center"} width={'100%'} height={'4rem'} bgColor={'teal.900'}
      color={'teal.200'} position={"fixed"} cursor={"pointer"} top={"0rem"} zIndex={1}>
      <Box ml={'3rem'} fontSize={'1.8rem'} fontWeight={'bold'} fontStyle={"italic"}>
            BookMyShow
      </Box>
      <Box mr={'2rem'} fontSize={'1.8rem'} fontWeight={'bolder'} display={"flex"} >
        <Button bgColor='teal.900' color={'teal.300'} border={'0.5px'}
        _hover={{color:'teal.900',bgColor:"teal.300"}}>Admin Portal</Button>
    </Box>
  
    </Flex>
    <Flex direction={"column"} justifyContent={'start'} alignItems={"center"}  width={'5rem'} 
      bgColor={'teal.900'} color={'teal.200'} position={"fixed"} pt={'4rem'} minHeight={"calc(100%)"}>
  
      <Link to={"/"}> <Button bgColor={"teal.900"} border={"none"} shadow={"none"} height={"5rem"} width={"100%"}
        textAlign={'center'} _focus={{border:'none',shadow:'none'}} _hover={{color:'teal.900',bgColor:'teal.200'}} title="HOME">
      <span className="material-icons md-48 ">home</span>
      </Button>
      </Link>
        <Link to={"/explore"}> <Button bgColor={"teal.900"} border={"none"} shadow={"none"} height={"5rem"} width={"100%"}
        textAlign={'center'} _focus={{border:'none',shadow:'none'}} _hover={{color:'teal.900',bgColor:'teal.200'}} title="Playlist">
      <span className="material-icons md-48 ">explore</span>
      </Button>
      </Link>

    </Flex>
  
  </>
  )
  
}