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
            nameAsc: false
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSort = this.handleSort.bind(this)
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
    handleSort(){
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
                display: sortedData
            })
            this.setState({
                nameAsc: !this.state.nameAsc
            })
        }
        
    }
    render() {
        const data = this.state.display.map(item => <BookElement 
            key={item.id} 
            id={item.id}
            title={item.name}
            description={item.description}
            image={item.image}
            rating={item.rating}
            onDelete={this.handleDelete}/>)
        return(
            
            <div>
                <input type="text" name="search" value={this.search} placeholder="Search" onChange={this.handleSearch}/>
                <button onClick={this.handleSort}>Sort By Name</button>
                {data}
            </div>
        )
    }
}

export default Books;