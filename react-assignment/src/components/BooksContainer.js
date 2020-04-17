import React, { Component } from 'react'
import booksData from '../booksData.json'
import BookElement from './BookElement'

class Books extends Component{
    constructor(){
        super()
        this.state = {
            books: booksData,
            search: "",
            display: booksData
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
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
                {data}
            </div>
        )
    }
}

export default Books;