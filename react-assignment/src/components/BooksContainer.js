import React, { Component } from 'react'
import booksData from '../booksData.json'
import BookElement from './BookElement'

class Books extends Component{
    constructor(){
        super()
        this.state = {
            books: booksData,
            search: "",
            display: booksData,
            nameAsc: false,
            ratingAsc: false
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSortByName = this.handleSortByName.bind(this)
        this.handleSortByRating = this.handleSortByRating.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleDelete(id){
        const filtered = this.state.books.filter(item => item.id !== id)
        this.setState({
            books: filtered,
            display: filtered
        })
    }
    handleSearch(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
        const display =  this.state.books.filter(el =>{
            const searchValue = el.name.toLowerCase();
            return searchValue.indexOf(value.toLowerCase()) !== -1
        })
        this.setState({
            display: display
        })
    }
    handleSortByName(){
        if(!this.state.nameAsc){
            function compare(a, b){
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            }
            const sortedData = this.state.display.sort(compare)
            const sortedBooks = this.state.books.sort(compare)
            this.setState({
                books: sortedBooks,
                display: sortedData,
                nameAsc: !this.state.nameAsc
            })
        }else{
            function compare(a, b){
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            }
            const sortedData = this.state.display.sort(compare)
            const sortedBooks = this.state.books.sort(compare)
            this.setState({
                books: sortedBooks,
                display: sortedData,
                nameAsc: !this.state.nameAsc
            })
        }
        
    }
    handleSortByRating(){
        if(!this.state.ratingAsc){
            const sortedData = this.state.display.sort((a,b) => a.rating - b.rating)
            const sortedBooks = this.state.books.sort((a,b) => a.rating - b.rating)
            this.setState({
                books: sortedBooks,
                display: sortedData,
                ratingAsc: !this.state.ratingAsc
            })
        }else{
            const sortedData = this.state.display.sort((a,b) => b.rating - a.rating)
            const sortedBooks = this.state.books.sort((a,b) => b.rating - a.rating)
            this.setState({
                books: sortedBooks,
                display: sortedData,
                ratingAsc: !this.state.ratingAsc
            })
        }
    }
    handleUpdate(element){
        const updated = this.state.display.filter(item =>{
            if(item.id === element.id){
                item.name = element.title
                item.image = element.image
                item.rating = element.rating
                item.description = element.description
            }
            return item
        })
        console.log(updated);
        this.setState({
            books: updated,
            display: updated
        })
    }
    render() {
        const data = this.state.display.map(item => <BookElement 
            key={item.id} 
            id={item.id}
            title={item.name}
            description={item.description}
            image={item.image}
            rating={item.rating}
            onDelete={this.handleDelete}
            update={this.handleUpdate}/>)
        return(
            
            <div>
                <input type="text" name="search" value={this.search} placeholder="Search" onChange={this.handleSearch}/>
                <button onClick={this.handleSortByName}>Sort By Name</button>
                <button onClick={this.handleSortByRating}>Sort By Rating</button>
                {data}
            </div>
        )
    }
}

export default Books;