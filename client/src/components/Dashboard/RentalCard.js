import React from "react";
// import { FormBtn } from "../Form";

function RentalCard(props) {
    const { result, index, id, name, price, img, rentalId, rentals, clickRouter, location } = props;

    return (
        <div className="col offset-s2 s8 m3 l2 resultCardContainer" style={{
            padding: "0px",
            "margin-bottom": "10px"
        }}>
            < div className="resultCard z-depth-2" onClick={() => clickRouter(result, index, true, rentals)}>
                <div className="cardImageContainer" >
                    <img className="cardImage" src={img} alt={name} />

                    <div className="littleSquare" style={{ "paddingTop": "6px", "padding-bottom": "5px" }}></div>
                </div>
                <div className="cardInfoContainer">
                    <h6 className="cardName">{name}</h6>
                    <p className="cardLocation" style={{ padding: "0px", margin: "0px" }}>{location}</p>
                    <div className="row" style={{ marginBottom: "0px", width: "100%" }}>
                        <p className="cardPrice" style={{ padding: "0px", "padding-left": "11px" }}>${price}</p>
                        <span> </span>
                        <p className="perDayText" style={{ padding: "0px" }}>{' '}/ day</p>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default RentalCard;