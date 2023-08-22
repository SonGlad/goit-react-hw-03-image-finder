import { Component } from "react";
import { fetchArticles } from "API/api";
import { Section } from "./components/Section/Section";
import { Containers } from "./components/Containers/Containers";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { LoadMoreBtn } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";
// import { useState, CSSProperties } from "react";



export class App extends Component {
  state={
    images: [],
    image: null,
    webformatURL: [],
    largeImageURL: '',
    page: 1,
    perPage: 12,
    searchQuery: '',
    isLoading: false,
    showModal: false,
  };

  

  fetchImages = async () => {
    const { searchQuery, page, perPage } = this.state;
    
    try {
      this.setState({ isLoading: true });
      const articles = await fetchArticles(searchQuery, page, perPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...articles.hits],
        page: prevState.page + 1,
        isLoading: false,
      }));

      if (articles.hits.length > 0 && this.state.page === 1) {
        toast.success('We found your images!!');
        
      } else if(articles.hits.length === 0){
        throw new Error();
      }
      
    } catch (error) {
      toast.error('Sorry, there are no images matching your search query. Please try again.');
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
      return toast.warn(`You are already viewing ${searchQuery}`); 
    }
    this.setState({
      searchQuery: searchQuery.toLowerCase(),
      page: 1,
      images: [],
      isLoading: true,
    });
  };


  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };


  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };


  onClose = () => {
    this.setState({ showModal: false });
  };



  render(){
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Section>

          <Searchbar onSubmit={this.onFormSubmitData}/>

          <Containers>
            <ImageGallery
              articles={this.state.images}
              onClick={this.handleImageClick}       
            />

            {this.state.images.length > 0 && (
              <LoadMoreBtn 
                onClick={this.fetchImages}
                isVisible={!this.state.isLoading} 
              />
            )}

            {this.state.isLoading && (
              <div className="loading-spinner"
                style={{position:'fixed',
                  top: '0',
                  left: '0',
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                }}>
                <BounceLoader color={"#36d7b7"} 
                  loading={this.state.isLoading} 
                  size={150}
                  speedMultiplier={2} 
                />
              </div>
            )}
          </Containers>

          {this.state.showModal && (
            <Modal
              onClose={this.onClose}
              largeImageURL={this.state.largeImageURL}
              showModal={this.state.showModal}
              articles={this.state.images}
            />
          )}
        </Section>
      </>
    )
  };
};
