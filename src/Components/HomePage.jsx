import { Input, Box, Button, Card, CardBody, CardFooter, ButtonGroup, Heading, Stack, Text, FormLabel, FormControl, useToast } from '@chakra-ui/react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { addNewsData } from '../redux/newsUpdateReducer/newsAction';
const HomePage = () => {
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
    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };
    const toast = useToast()


    const reduxNewsData = useSelector((state) => state.newsDataReducer.newsDataList);

    useEffect(() => {
        dispatch(addNewsData(newsData))
        getNewsDetails()
    }, [newsInfo])
    const getNewsDetails = async () => {
        try {
            const results = await axios.get(`${baseUrl}/newsUpdate/getdetails`)
            dispatch(addNewsData(results.data))
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        setNewsData(reduxNewsData)
    }, [reduxNewsData])
    const handleChange = (e) => {
        const { name, value } = e.target;
        const inputValue = value;
        const charCount = inputValue.replace(/\s+/g, '').length;

        setNewsInfo({ ...newsInfo, [name]: value })
        if (name === "titles" && charCount <= 100) {
            setTitle(value);
        } else if (name === "details" && charCount <= 500) {
            setDetail(value);
        } else if (name === "dates") {
            setDate(value)
        }
    };
    const newsUpdation = async (data) => {
        try {
            const results = await fetch(`${baseUrl}/newsUpdate/postNewsDetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(async (response) => {
                const json = await response.json();
                if (json.success) {
                    setNewsInfo(intial)
                    toast({
                        title: "New added successfully !!",
                        status: "success",
                        isClosable: true,
                        duration: 4000,
                        position: 'top'
                    })
                }
            })
        } catch (err) {
            console.log("Error in updating news ", err.message);
        }
    };
    const sentNews = () => {
        newsUpdation(newsInfo)
        setTitle("");
        setDetail("");
        setDate("");
    };

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
        <>
            <Box backgroundImage="url('https://img.freepik.com/free-vector/futuristic-poly-background_23-2148453991.jpg?semt=ais_hybrid')" backgroundSize="cover"
                backgroundPosition="center" height={"100vh"} width={"100vw"} display={"flex"} flexDirection={"column"} alignItems={"center"} p={"20pt"} gap={"20pt"}>
                <Box gap={"50pt"} width={"20%"} display={"flex"} justifyContent={"space-between"}>

                    <Button onClick={toggleFormVisibility} backgroundImage="linear-gradient(to right, #072A6A, #1793C3)" padding={"19pt 20pt"} fontSize={"14pt"} color={"white"} fontWeight={"500"} _hover={{ backgroundImage: "linear-gradient(to right, #072A6A, #1793C3)" }} _active={{ backgroundImage: "linear-gradient(to right, #072A6A, #1793C3)" }}>
                        {isFormVisible ? 'Create News Update' : 'Create News Update'}
                    </Button>

                    <Button onClick={() => navigate("/detailsPage")} backgroundImage="linear-gradient(to right, #072A6A, #1793C3)" padding={"19pt 20pt"} fontSize={"14pt"} color={"white"} fontWeight={"500"} _hover={{ backgroundImage: "linear-gradient(to right, #072A6A, #1793C3)" }} _active={{ backgroundImage: "linear-gradient(to right, #072A6A, #1793C3)" }}>
                        News Details
                    </Button>
                </Box>
                {isFormVisible && (
                    <Box w={"35%"} h={"420pt"} display={"flex"} flexDirection={"column"} backgroundColor={"rgba(2, 26, 86, 0.8)"} color={"white"} p={"18pt 35pt"} borderRadius={"10pt"} backgr>

                        <FormLabel mt={"20pt"} fontSize={"18pt"}>Title <span style={{ color: "red" }}>*</span></FormLabel>
                        <Input name='titles' placeholder='Titles' value={title} type='text'
                            variant={"unstyled"} border={"2pt solid #DDE3EB"} onChange={handleChange}
                            width={"90%"} padding={"8pt 10pt"} fontSize={"17pt"} backgroundColor={"white"} color={"black"}
                        />

                        <FormLabel mt={"20pt"} fontSize={"18pt"}>Detail <span style={{ color: "red" }}>*</span></FormLabel>
                        <Input name='details' placeholder='Details' value={detail} type='text'
                            variant={"unstyled"} border={"2pt solid #DDE3EB"} onChange={handleChange}
                            width={"90%"} padding={"8pt 10pt"} fontSize={"17pt"} backgroundColor={"white"} color={"black"} />

                        <FormLabel mt={"20pt"} fontSize={"18pt"}>Date <span style={{ color: "red" }}>*</span></FormLabel>
                        <Input name='dates' placeholder='Date' value={date} type='date' min={today}
                            variant={"unstyled"} border={"2pt solid #DDE3EB"} onChange={handleChange}
                            width={"90%"} padding={"8pt 10pt"} fontSize={"17pt"} backgroundColor={"white"} color={"black"} />

                        <Button onClick={sentNews} color={"#000042"} mt={"30pt"} width={"90%"} padding={"9pt 10pt"}
                            fontFamily={"sans-serif"} fontWeight="300" fontSize={["15pt"]}>
                            Publish News
                        </Button>
                    </Box>
                )}
                <Box display={"flex"} justifyContent={"center"} gap={"2%"} flexWrap={"wrap"} width={"70%"} overflowY={"scroll"} mt={"25pt"}
                    sx={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    {newsData.length > 0 ? newsData.map((datas, index) => (
                        <Card key={index} w={"15%"} height={"95%"} borderRadius={"10pt"}>
                            <CardBody>
                                <Stack spacing='3'>
                                    <Heading color={"#02256A"} fontSize={"30pt"}>{datas.titles}</Heading>
                                    <Text>{datas.details} </Text>
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

        </>
    )
}

export default HomePage;