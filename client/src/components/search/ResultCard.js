import React from "react";
import { FormBtn } from "../Form";

function ResultCard(props) {
    const { id, name, price, img, onClick, clickRouter } = props;
    console.log(props)

    return (
        <div className="col offset-s2 s8 m3 l2 resultCardContainer"  style={{
            padding: "0px",
            "margin-bottom": "10px",
        }}>
            < div className="resultCard z-depth-2">
                <div className="cardImageContainer">
                    <img className="cardImage" onClick={() => clickRouter(props, false)} src={img} alt={name} />

                    <div className="littleSquare" onClick={() => clickRouter(props, true)} style={{ "paddingTop": "5px", "padding-bottom": "5px" }}></div>
                </div>
                <div className="cardInfoContainer" onClick={() => clickRouter(props, false)}>
                    <h6 className="cardName">{name}</h6>
                    <p className="cardLocation" style={{ padding: "0px", margin: "0px" }}>location</p>
                    <div className="row">
                        <p className="col s3 cardPrice" style={{ padding: "0px", "padding-left": "15px" }}>${price}</p>
                        <p className="col s3 perDayText" style={{ padding: "0px" }}>{' '}/ day</p>

                    </div>
                </div>
            </div >
        </div >
    );
}

export default ResultCard;