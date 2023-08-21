// import PropTypes from 'prop-types';
import { Component } from "react";
import { HeaderStyles } from "./Searchbar.styled";


export class Searchbar extends Component {
    state={
        searchQuery: '',
    };



    onFormChange = event => {
        this.setState({searchQuery: event.currentTarget.value.toLowerCase()});
    };

    
   
    onFormSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.searchQuery);
        this.onFormReset();
    };
   


    onFormReset = () => {
        this.setState({searchQuery: ''})
    };



    render(){
        return (
            <HeaderStyles>
                <form className="form" onSubmit={this.onFormSubmit}>
                    <button type="submit" className="button">
                        <span className="button-label">Search</span>
                    </button>
                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.onFormChange}
                        value={this.state.searchQuery}
                    />
                </form>
            </HeaderStyles>
        )  
    };
};