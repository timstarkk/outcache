import React from "react";

function ResultCard(props) {
    const { id, name, category, price, img } = props;
    return (
        < div className="col s3" style={{ border: "2px solid gold", height: "300px" }}>
            <div>
                <img src={img} />
            </div>
            <h5>{name}</h5>
            <div className="container" style={{ border: "1px solid purple", height: "100px" }}>
                <p>category: {category}</p>
                <p>price: {price}</p>
                <p>key: {id}</p>
            </div>
        </div >
    );
}

export default ResultCard;