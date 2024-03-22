
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from "../services/marvel/marvel.service";
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { ComicType } from 'types/types';
import Home from '../components/HomeComponents/Home'; 

interface IndexProps {
    comics: ComicType[];
}
const Index: NextPage<IndexProps> = ({ comics }) => { 

    return (
        <LayoutGeneral>
            <Head>
                <title>Marvel Comics</title>
                <meta name="description" content="Explore Marvel comics and characters" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BodySingle title={"Cómics de Marvel"}>
               <Home comics={comics}/> {/* Pass comics prop to Home component */}
            </BodySingle>
        </LayoutGeneral>
    );
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async ({ query }) => {
    const page = Number(query.page) || 1; // Get the page number from the query string, default to 1 if not provided
    const offset = (page - 1) * 12; // Calculate the offset based on the page number
    const response = await getComics(offset, 12); // Fetch comics for the specified page

    if (!response.data.results) {
        return {
            notFound: true
        };
    }
    
    const comicsData = response.data.results;

    const comics: ComicType[] = comicsData.map((comic:ComicType) => ({
        id: comic.id,
        title: comic.title,
        thumbnail: comic.thumbnail,
    }));

    return {
        props: {
            comics
        }
    };
};

export default Index;
