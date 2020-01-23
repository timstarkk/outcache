import React from "react";
// import { FormBtn } from "../Form";
import Moment from 'react-moment';

function RentalCard(props) {
    const { id, name, price, img, rentalId, rentals, heartClick } = props;
    console.log(props)

    const rentalForCard = rentals.filter(function (ele) {
        console.log(ele)
        return ele._id === rentalId
    })

    let startDate = ""
    let endDate = ""
    let approved = ""
    

    // console.log(rentalForCard[0].startDate)
    if(rentalForCard > 0) {
        startDate = rentalForCard[0].startDate
        endDate = rentalForCard[0].endDate
        approved = rentalForCard[0].approved
    }


    return (
        <div className="col offset-s2 s8 m3 l2 resultCardContainer" style={{
            padding: "0px",
            "margin-bottom": "10px"
        }}>
            < div className="resultCard z-depth-2">
                <div className="cardImageContainer" >
                    <img className="cardImage" onClick={() => heartClick(id, name, price)} src={img} alt={name} />

                    <div className="littleSquare"  style={{ "paddingTop": "6px", "padding-bottom": "5px" }}></div>
                </div>
                <div className="cardInfoContainer">
                    <h6 className="cardName">{name}</h6>
                    <p className="cardLocation" style={{ padding: "0px", margin: "0px" }}>location</p>
                    <div className="row">
                        <p className="col s3 cardPrice" style={{ padding: "0px", "padding-left": "15px" }}>${price}</p>
                        <p className="col s3 perDayText" style={{ padding: "0px" }}>{' '}/ day</p>
                    </div>
                    <p>Start Date: <Moment format="MM/DD/YYYY">{startDate}</Moment></p>
                    <p>End Date: <Moment format="MM/DD/YYYY">{endDate}</Moment></p>
                    <p>Approved: {approved ? "approved" : "unapproved"}</p>
                </div>
            </div >
        </div >
    );
}

export default RentalCard;