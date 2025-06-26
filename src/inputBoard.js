import React from "react";

const InputRows = ({N, setN}) => {

    return (
        <div style={{ width: "50%", margin: "0 auto" }}>
        <label>Board Size: </label>
        <input
            value = {N}
            type = "number"
            placeholder = "any number >=  4"
            onChange={(e) => setN(e.target.value)}
        />
        </div>
    );
};

export default InputRows;