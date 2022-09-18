import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Slider from "react-slick";
import { Icon } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function HomePage() {

    // function SampleNextArrow(props) {
    //     const { className, style, onClick } = props;
    //     return (
    //       <div
    //         className={className}
    //         style={{ ...style, display: "block", background: "red" }}
    //         onClick={onClick}
    //       />
    //     );
    //   }

    //   function SamplePrevArrow(props) {
    //     const { className, style, onClick } = props;
    //     return (
    //       <div
    //         className={className}
    //         style={{ ...style, display: "block", background: "green" }}
    //         onClick={onClick}
    //       />
    //     );
    //   }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // nextArrow: <NavigateNextIcon/>,
        // prevArrow: <ArrowBackIosIcon />,
      };


    return (
       <>
           <Slider {...settings}>
                <div>
                    <img src="/images/hero1.jpg" alt="hero" style={{display: "block", width: "100%", maxHeight: 650 }} />
                </div>
                <div>
                    <img src="/images/hero2.jpg" alt="hero" style={{display: "block", width: "100%", maxHeight: 650 }} />
                </div>
                <div>
                    <img src="/images/hero3.jpg" alt="hero" style={{display: "block", width: "100%", maxHeight: 650 }} />
                </div>
                <div>
                    <img src="/images/hero4.jpg" alt="hero" style={{display: "block", width: "100%", maxHeight: 650 }} />
                </div>
           </Slider>
           <Box display="flex" justifyContent="center" sx={{p: 10}}>
                <Typography variant="h4">
                    Snowboard Shop and Snowboarding Gear
                </Typography>
           </Box>
       </>



    )
}