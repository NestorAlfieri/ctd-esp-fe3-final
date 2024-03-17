import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from "../services/marvel/marvel.service";
import { Box, Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import ComicCard from 'dh-marvel/components/comicCard';

export interface Comic {
    id: number;
    title: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

interface IndexProps {
    comics: Comic[];
}

const Index: NextPage<IndexProps> = ({ comics }) => {

    const router = useRouter();
    const [page, setPage] = useState(1);

    const handlePrevPage = () => {
        const newPage = Math.max(page - 1, 1);
        router.push(`/?page=${newPage}`); // Update URL with new page number
        setPage(newPage);
    };

    const handleNextPage = () => {
        const newPage = page + 1;
        router.push(`/?page=${newPage}`); // Update URL with new page number
        setPage(newPage);
    };
    return (
        <>
            <Head>
                <title>Marvel Comics</title>
                <meta name="description" content="Explore Marvel comics and characters" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BodySingle title={"Cómics de Marvel"}>
                {/* Render comics grid */}
                <Grid container spacing={3}                 >
                    {comics.map(comic => (
                        <Grid alignContent="center" key={comic.id} item xs={12} md={3}>
                            <ComicCard comic={comic} />
                        </Grid>
                    ))}
                </Grid>
                {/* Pagination buttons */}
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
            </BodySingle>
        </>
    );
}

// Fetch comics data on server-side
export const getServerSideProps: GetServerSideProps<IndexProps> = async ({ query }) => {
    const page = Number(query.page) || 1; // Get the page number from the query string, default to 1 if not provided
    console.log('Requested page:', page); // Log the requested page number
    const offset = (page - 1) * 12; // Calculate the offset based on the page number
    const response = await getComics(offset, 12); // Fetch comics for the specified page

    if (!response.data.results) {
        return {
            notFound: true
        };
    } const comicsData = response.data.results;

    const comics: Comic[] = comicsData.map((comic: any) => ({
        id: comic.id,
        title: comic.title,
        thumbnail: comic.thumbnail,
    }));

    console.log('Fetched comics:', comics);

    return {
        props: {
            comics
        }
    };
};
export default Index;
