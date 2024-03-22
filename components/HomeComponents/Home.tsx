import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { Box, Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import ComicCard from 'dh-marvel/components/comicCard';
import { ComicType } from 'types/types';

interface HomeProps {
    comics: ComicType[];
}
const Home: NextPage<HomeProps> = ({ comics }) => {
    const router = useRouter();
    const [page, setPage] = useState(1);

    const handlePrevPage = () => {
        const newPage = Math.max(page - 1, 1);
        router.push(`/?page=${newPage}`); 
        setPage(newPage);
    };

    const handleNextPage = () => {
        const newPage = page + 1;
        router.push(`/?page=${newPage}`); 
        setPage(newPage);
    };
    return (
       <>
                
                <Grid container spacing={3}                 >
                    {comics.map(comic => (
                        <Grid alignContent="center" key={comic.id} item xs={12} md={3}>
                            <ComicCard comic={comic} />
                        </Grid>
                    ))}
                </Grid>
               
                <Box
                sx={{ display: 'flex', justifyContent: 'center', m: 4 }}
                >
                    <Button onClick={handlePrevPage} disabled={page === 1}>
                        Anterior
                    </Button>
                    <Button onClick={handleNextPage}>
                        Siguiente
                    </Button>
                </Box>
                </>
   
    );
}


export default Home;
