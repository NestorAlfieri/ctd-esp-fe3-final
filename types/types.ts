// types.ts
export interface ComicType {
  id: number;
  title: string;
  thumbnail: {
      path: string;
      extension: string;
  };
}

export interface ComicDetailsType {
  comic: {
    id: number;
    title: string;
    description: string;
    thumbnail: { path: string; extension: string };
    textObjects?: Array<{ text: string }>;
    price: number;
    oldPrice: number;
    stock: number;
    characters?: { items: { name: string; resourceURI: string }[] };
  };
}

export interface CharacterPageProps {
  character: {
    id: number;
    name: string;
    description: string;
    thumbnail: { path: string; extension: string };
    comics: {
      available: number;
      collectionURI: string;
      items: { name: string }[];
    };
    series: {
      available: number;
      collectionURI: string;
      items: { name: string }[];
    };
    stories: {
      available: number;
      collectionURI: string;
      items: { name: string }[];
    };
    urls: { type: string; url: string }[];
  };
}
