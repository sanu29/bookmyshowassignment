import {Modal,ModalOverlay, Flex, ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,Box, useDisclosure, Input, Radio, RadioGroup, HStack, Checkbox, CheckboxGroup, Stack, Switch, InputGroup, InputLeftAddon, InputRightAddon, Table, Tr, Td, Select} from '@chakra-ui/react'
import {FormControl,FormLabel,FormErrorMessage,FormHelperText,Text} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postMovie } from '../Slice/AllMovies';


export function AddNewModel() {
    const [error, seterror] = useState("");
    const dispatch = useDispatch();
    const [data, setData] = useState({
        movieName:"",Image:"",
        Cast:{
            FemaleLead:{Name:"",Image:""},
            MaleLead:{Name:"",Image:""},
        }, Genere:"Comedy",Language:"Hindi",Locations:['Pune','Mumbai'],Trending:false
    })
    function ValidateData(data) {
        if (data.movieName===""||data.Image===""||data.Genere===""||data.Language===""||data.Locations.length===0) {
          seterror("Fileds cannot be empty")
          console.log(data)
        }
       else{
        seterror("");
        console.log(1)
         dispatch(postMovie(data))
         onClose()
       }
    }
    const handleCheckBox = (e)=>{
        if(e.target.checked)
        {
            setData(data=>({...data,Locations:[...data.Locations,e.target.value]}))


        }
        else{
            const newLocations = data.Locations.filter((item)=>item!==e.target.value)
            setData(data=>({...data,Locations:newLocations}))
         
        }
    }

 
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
     
                  <Box ml={'2rem'} mt={'1rem'} fontSize={'1.8rem'} fontWeight={'bolder'} display={"flex"} width={"100%"} onClick={onOpen}>
                        <Button bgColor='teal.900' color={'teal.300'} border={'0.5px'}
                        _hover={{color:'teal.900',bgColor:"teal.300"}} >Add New Movie</Button>
                    </Box>

        <Modal isOpen={isOpen} onClose={onClose}  size={'xl'} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new Movie</ModalHeader>
            <ModalCloseButton />
            
            <ModalBody padding={"0rem 2rem 2rem 2rem"}>
            {error==="" ? "" : <Text color={"red"}>{error}</Text>}
                    <FormControl mb={"1rem"} isRequired>
                    <FormLabel>Movie Name</FormLabel>
                    <Input placeholder='Movie Name' onChange={(e)=>setData(data=>({...data,movieName:e.target.value}))}/>
                    <InputGroup size='sm' marginTop={"1rem"}>
                    <InputLeftAddon children='https://' />
                    <Input placeholder='Link to Movie Poster'  onChange={(e)=>setData(data=>({...data,Image:"https:"+e.target.value}))}/>
               
                    </InputGroup>
                    </FormControl>

                    <FormControl mb={"1rem"} >
                    <FormLabel>Male Lead</FormLabel>
                    <Input size='sm' placeholder='Name of Male Lead' onChange={(e)=>setData(data=>({...data,Cast:{...data.Cast,MaleLead:{...data.Cast.MaleLead,Name:e.target.value}}}))} />
                    <InputGroup size='sm' marginTop={"1rem"} >
                    <InputLeftAddon children='https://' />
                    <Input placeholder='Link to Actor Image' onChange={(e)=>setData(data=>({...data,Cast:{...data.Cast,MaleLead:{...data.Cast.MaleLead,Image:"https://"+e.target.value}}}))}/>
      

                </InputGroup>
               </FormControl>
               <FormControl mb={"1rem"} >
                    <FormLabel>Female Lead</FormLabel>
                    <Input size='sm'  placeholder='Name of Female Lead' onChange={(e)=>setData(data=>({...data,Cast:{...data.Cast,FemaleLead:{...data.Cast.FemaleLead,Name:e.target.value}}}))}  />
                    <InputGroup size='sm' marginTop={"1rem"}>
                    <InputLeftAddon children='https://' />
                    <Input placeholder='Link to Actor Image'  onChange={(e)=>setData(data=>({...data,Cast:{...data.Cast,FemaleLead:{...data.Cast.FemaleLead,Image:"https://"+e.target.value}}}))}/>
                   </InputGroup>
                </FormControl>
                <FormLabel>Language</FormLabel>
            <Select  size={"sm"} mb={"1rem"} borderColor={"teal"} onChange={(e)=>setData(data=>({...data,Language:e.target.value}))}>
            <option defaultValue value='Hindi' >Hindi</option>
            <option value='English'>English</option>
            <option value='Marathi'>Marathi</option>
            <option value='Telgu'>Telagu</option>
            <option value='Tamil'>Tamil</option>
            <option value='Punjabi'>Punjabi</option>
            </Select>

                    <FormControl mb={"1rem"} as='fieldset'>
                    <FormLabel as='legend'>Genere</FormLabel>
                    <Select  size={"sm"} mb={"1rem"} borderColor={"teal"} onChange={(e)=>setData(data=>({...data,Genere:e.target.value}))}>
                        <option defaultChecked value='Comedy' >Comedy</option>
                        <option value='Drama'>Drama</option>
                        <option value='Romance'>Romance</option>
                        <option value='Adventure'>Adventure</option>
                        </Select>
                    </FormControl>
                    <CheckboxGroup colorScheme='teal' defaultValue={['Pune', 'Mumbai']}>
                    <FormLabel as='legend' >Location</FormLabel>
              
                  
                     <Box display={"flex"} justifyContent={"space-around"}>
                        <Checkbox value='Pune' onChange={(e)=>handleCheckBox(e)}>Pune</Checkbox>
                        <Checkbox value='Chennai' onChange={(e)=>handleCheckBox(e)}>Chennai</Checkbox>   
                        <Checkbox value='Kolkata' onChange={(e)=>handleCheckBox(e)}>Kolkata</Checkbox>    
                        </Box>
                        <Box display={"flex"} justifyContent={"space-around"}>
                         <Checkbox value='Mumbai' onChange={(e)=>handleCheckBox(e)}>Mumbai</Checkbox> 
                         <Checkbox value='Delhi' onChange={(e)=>handleCheckBox(e)}>Delhi</Checkbox>    
                          <Checkbox value='Bengaluru' onChange={(e)=>handleCheckBox(e)}>Bengaluru</Checkbox>
                     </Box>
                 
                </CheckboxGroup>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' onClick={()=>ValidateData(data)}  mr={3} >
               Submit
              </Button>
              <Button variant='ghost' >Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }