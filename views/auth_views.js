const login_view = () => {
    let html = `
        <html>
        <head>
        <title>ShoppingList App</title>
        <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="../css/style.css">
        </head>
        <body>
        <div class="login_view">
            
        <h2>ShoppingList App</h2>
            
            <br>
            <form action="/login" method="POST">
                <input class=input1 type="text" id="login" placeholder="Enter name" name="user_name">
                <button class=button1 type="submit">Log in</button>

            </form>
            <form action="/register" method="POST">
                <input class=input1 type="text" id="register" placeholder="Enter name" name="user_name">
                <button class=button1 type="submit">Register</button>
            </form>
        </div>   
        </body>
        </html>
    `;
    return html;
};

module.exports.login_view = login_view;