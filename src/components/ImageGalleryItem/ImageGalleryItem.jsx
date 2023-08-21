import { ImageGalleryItemStyles } from "./ImageGalleryItem.styled";



export const ImageGalleryItem = ({webformatURL, largeImageUrl, id, tags, likes, views, comments, downloads, onClick}) => {
    return(
        <ImageGalleryItemStyles key={id}>
            <img src={webformatURL} alt={tags} 
            width="360" 
            height ="240" 
            loading="lazy"
            onClick={() => {onClick(largeImageUrl)}}/>
            <div className="info">
                <p className="title"><strong>Tags:</strong> {tags}</p>
                <p className="info-item">
                    <b>Likes: {likes}</b>
                </p>
                <p className="info-item">
                    <b>Views: {views}</b>
                </p>
                <p className="info-item">
                    <b>Comments: {comments}</b>
                </p>
                <p className="info-item">
                    <b>Downloads: {downloads}</b>
                </p>
            </div>
        </ImageGalleryItemStyles>
    )
}