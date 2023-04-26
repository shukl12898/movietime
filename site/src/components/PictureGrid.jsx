import React from "react";
import { Grid, GridItem, Image } from "@chakra-ui/react";

const PictureGrid = ({ movieImages }) => {
  const maxImageWidth = "90%";

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      columnGap={4}
      rowGap={4}
      padding={4}
      backgroundColor="black"
      width="100vw"
      data-testid="picture-grid"
    >
      {movieImages.sort(() => Math.random() - 0.5).map((image) => (
        <GridItem
                  key={image.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="350px"
                >
          <Image
            src={image.imagePath}
            alt={`Image ${image.id}`}
            width="100%"
            height="auto"
            borderRadius="10px"
            maxWidth={maxImageWidth}
            transform={`rotate(${Math.floor(Math.random() * 91) - 45}deg)`}
            border="5px solid white"
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default PictureGrid;
