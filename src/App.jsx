import { Component } from "react";
import { Section } from "./components/Section/Section";
import { Containers } from "./components/Containers/Containers";
import { fetchArticles } from "API/api";
import { Searchbar } from "components/Searchbar/Serachbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";


export class App extends Component {
  state={
    images: [],
    image: null,
    webformatURL: [],
    largeImageUrl: '',
    page: 1,
    perPage: 12,
    searchQuery: '',
    isloading: false,
    showModal: false,
  };


  fetchImages = async () => {
    const { searchQuery, page, perPage } = this.state;
    
    try {
      const articles = await fetchArticles(searchQuery, page, perPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...articles.hits],
        page: prevState.page + 1,
        isloading: false,
      }));

      console.log(articles);
      
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }; 
  
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    };
  }


  onFormSubmitData = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return; 
    }
    this.setState({
      searchQuery: searchQuery.toLowerCase(),
      page: 1,
      images: [],
      isloading: true,
    });
    
  };


  





  render(){
    return (
      <Section>
        <Searchbar onSubmit={this.onFormSubmitData}/>
        <Containers>
        <ImageGallery
          articles={this.state.images}
          onClick={this.handleImageClick}       
        />
        </Containers>
      </Section>
    )
  };
};
