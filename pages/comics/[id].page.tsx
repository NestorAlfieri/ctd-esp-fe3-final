import { GetServerSideProps, NextPage } from 'next';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { getComic } from '../../services/marvel/marvel.service'; 

interface ComicDetailsProps {
  comic: {
    id: number;
    title: string;
    description: string;
    thumbnail: { path: string; extension: string };
    textObjects: Array<{ text: string }>;
    price: number;
    oldPrice: number;
    stock: number;
  };
}

const ComicDetails: NextPage<ComicDetailsProps> = ({ comic }) => {
  const handleBuyClick = () => {
    // Logic for handling comic purchase
  };

  return (
    <Paper sx={{ backgroundColor: "gray", padding: "20px", display: "inline-block" }}>

    <Grid container spacing={0}>
      {/* Comic Image */}
      <Grid item xs={12} sm={6}
       sx={{         
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        height: "70vh", 
        '@media (max-width: 600px)': {
            height: "60vh",            
        },
    }}
      >
      <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          style={{ 
            width: 'auto', height: '90%', maxHeight: '100%' }}
        />
      </Grid>
      {/* Comic Info and Buttons */}
      <Grid item xs={12} sm={6} container direction="column" justifyContent="center" height="60vh" 
      sx={{'@media (max-width: 600px)': {
        height: "auto",            
    },}}>
        {/* Comic Title */}
        <Typography variant="h3">{comic.title}</Typography>
        {/* Comic Description */}
        <Typography variant="body1">{comic.description}</Typography>
        {/* Comic Text Objects */}
        {comic.textObjects.map((textObject, index) => (
          <Typography key={index} variant="body2">{textObject.text}</Typography>
        ))}
        {/* Comic Price */}
        <Typography variant="h4">${comic.price}</Typography>
       
      </Grid>
       {/* Buy Button */}
       <div
       style={{width:"100vw",display:"flex", alignItems:"center", justifyContent:"center", marginTop: "20px" }}
       >
       {comic.stock > 0 ? (
          <Button variant="contained" color="primary" onClick={handleBuyClick}>
            Comprar
          </Button>
        ) : (
          <Button variant="contained" color="primary" disabled>
            Sin stock disponible
          </Button>
        )}
        </div>
    </Grid>
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const comicId = params?.id as string;
  const comic = await getComic(parseInt(comicId, 10));
  console.log('Fetched comic:', comic);
  if (!comic) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      comic,
    },
  };
};

export default ComicDetails;
