import React, { useState } from "react";
import CardFlip from "react-card-flip";

function FlipCards() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <CardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedBackToFront={2}
        flipSpeedFrontToBack={2}
      >
        <div>
          <div
            onClick={handleClick}
            style={{
              border: "1px solid ",
              margin: "0 auto",
              width: "60%",
              borderRadius: "10px",
              height: "300px",
              backgroundColor: "lightblue",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Frontd
          </div>
        </div>
        <div>
          <div
            onClick={handleClick}
            style={{
              borderRadius: "10px",
              border: "2px solid",
              width: "60%",
              height: "300px",
              backgroundColor: "#E4F2E7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            Back
          </div>
        </div>
      </CardFlip>
    </div>
  );
}

export default FlipCards;

// import * as React from "react";
// import Box from "@mui/joy/Box";
// import Card from "@mui/joy/Card";
// import CardCover from "@mui/joy/CardCover";
// import CardContent from "@mui/joy/CardContent";
// import Typography from "@mui/joy/Typography";

// export default function CardLayers3d() {
//   return (
//     <Box
//       sx={{
//         perspective: "1000px",
//         transition: "transform 0.4s",
//         "& > div, & > div > div": {
//           transition: "inherit",
//         },
//         "&:hover": {
//           "& > div": {
//             transform: "rotateY(30deg)",
//             "& > div:nth-child(2)": {
//               transform: "scaleY(0.9) translate3d(10px, 10px, 10px)",
//             },
//             "& > div:nth-child(3)": {
//               transform: "translate3d(-100px, -150px, -150px)",
//             },
//           },
//         },
//       }}
//     >
//       <Card
//         variant="outlined"
//         sx={{
//           minHeight: "280px",
//           width: 320,
//           backgroundColor: "#387373",
//           borderColor: "#000",
//         }}
//       >
//         <Typography level="h2" fontSize="lg" textColor="#000">
//           Languagequizz
//         </Typography>
//         <CardCover
//           sx={{
//             background:
//               "linear-gradient(to top, #387373, rgba(0,0,0,0) 200px), linear-gradient(to top, #E4F2E7, rgba(0,0,0,0) 300px)",
//             border: "1px solid",
//             borderColor: "#777",
//             backdropFilter: "blur(0px)",
//           }}
//         >
//           <Typography level="h2" fontSize="lg" textColor="#fff">
//             Car
//           </Typography>
//         </CardCover>
//         <CardContent
//           sx={{
//             alignItems: "center",
//             justifyContent: "center",
//             background: "linear-gradient(to top, rgba(0,0,0,0.3), #E4F2E7)",
//             border: "1px solid",
//             borderColor: "#000",
//             backdropFilter: "blur(5px)",
//           }}
//         >
//           <Typography level="h2" fontSize="lg" textColor="#fff" m={2}>
//             Auto
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
