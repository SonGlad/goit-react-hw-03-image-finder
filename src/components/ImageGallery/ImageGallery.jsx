import { ImageGalleryStyles } from "./ImageGallery.styled";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({articles, onClick}) => {
    return(
        <ImageGalleryStyles>
            {articles.map(({webformatURL, largeImageUrl, id, tags, likes, views, comments, downloads}) => (
                <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                argeImageUrl={largeImageUrl}
                tags={tags}
                likes={likes}
                views={views}
                comments={comments}
                downloads={downloads}
                onClick={onClick}
                />
            ))}
        </ImageGalleryStyles>
    )
};

