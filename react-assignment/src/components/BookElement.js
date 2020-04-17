import React, {Component} from 'react';

const imageStyle = {
    "height": "400px",
    "width": "250px"
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
        const rating = this.state.rating === 0 ? "Give vote" : this.state.rating

        return(
            this.state.isEdit ?
            <div class="single-book">
                <div class="image">
                    <img src={this.state.image} style={imageStyle}/>
                </div>
                <div class="description">
                    <div class="element-input">
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                    </div>
                    <div class="element-input">
                        <input type="text" name="image" placeholder="Insert New Photo URL" onChange={this.handleChange}></input>
                    </div>
                    <div class="element-input">
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input>
                    </div>
                    <div class="element-input">
                        <div>Rating: </div>{rating}
                    </div>
                    <div class="element-input">
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
                    </div>
                    <div class="element-input">
                        <button onClick={() => {this.props.update(this.state); this.handleEdit()}}>Save</button>
                    </div>
                </div>
            </div> 
            :
            <div class="single-book">
                <div class="title"><h2>{this.state.title}</h2></div>
                <div class="image">
                    <img src={this.state.image} style={imageStyle}/>
                </div>
                <div class="description">
                    <div class="element-text">
                        <div>Description: </div> {this.state.description}
                    </div>
                    <div class="element-text">
                        <div>Rating: </div> {rating}
                    </div>
                    <div class="element-text">
                        <select disabled
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
                    </div>
                    <div class="element-text">
                        <button onClick={this.handleEdit}>Edit</button>
                        <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookElement