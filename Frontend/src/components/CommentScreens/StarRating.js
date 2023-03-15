import { useState } from "react";
import { FaStar } from 'react-icons/fa'

const StarRating = ({ setStar, setStarCurrentVal, starCurrentVal }) => {

    const [hoverVal, setHoverVal] = useState(undefined)

    const handleClick = (val) => {
        setStarCurrentVal(val);
        setStar(val)
    }

    const handleMouseOver = (val) => {
        setHoverVal(val);
    }
    const handleMouseLeave = () => {
        setHoverVal(undefined);
    }
    return (
        <div className="StarRating-wrapper" >

            {

                [...Array(5)].map((_, index) => {

                    return (
                        <FaStar
                            key={index}
                            className="star"
                            size={21}
                            onClick={() => handleClick(index + 1)}
                            color={(hoverVal || starCurrentVal) > index ? "#0063a5" : "grey"}
                            onMouseLeave={handleMouseLeave}
                            onMouseOver={() => handleMouseOver(index + 1)}
                        />
                    )

                })
            }

        </div>

    )

}


export default StarRating; 