import React, { Component } from 'react'
import booksData from '../booksData.json'
import BookElement from './BookElement'

class Books extends Component{
    constructor(){
        super()
        this.state = {
            books: booksData
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(id){
        const filtered = this.state.books.filter(item => item.id !== id)
        this.setState({books: filtered})
    }
    render() {
        const data = this.state.books.map(item => <BookElement 
            key={item.id} 
            id={item.id}
            title={item.name}
            description={item.description}
            image={item.image}
            rating={item.rating}
            onDelete={this.handleDelete}/>)
        return(
            
            <div>
                <h1>Hello</h1>
                {data}
            </div>
        )
    }
}

export default Books;