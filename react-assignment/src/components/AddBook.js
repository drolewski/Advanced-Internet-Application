import React, {Component} from 'react'

class AddBook extends Component{
    constructor(){
        super()
        this.state = {    
            id: 0,
            name: "",
            description: "",
            image: "",
            rating: 0,
            addElement: false
        }
        this.showAddBook = this.showAddBook.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    showAddBook(){
        this.setState({
            addElement: !this.state.addElement
        })
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
    }  
    render(){
        const rating = this.state.rating === 0 ? "Give vote" : this.state.rating
        return(
            this.state.addElement ? 
            <div>
                <label>Title</label>
                <input placeholder="Title" name="name" onChange={this.handleChange}/>
                <br></br>
                <label>Description</label>
                <input placeholder="Description" name="description" onChange={this.handleChange}/>
                <br></br>
                <label>Image</label>
                <input placeholder="Image URL" name="image" onChange={this.handleChange}/>
                <select 
                    value={rating}
                    onChange={this.handleChange}
                    name="rating">
                    <option value="Give vote">Give vote</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button onClick={() => {this.props.add(this.state.name, this.state.description, this.state.image, this.state.rating); this.showAddBook()}}>Add</button>
            </div>
            :
            <button onClick={this.showAddBook}>Add Book</button>
        )
    }
}

export default AddBook