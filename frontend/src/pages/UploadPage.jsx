import Field from '../components/field';
import React, { useState } from "react";

export default function UploadPage () {

    const UserForm = ({onSave, file={}}) => {
    const [FileData, setFileData] = useState(file);
    const [errors, setErrors] = useState({});
    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFileData((prevData) => ({...prevData, [name]: value }));
    };



    return(
        <div className="GlobalContainer">
            <h1>Upload File</h1>
             <Field default="Title" name="title" onChange={handleChange}/>
                <div className="errorInformation"></div>
            <div
                style={{ display: 'flex', padding: '0 20px', flexWrap: 'wrap', gap: 15, alignItems: 'center'   }}
            >
            <textarea
                className="Input" style={{position: 'relative', left: '15px', width: '380px', height: '200px', marginBottom: '25px'}} id="TextArea" placeholder="Description" text="message" default="Jak możemy ci pomóc?" name="message" onChange={handleChange}></textarea>
                 <div className="errorInformation"></div>
            </div>
            <Field default="Price (PLN)" name="price" onChange={handleChange}/>
                <div className="errorInformation"></div>

        </div>
    );
}