import React, {Component} from 'react';

const imageStyle = {
    "height": "300px",
    "width": "200px"
}

class BookElement extends Component{
    constructor(){
        super()
        this.state = {
            id: "",
            title: "",
            image: "",
            description: "",
            rating: ""
        }        
        this.handleChange = this.handleChange.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }
    componentDidMount(){
        console.log("im here")
        this.setState({
            id: this.props.id,
            title: this.props.title,
            image: this.props.image,
            description: this.props.description,
            rating: this.props.rating,
            isEdit: false
        })
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({[name]: value})
    }   
    handleEdit(){
        this.setState({
            isEdit: !this.state.isEdit
        })
        console.log(this.state.isEdit)
    }
    render(){
        const rating = this.state.rating === null ? "Give vote" : this.state.rating

        return(
            this.state.isEdit ?
            <form>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                <img src={this.state.image} style={imageStyle}/>
                <input type="text" name="image" placeholder="Insert New Photo URL" onChange={this.handleChange}></input>
                <p>Description: <input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input></p>
                <p>Rating: {rating}</p>
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
                <button onClick={this.handleEdit}>Save</button>
            </form> 
            :
            <div>
                <h1>{this.state.title}</h1>
                <img src={this.state.image} style={imageStyle}/>
                <p>Description: {this.state.description}</p>
                <p>Rating: {rating}</p>
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
                <button onClick={this.handleEdit}>Edit</button>
                <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
            </div>
        )
    }
}

export default BookElement