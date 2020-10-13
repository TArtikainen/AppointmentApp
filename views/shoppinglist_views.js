const shoppinglists_view = ((data) => {
    let html = `
        <!DOCTYPE html>
        <html>

        <head>
        <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="../css/style.css">
        </head> 

        <body>
        <div class="shoppinglist-header1">
            <div><h1>ShoppingList App</h1></div>
            <div><h2>Shoppinglists for user: ${data.user_name}</h2></div>
            <div>
            <form action="/logout" method="POST">
            <button class=button2 type="submit">Log out</button>
            </form>
            </div>
        </div>

        <div class="shoppinglist-header2">
        <div>         
        <form action="/add-shoppinglist" method="POST">
            <input class=input2 type="text" placeholder="Enter shoplist name" name="shoppinglist">
            <button class=button1 type="submit">Add a shoppinglist</button><br>
        </form>
    </div>
    </div>
    </div>
        

        <div class="title">
            Lists
        </div>
            `;
       
        data.shoppinglists.forEach((shoppinglist) => {                        
            html += `
            
            <div class="shoppinglist-listview" >
            <div class="shoppinglist-listtitle">
                <div><b>List name</b></div>
                <div><b>Delete list</b></div>
            </div> 
            <div>
                <h2><a href="/shoppinglist/${shoppinglist._id}">${shoppinglist.name}</a></h2>
            </div>
            <div>
                <form action="delete-shoppinglist" method="POST">
                    <input type="hidden" name="shoppinglist_id" value="${shoppinglist._id}">
                    <button class=button4 type="submit">X</button>
                </form>
                </div>
            </div>
            </div>
            
            `;
        });

    return html;
});

const shoppinglist_view = ((data) => {
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
        
        <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="../css/style.css">
        </head>
        <body>
        <div class="shoppinglist-header1">
            <div><h1>ShoppingList App</h1></div>
            <div><h2>Shoppinglist name: ${data.shoppinglist_name}</h2></div>
            <div>
            <form action="/">
            <button class=button2 type="submit">Back to shoppinglists</button>
            </form>
            </div>
        </div>
        
        
        <div class="shoppinglist-header2">
            <form action="/add-product/${data.shoppinglist_id}" method="POST">
            <input class=input3 type="text" placeholder = "Enter product name" name="product_name" >
            <input class=input4 type="number" placeholder = "Enter quantity" name="product_quantity">
            <input class=input5 type="datetime-local" placeholder = "Enter image url" name="product_date">
            <button class=button3 type="submit">Add product</button>
            </form>
        </div>
        
        </div>
        
        <br>           
        <div class="title">
            Products
        </div>
    `;


    data.products.forEach((product) => { 
        html += `

        
        <div class="shoppinglist-productview">
            <div class="shoppinglist-producttitle">
                <div><b>Reservation Date</b></div>
                <div><b>Name</b></div>
                <div><b>Duration</b></div>
                <div><b>Delete product</b>
            </div>

            </div>
                    <div><h3>${product.date}</h3></div>                    
                    <div><h3> ${product.name}</h3></div>
                    <div><h3> ${product.quantity}</h3></div>
                    
                    
                    
                    <div>
                    <form action="/shoppinglist/delete-product" method="POST">
                        <input type="hidden" name="product_id" value="${product._id}">
                        <input type="hidden" name="shoppinglist_id" value="${data.shoppinglist_id}">
                        <button class=button4 type="submit">X</button>
                    </form>
            </div>
                    
                
        </div>                    
        </body>
        `;                                                
    });        

    return html;
});

module.exports.shoppinglists_view = shoppinglists_view;
module.exports.shoppinglist_view = shoppinglist_view;