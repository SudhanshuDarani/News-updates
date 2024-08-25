import { Input, Box, Button, Card, CardBody, CardFooter, ButtonGroup, Heading, Stack, Text, FormLabel, FormControl, useToast } from '@chakra-ui/react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { addNewsData } from '../redux/newsUpdateReducer/newsAction';

const DetailsPage = () => {
    const baseUrl = "http://localhost:5000"
    const intial = {
        details: "",
        titles: "",
        dates: ""
    };
    const [newsInfo, setNewsInfo] = useState(intial);
    const [refresh, setRefresh] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const [title, setTitle] = useState();
    const [detail, setDetail] = useState();
    const [date, setDate] = useState();
    const [isFormVisible, setFormVisible] = useState(false);
    const dispatch = useDispatch();
    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate()
    const reduxNewsData = useSelector((state) => state.newsDataReducer.newsDataList);
    useEffect(() => {
        dispatch(addNewsData(newsData))
        getNewsDetails()
    }, [newsInfo])
    useEffect(() => {
        setNewsData(reduxNewsData)
    }, [reduxNewsData])
    const getNewsDetails = async () => {
        try {
            const results = await axios.get(`${baseUrl}/newsUpdate/getdetails`)
            dispatch(addNewsData(results.data))
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDelete = async (id) => {
        const result = await axios.delete(`${baseUrl}/newsUpdate/deleteNewsDetails/${id}`)
        if (result.data) {
            getNewsDetails()
            toast({
                title: "New is successfully deleted !!",
                status: "success",
                isClosable: true,
                duration: 4000,
                position: 'top'
            })
        }
    }
    return (
        <Box backgroundImage="url('https://img.freepik.com/free-vector/futuristic-poly-background_23-2148453991.jpg?semt=ais_hybrid')" backgroundSize="cover"
            backgroundPosition="center" height={"100vh"} width={"100vw"} display={"flex"} flexDirection={"column"} alignItems={"center"} p={"20pt"} gap={"20pt"}>
            <Box gap={"50pt"} width={"20%"} display={"flex"} justifyContent={"space-between"}>


                <Button onClick={() => navigate("/")} backgroundImage="linear-gradient(to right, #072A6A, #1793C3)" padding={"19pt 20pt"} fontSize={"14pt"} color={"white"} fontWeight={"500"} _hover={{ backgroundImage: "linear-gradient(to right, #072A6A, #1793C3)" }} _active={{ backgroundImage: "linear-gradient(to right, #072A6A, #1793C3)" }}>
                    Home
                </Button>
            </Box>
            <Box color={"white"} fontSize={"20pt"} fontWeight={"500"}>
                Latest News Update
            </Box>

            <Box display={"flex"} justifyContent={"center"} gap={"2%"} flexWrap={"wrap"} width={"70%"} overflowY={"scroll"} mt={"25pt"}
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                {newsData.length > 0 ? newsData.map((datas, index) => (
                    <Card key={index} w={"30%"} height={"95%"} borderRadius={"10pt"}>
                        <CardBody>
                            <Stack spacing='3'>
                                <Heading color={"#02256A"} fontSize={"20pt"}>{datas.titles}</Heading>
                                <Text>{datas.details} </Text>
                                {/* <Text>{datas.dates} </Text> */}
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='blue'
                                    onClick={() => { handleDelete(datas._id) }}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                )) : <Box color={"white"} fontSize={"20pt"} fontWeight={"500"}>
                    news not published
                </Box>}
            </Box>
            <Box color={"white"} fontSize={"20pt"} fontWeight={"500"}>
                Total Published News Count: {newsData.length}
            </Box>
        </Box>
    )
}

export default DetailsPage;