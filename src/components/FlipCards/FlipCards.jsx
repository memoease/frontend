import React, { useEffect, useState } from "react";
import CardFlip from "react-card-flip";

function FlipCards({ activeCard, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [index]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <CardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedBackToFront={0.5}
        flipSpeedFrontToBack={0.5}
      >
        <div>
          <div
            className="cardFilp"
            onClick={handleClick}
            style={{
              margin: "0 auto",
              width: "100%",
              borderRadius: "10px",
              padding: "10",
              height: "300px",
              backgroundColor: "#eeee",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 20)",
              alignItems: "center",
            }}
          >
            {activeCard.question}
          </div>
        </div>
        <div>
          <div
            className="cardFilp"
            onClick={handleClick}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "300px",
              backgroundColor: "#cccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 20)",
            }}
          >
            {activeCard.answer}
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
