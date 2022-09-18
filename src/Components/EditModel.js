import {Modal,ModalOverlay, Flex, ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,Box, useDisclosure, Input, Radio, RadioGroup, HStack, Checkbox, CheckboxGroup, Stack, Switch, InputGroup, InputLeftAddon, InputRightAddon, Table, Tr, Td, Select} from '@chakra-ui/react'
import {FormControl,FormLabel,FormErrorMessage,FormHelperText,Text} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editMovie, postMovie } from '../Slice/SingleMovie';


export function EditModel(props) {
    const [error, seterror] = useState("");
    const dispatch = useDispatch();
    const [data, setData] = useState(props.selectedMovie)
    function ValidateData(data) {
        if (data.movieName===""||data.Image===""||data.Genere===""||data.Language===""||data.Locations.length===0) {
          seterror("Fileds cannot be empty")
          console.log(data)
        }
       else{
        seterror("");
        console.log(1)
         dispatch(editMovie(data))
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
     
                  <Box pos={"absolute"} right={"1rem"} ml={'1px'} p={"0"} mt={'1rem'} fontSize={'1.2rem'} fontWeight={'bolder'} display={"flex"}  onClick={onOpen}>
                        <Button bgColor='teal.300' color={'teal.900'} border={'0.5px'}
                        _hover={{color:'teal.300',bgColor:"teal.900"}} ><i className="material-icons">mode_edit</i></Button>
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
                    <Input placeholder='Movie Name' value={data.movieName} onChange={(e)=>setData(data=>({...data,movieName:e.target.value}))}/>
                    <InputGroup size='sm' marginTop={"1rem"}>
                 
                    <Input placeholder='Link to Movie Poster'  value={data.Image}  onChange={(e)=>setData(data=>({...data,Image:e.target.value}))}/>
               
                    </InputGroup>
                    </FormControl>

                    <FormControl mb={"1rem"} >
                    <FormLabel>Male Lead</FormLabel>
                    <Input size='sm' placeholder='Name of Male Lead' value={data.Cast.MaleLead.Name} onChange={(e)=>setData(data=>({...data,Cast:{...data.Cast,MaleLead:{...data.Cast.MaleLead,Name:e.target.value}}}))} />
                    <InputGroup size='sm' marginTop={"1rem"} >
                  
                    <Input placeholder='Link to Actor Image' value={data.Cast.MaleLead.Image} onChange={(e)=>setData(data=>({...data,Cast:{...data.Cast,MaleLead:{...data.Cast.MaleLead,Image:e.target.value}}}))}/>
      

                </InputGroup>
               </FormControl>
               <FormControl mb={"1rem"} >
                    <FormLabel>Female Lead</FormLabel>
                    <Input size='sm'  placeholder='Name of Female Lead' value={data.Cast.FemaleLead?data.Cast.FemaleLead.Name:""}  onChange={(e)=>setData(data=>({...data,Cast:{...data.Cast,FemaleLead:{...data.Cast.FemaleLead,Name:e.target.value}}}))}  />
                    <InputGroup size='sm' marginTop={"1rem"}>
                  
                    <Input placeholder='Link to Actor Image' value={data.Cast.FemaleLead?data.Cast.FemaleLead.Image:""}   onChange={(e)=>setData(data=>({...data,Cast:{...data.Cast,FemaleLead:{...data.Cast.FemaleLead,Image:e.target.value}}}))}/>
                   </InputGroup>
                </FormControl>
                <FormLabel>Language</FormLabel>
            <Select  size={"sm"} mb={"1rem"} borderColor={"teal"}   onChange={(e)=>setData(data=>({...data,Language:e.target.value}))}>
            <option  selected={data.Language==="Hindi"?true:false}  value='Hindi' >Hindi</option>
            <option  selected={data.Language==="English"?true:false} value='English'>English</option>
            <option  selected={data.Language==="Marathi"?true:false} value='Marathi'>Marathi</option>
            <option selected={data.Language==="Bengali"?true:false} value='Bengali'>Bengali</option>
            <option  selected={data.Language==="Tamil"?true:false} value='Tamil'>Tamil</option>
            <option   selected={data.Language==="Punjabi"?true:false} value='Punjabi'>Punjabi</option>
            <option   selected={data.Language==="Telugu"?true:false} value='Telugu'>Telugu</option>
            <option   selected={data.Language==="Kanada"?true:false} value='Kanada'>Kanada</option>
            </Select>

                    <FormControl mb={"1rem"} as='fieldset'>
                    <FormLabel as='legend'>Genere</FormLabel>
                    <Select  size={"sm"} mb={"1rem"} borderColor={"teal"} onChange={(e)=>setData(data=>({...data,Genere:e.target.value}))}>
                        <option selected={data.Genere==="Comedy"?true:false} value='Comedy' >Comedy</option>
                        <option selected={data.Genere==="Drama"?true:false} value='Drama'>Drama</option>
                        <option  selected={data.Genere==="Romance"?true:false}  value='Romance'>Romance</option>
                        <option  selected={data.Genere==="Adventure"?true:false} value='Adventure'>Adventure</option>
                        </Select>
                    </FormControl>
                    <CheckboxGroup colorScheme='teal' defaultValue={data.Locations}>
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
              <Button variant='ghost' onClick={()=>onClose()}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }