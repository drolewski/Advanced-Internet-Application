function addToCart(id) {
    var req = new XMLHttpRequest();
    req.open('POST', `/add/${id}`);
    req.setRequestHeader('content-type', 'application/json')
    req.send(id);
    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 204) {
                alert("You have added all the books available");
            }else if(req.status === 200){
                alert('Book added')
            }
        }
    }
}

function cancelCart(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        window.location = "/shop"
    }
    req.open('POST', `/cart/delete`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
             if(req.status === 200){
                alert('Cart is clear')
            }
        }
    }
}

function deleteElement(id){
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        window.location = "/cart"
    }
    req.open('POST', `/cart/delete/${id}`);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
             if(req.status === 200){
                alert(`Book with ${id} has been removed`)
            }
        }
    }
}

function confirmCart(price){
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        window.location = "/shop"
    }
    req.open('POST', '/cart/buy');
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
             if(req.status === 200){
                alert(`You bought books. Now pay ${price} $`)
            }
        }
    }
}