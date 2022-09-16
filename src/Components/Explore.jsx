import React,{useState} from 'react';
import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../Slice/AllCategory';
import { getAllMovies } from '../Slice/AllMovies';
export const Explore = () =>{
    const dispatch = useDispatch()
    const allGenere = useSelector(state=>state.AllCategory);
    const allMovies = useSelector(state=>state.AllMovies);
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
    return(<>
         
     <Flex    className={"mainPage"} direction={"column"} w={"100%"}  minHeight={'100vh'} bgColor={"gray.100"} minWidth="fit-content" flexWrap={'wrap'} >
        <Flex justifyContent={'center'}  alignItems={"center"} width={"100%"} flexWrap={'wrap'}>
        <Box margin={'1rem'} border={'1px'}  fontWeight={"bolder"} padding={'0.3rem'} borderRadius={'15px'} minWidth={'5rem'} textAlign="center" cursor={'pointer'}>All
                    </Box>
            {(allGenere.data).map((item)=>{
                   return( <Box margin={'1rem'} border={'1px'}  fontWeight={"bolder"} padding={'0.3rem'} borderRadius={'15px'} minWidth={'5rem'} textAlign="center" cursor={'pointer'}>{item.name}
                    </Box>)
            })}
           

        </Flex>
        <Flex justifyContent={'center'}   width={"100%"} flexWrap={'wrap'}>
            <table>
               { console.log(allMovies)}
            {allMovies.status==="loading"? <Spinner color='teal.500' />:allMovies.data.map((item)=>{
               return( 
                <tr>
                    <td>  <img src={item.Image} className="categoryImageTable"/></td>
                    <td>  {item.movieName}</td>
                    <td>  <img src={item.Cast.MaleLead.Image??""} className=""/> {item.Cast.MaleLead.Name??""}</td>
                    <td>  <img src={item.Cast.FemaleLead?item.Cast.FemaleLead.Image:""} className=""/> {item.Cast.FemaleLead?item.Cast.FemaleLead.Name:""}</td>
                    <td>  {item.Genere}</td>
                    <td>  {item.Language}</td>
                    <td>  {item.Locations.map((item)=><li>{item}</li>)}</td>
                    <td></td>
                </tr>
            )})}
    </table>
        </Flex></Flex>
    </>)
}