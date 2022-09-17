import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '../Slice/AllMovies'
import { Box, Button, Flex ,Spinner,Text, useInterval} from '@chakra-ui/react'
import '../App.css'
import { getAllCategory } from '../Slice/AllCategory'
import { Adventure, Comedy, Drama, Romance } from '../Slice/FilteredSlice'
import { Link } from 'react-router-dom';
export const Home = () =>{
    const dispatch = useDispatch()
    useState(()=>{
        dispatch(getAllMovies())
        dispatch(getAllCategory())
    },[])

    let i =0;
    const allMovieData = useSelector(state=>state.AllMovies);
    const allGenere = useSelector(state=>state.AllCategory);
    console.log(allGenere)
    const TrendingMovie = allMovieData.status==="loaded"?(allMovieData.data).filter((item)=>item.Trending===true):{};
    const [indexOfSlider, setIndexSlider] = useState(0) 
    
    const goToNext = ()=>  indexOfSlider<TrendingMovie.length-1?setIndexSlider(indexOfSlider=>indexOfSlider+1):setIndexSlider(0)
    const goToPrevious = ()=>indexOfSlider>0?setIndexSlider(indexOfSlider=>indexOfSlider-1):setIndexSlider(TrendingMovie.length-1)
     useInterval(()=>{
        goToNext()
    },3000)
    if(allMovieData.status=="loading")
    {
        return(
            <>
             <Flex    className={"mainPage"} direction={"column"} w={"100%"} justifyContent={"center"} alignItems={"center"} minHeight={'100vh'} bgColor={"gray.100"} minWidth="fit-content" >
            <Spinner color='teal.500' />
            </Flex></>
        )
    }
    return(<>
        
                <Flex  className={"mainPage"} direction={"column"} w={"100%"} justifyContent={""} alignItems={"center"} minHeight={'100vh'} bgColor={"gray.100"} minWidth="fit-content" >
              
                <Box display={"flex"} margin={"0rem 2rem"} justifyContent={"center"} position={"relative"} minWidth={"100%"} maxWidth={"70%"} height={"25rem"} 
                         >
                <Box className="material-icons" position={"absolute"} top={"7rem"} left={"0"} color={"white"} cursor={"pointer"}
                    onClick={()=>goToPrevious()}>chevron_left</Box>
                    {console.log(indexOfSlider)}
                    
                  <img src={TrendingMovie[indexOfSlider].HeroImage} width={"100%"} height={"20rem"} />
                   
                {/* <Text position={"absolute"} top={"1rem"} left={"1rem"} color={"cyan.300"} fontSize={"1.5rem"} fontWeight={"bold"} fontStyle={"italic"}>Trending Movies</Text> */}
                <Box className="material-icons" position={"absolute"} top={"7rem"} right={"0"} color={"white"} cursor={"pointer"}
                onClick={()=>goToNext()}
                >navigate_next</Box>
                </Box>
               
                <Box w={"100%"}>
                 <Text textAlign={"center"} fontSize={"2rem"} fontWeight={"semibold"} bgColor={"teal.900"} color={"white"} p={"0.9rem"} pb={"2rem"}> Genere </Text>
                <Flex flexWrap={"wrap"} w={"100%"} padding={"1rem"} pt={'1rem'} height={"fit-content"} alignItems={"center"} pb={"2rem"} bgColor={"teal.900"} mb={"2rem"} justifyContent={"space-between"}>
      
                {allGenere.status==="loading"?<Spinner color='teal.500' />:(allGenere.data).map((item)=>{
          return(
            <>
            
            <Box bgColor={'#ffffff'}  height={"100%"} width={"12rem"}  boxShadow={"lg"} border={"1px"} borderColor={"gray.200"} position={"relative"}>
           <Link to={"/explore"}>
            <Button colorScheme='teal' borderRadius={"none"}  variant='solid' position={"absolute"} bottom={"0px"} className="categories"
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
            >{item.name}</Button></Link>
            </Box>
       
            </>
          )
        })}
        </Flex>
        <Box>
        <Text textAlign={"center"} fontSize={"1.5rem"} fontWeight={"bold"} color={"teal.900"} > RECOMENDED </Text>
        <Flex justifyContent={"center"} w={"100%"} flexWrap={"wrap"}>
        {(allMovieData.data).filter((item,index)=>index>5 && index <10).map((item)=>{
            return(
             
              <Link to={`/movie/${item._id}`}>
              <Box bgColor={'#ffffff'} key={item._id} className={"trending"} height={"18rem"} width={"15rem"}  margin={"1rem"} boxShadow={"lg"} border={"1px"} borderColor={"gray.200"}
           
              >
              <img src={item.Image} className="categoryImage" height={"100%"}/>
              <Text pl={'5px'} fontWeight={"semibold"} marginTop={"1rem"}>{item.title}</Text>
              </Box>
              </Link>
            )
          })}
        </Flex>
      </Box>

       
        </Box></Flex>   
    </>)
}


