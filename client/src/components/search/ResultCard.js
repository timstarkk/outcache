import React from "react";
// import { FormBtn } from "../Form";

function ResultCard(props) {
    const { id, name, price, img, onClick, hearted, clickRouter } = props;
    console.log(props)

    console.log(hearted)

    let isHearted

    function heart() {
        isHearted = false
        if(hearted) {
            for (let item of hearted) {
                if(item === id) {
                    isHearted = true
                }
            }
        }
    }
    heart()
    

    return (
        <div className="col offset-s2 s8 m3 l2 resultCardContainer"  style={{
            padding: "0px",
            "margin-bottom": "10px",
        }}>
            < div className="resultCard z-depth-2">
                <div className="cardImageContainer">
                    <img className="cardImage" onClick={() => clickRouter(props, "openModal")} src={img} alt={name} />
                    {isHearted ? <div className="littleSquareSelected" onClick={() => clickRouter(props, "removeHeart")} style={{ "paddingTop": "5px", "padding-bottom": "5px" }}></div> : 
                    <div className="littleSquare" onClick={() => clickRouter(props, "addHeart")} style={{ "paddingTop": "5px", "padding-bottom": "5px" }}></div>}
                </div>
                <div className="cardInfoContainer" onClick={() => clickRouter(props, "openModal" )}>
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