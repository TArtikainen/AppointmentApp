const reservations_view = ((data) => {
    let html = `
        <!DOCTYPE html>
        <html>

        <head>
        <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="../css/style.css">
        </head> 

        <body>
        <div class="reservation-header1">
            <div><h1>Reservation App</h1></div>
            <div><h2>Reservations for user: ${data.user_name}</h2></div>
            <div>
            <form action="/logout" method="POST">
            <button class=button2 type="submit">Log out</button>
            </form>
            </div>
        </div>
        </div>

        <div class="reservation-header2">
        <div>
        <div><h2>Add booking information</h2></div>         
        <form action="/add-reservation" method="POST">
            
            <input class=input2 type="date" name="reservation_date">
            <input class=input3 type="time" name="reservation_time">
            <input class=input3 type="number" name="reservation_duration" placeholder="Add Duration">
            
            <button class=button1 type="submit">Add reservation</button><br>
        </form>
    </div>
    
        
    </div>
        

        <div class="title">
            Reservations
        </div>
            `;
       
        data.reservations.forEach((reservation) => {                        
            html +=`

        
            <div class="reservation-listview">
                <div class="reservation-listtitle">
                    <div><b>Reservation Date</b></div>
                    <div><b>Reservation Time</b></div>
                    <div><b>Booker</b></div>
                    <div><b>Cancel</b>
                </div>
    
                </div>
                        <div><h3>${reservation.date}</h3></div>
                        <div><h3> ${reservation.time} <br> Booking duration ${reservation.duration} hour(s)</h3></div>                    
                        <div><h3> ${data.user_name}</h3></div>
                <div>
                        <form action="delete-reservation" method="POST">
                            <input type="hidden" name="reservation_id" value="${reservation._id}">
                            <button class=button3 type="submit">Cancel</button>
                        </form>
                </div>
                        
                    
            </div>                    
            </body>
            `;
        });

    return html;
});



module.exports.reservations_view = reservations_view;