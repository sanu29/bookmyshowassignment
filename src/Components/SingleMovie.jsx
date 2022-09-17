import React,{useState} from 'react';
import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { getTheaterData } from '../Slice/AllTheaterTimming';
import { useDispatch, useSelector } from 'react-redux'
export const SingleMovie = ()=>{
   
    const [movieData,setMoviedata] = useState("")
    let  {movieId}  = useParams();
    const dispatch = useDispatch()
    const TheaterData = useSelector(state=>state.TheaterData);
    console.log(movieId)
    useState(()=>{
            (async () => {
                const result = await axios.get(`https://bookmyshowadmin.saniyashaikh1.repl.co/movies/${movieId}`)
                console.log(result.data[0])
                setMoviedata(result.data[0])
            })()
    },[])
    const casting = movieData==""?"":Object.entries(movieData.Cast)
    const getDatedAndPrice = (data)=>{
     const val =    data.map((item)=>{
        var getDate = new Date(item.DateAndTime.$date.$numberLong * 1000);
        return (<>
        <Flex justifyContent={"space-evenly"} padding={'0.2rem'}>
        <h1> {getDate.toDateString()} </h1><h1>Time:{getDate.toLocaleTimeString("en-US")}</h1><h1>{item.Price}</h1>
        </Flex>
      
        </>)
    })
return val}
    const TheaterAndTime = ()=>{

   const newData = (TheaterData.data).map((item)=>{
                return (
                <>
                <Box pb={"2rem"}> {item.TheaterName}</Box>
                <h2>{getDatedAndPrice(item.val.Date)}</h2>
                </>
                )
            })
    return newData
        
    }
    if(movieData === "")
    {return(
      
            <>
             <Flex className={"mainPage"} direction={"column"} w={"100%"} justifyContent={"center"} alignItems={"center"} minHeight={'100vh'} bgColor={"gray.100"} minWidth="fit-content" >
            <Spinner color='teal.500' />
            </Flex></>
        
    )}
   
    return(
        <>
        <Flex className={"mainPage"} direction={"column"} w={"100%"} minHeight={'100vh'} bgColor={"gray.100"} minWidth="fit-content"   >
        
        <Box  display={"flex"} flexDirection={"row"} position={"relative"}    boxShadow={"lg"} border={"1px"} borderColor={"gray.300"}
                          key={movieData._id}
                          >
                          <img src={movieData.Image}  className="singleImage" height={"100px"} width={"15rem"}/>
                          <Flex width={"100%"} alignItems={"center"}  flexDirection={'column'}>
                          <Text p={'1rem'} fontSize={"1.8Rem"} fontWeight={"bold"} color={"teal.900"} pb={"1.5rem"}>{movieData.movieName}</Text>
                          <Text  fontSize={"1.2Rem"} fontWeight={"bold"} color={"teal.900"} pb={0}> {movieData.Genere} , {movieData.Language} </Text>
                            <Flex width={'100%'} justifyContent={"space-evenly"}>
                            {
                                casting.map((item,index)=>{
                                    return(
                                        <Box padding={"none"}  paddingTop={"2rem"} key={index}>  <Box height={"5rem"} width={"5rem"}  boxShadow={"xl"} borderRadius={"50%"} overflow={"hidden"}><img height={"100%"} width="100%"  src={item[1].Image} className=""/></Box>
                                        <Box><Text paddingTop={"1rem"} fontWeight={"bold"} color={"teal.900"}>{item[1].Name}</Text></Box>
                                        <Text fcolor={"teal.900"}>{item[0]}</Text>
                                        </Box>
                                    )
                                })
                            }
                            </Flex>
                          </Flex>
        
        </Box>
       <Flex backgroundColor={"teal.900"} color={"whiteAlpha.800"} justifyContent={"space-evenly"}>
       <Box margin={'1rem'}   fontWeight={"bolder"} padding={'0.3rem'} borderRadius={'15px'} minWidth={'5rem'} textAlign="center" cursor={'pointer'}>Select Location
            </Box>
        {movieData.Locations.map((item,index)=>{
            return (<Box margin={'1rem'} border={'1px'} key={index} fontWeight={"bold"} padding={'0.3rem'} borderRadius={'15px'} minWidth={'5rem'} textAlign="center" cursor={'pointer'}
            onClick={()=>{
 
                dispatch(getTheaterData({location:item,movieId: movieData._id}))}}
            >{item}
            </Box>)
        })}
         </Flex>
        
       <Flex flexDirection={"column"}>
            {TheaterData.status==="loading"?"":<Box fontSize={"1.2rem"} color={"teal.900"}>{TheaterAndTime()}</Box>}



       </Flex>                
                       
                        
                            
        </Flex>
        </>
    )
}