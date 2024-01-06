import React from "react";
import SingleInput from "../SingleInput/SingleInput";

function InputPair({ label1, placeholder1, value1, setValue1, label2, placeholder2, value2, setValue2 }) {
    return (
        <div className="flex row space-between">
            <SingleInput label={label1} placeholder={placeholder1} type="input" value={value1} setValue={setValue1}></SingleInput>
            <SingleInput label={label2} placeholder={placeholder2} type="input" value={value2} setValue={setValue2}></SingleInput>
        </div>
    );
}

export default InputPair;