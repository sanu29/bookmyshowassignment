import React,{useState} from 'react';
import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../Slice/AllCategory';
import { getAllMovies } from '../Slice/AllMovies';
import { Link } from 'react-router-dom';
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,} from '@chakra-ui/react'
import { All, Adventure, Comedy,Romance,Drama } from '../Slice/FilteredSlice';
export const Explore = () =>{
    const dispatch = useDispatch()
    const allGenere = useSelector(state=>state.AllCategory);
    const allMovies = useSelector(state=>state.AllMovies);
    const filterSlice = useSelector(state=>state.FilteredSlice);
    
    console.log(filterSlice)
    useState(()=>{
            dispatch(getAllCategory())
            dispatch(getAllMovies())
    },[])
    console.log(allGenere)
    if(allGenere.status === "loading")
    {return(
      
            <>
             <Flex className={"mainPage"} direction={"column"} w={"100%"} justifyContent={"center"} alignItems={"center"} minHeight={'100vh'} bgColor={"gray.100"} minWidth="fit-content" >
            <Spinner color='teal.500' />
            </Flex></>
        
    )}
    const mainDataDisplay = (data) =>{
        console.log(filterSlice)
        if(filterSlice.filteredBy==="All")
        {
            return data
        }
        const newData = data.filter((item)=>item.Genere===filterSlice.filteredBy)
        return newData
    }
    console.log(mainDataDisplay(allMovies.data))
    return(<>
         
     <Flex    className={"mainPage"} direction={"column"} w={"100%"}  minHeight={'100vh'} bgColor={"gray.100"} minWidth="fit-content" flexWrap={'wrap'} >
        <Flex justifyContent={'center'}  alignItems={"center"} width={"100%"} flexWrap={'wrap'}>
        <Box margin={'1rem'} border={'1px'} color={filterSlice.filteredBy==="All"?"whiteAlpha.900":"black.300"} bgColor={filterSlice.filteredBy==="All"?"teal.900":"teal.300"} fontWeight={"bolder"} padding={'0.3rem'} borderRadius={'15px'} minWidth={'5rem'} textAlign="center" cursor={'pointer'}
        onClick = {()=>dispatch(All())} 
        >All
                    </Box>
            {(allGenere.data).map((item)=>{
                   return( <Box margin={'1rem'} border={'1px'}  fontWeight={"bolder"} padding={'0.3rem'} borderRadius={'15px'} minWidth={'5rem'} textAlign="center" cursor={'pointer'}
                   bgColor={filterSlice.filteredBy===item.name?"teal.900":"teal.300"} color={filterSlice.filteredBy===item.name?"whiteAlpha.900":"black.300"}
                   onClick={()=>{
                   console.log(item)
                    switch(item.name)
                    {
                      case 'Adventure' : dispatch(Adventure());
                                    break;
                      case 'Comedy' : dispatch(Comedy());
                      break;
                      case 'Drama' : dispatch(Drama());
                      break;
                      case 'Romance' : dispatch(Romance());
                      break;
                    }
                  }}
                   >
                    {item.name}
                        </Box>)
            })}
           

        </Flex>

        <Box mr={'2rem'} mt={'1rem'} fontSize={'1.8rem'} fontWeight={'bolder'} display={"flex"} width={"100%"}>
                        <Button bgColor='teal.900' color={'teal.300'} border={'0.5px'}
                        _hover={{color:'teal.900',bgColor:"teal.300"}}>More Details</Button>
                    </Box>
        <Flex justifyContent={'center'}   width={"100%"} flexWrap={'wrap'}>
        <TableContainer margin={"2rem"} textAlign={"center"}>
            <Table size='sm'>
                <Thead backgroundColor={"teal.900"} color={"whiteAlpha.700"} height={'3rem'} textAlign={"center"}>
                <Tr>
                    <Th color={"whiteAlpha.700"}>Poster</Th>
                    <Th color={"whiteAlpha.700"}>Movie Name</Th>
                    <Th color={"whiteAlpha.700"}>Male Lead</Th>
                    <Th color={"whiteAlpha.700"}>Female Lead</Th>
                    <Th color={"whiteAlpha.700"}>Genere</Th>
                    <Th color={"whiteAlpha.700"}>Language</Th>
                    <Th color={"whiteAlpha.700"}>Location</Th>
                    <Th color={"whiteAlpha.700"}></Th>
                </Tr>
                </Thead>
                <Tbody>
               { console.log(allMovies)}
            {allMovies.status==="loading"? <Spinner color='teal.500' />:(mainDataDisplay(allMovies.data)).map((item)=>{
               return( 
                <Tr>
                    <Td width={"20rem"} paddingLeft={"1rem"} >  <img src={item.Image} className="categoryImageTable"/></Td>
                    <Td  fontWeight={"bold"} paddingTop={"5rem"} color={"teal.900"} fontSize={'1.2rem'}>  {item.movieName}</Td>
                    
                    <Td padding={"none"}  paddingTop={"0rem"}>  <Box height={"4rem"} width={"4rem"} boxShadow={item.Cast.MaleLead?"xl":""} borderRadius={"50%"} overflow={"hidden"}><img height={"100%"} width="100%"  src={item.Cast.MaleLead.Image??""} className=""/></Box> 
                    <Text  paddingTop={"1rem"} fontWeight={"bold"} color={"teal.900"}>{item.Cast.MaleLead.Name??""}</Text></Td>
                    <Td padding={"none"}  paddingTop={"0rem"}>  <Box height={"4rem"} width={"4rem"}  boxShadow={item.Cast.FemaleLead?"xl":""} borderRadius={"50%"} overflow={"hidden"}><img height={"100%"} width="100%"  src={item.Cast.FemaleLead?item.Cast.FemaleLead.Image:""} className=""/></Box>
                    <Text paddingTop={"1rem"} fontWeight={"bold"} color={"teal.900"}>{item.Cast.FemaleLead?item.Cast.FemaleLead.Name:""}</Text></Td>
                    
                    <Td fontWeight={"bold"} paddingTop={"5rem"}  color={"teal.900"} fontSize={"1.1rem"}>  {item.Genere}</Td>
                    <Td fontWeight={"bold"} paddingTop={"5rem"} color={"teal.900"} fontSize={"1.1rem"}>  {item.Language}</Td>
                    <Td fontWeight={"bold"} paddingTop={"2rem"} textAlign={"center"} color={"teal.900"} fontSize={"1.1rem"} >   {item.Locations.length}
                        
                    <Link to={`/movie/${item._id}`}>
                    <Box mr={'2rem'} mt={'1rem'} fontSize={'1.8rem'} fontWeight={'bolder'} display={"flex"} width={"100%"}>
                        <Button bgColor='teal.900' color={'teal.300'} border={'0.5px'}
                        _hover={{color:'teal.900',bgColor:"teal.300"}}>More Details</Button>
                    </Box>
                    </Link>
                    
                       </Td>
                    
                </Tr>
            )})}
            </Tbody>
 </Table>
</TableContainer>
        </Flex></Flex>
    </>)
}