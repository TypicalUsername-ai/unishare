import Field from '../components/field';
import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import uploadFile from '../functions/uploadFile';

const UploadPage = ({ onSave, file = {} }) => {


    const [FileData, setFileData] = useState(file);
    const [errors, setErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const { filename, description, price } = FileData;

    const token = useSelector((state) => state.token.token);
    const authorized = useSelector((state) => state.token.authorized);
    const id = useSelector((state) => state.user.id);

    const validateData = () => {
        let errors = {};
        if (!filename) {
            errors.filename = "Title is required!";
        }

        if (!description) {
            errors.description = "Description is required!";
        }

        if (!price) {
            errors.price = "Price is required!";
        }

        console.log(errors);
        return errors;
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);

            return;
        }
        setErrors({});
        let reqData = new FormData();
        Object.entries(FileData).forEach(
            (value) => reqData.append(value[0], value[1])
        )
        console.log(reqData);
        uploadFile(reqData, token).then(
            (r) => console.log(r)
        )
        //onSave(FileData);

    }

    return (
        <div className="GlobalContainer">
            {!authorized ? <Navigate to="/login?r=upload" /> : null}
            <Header />
            <h1>Upload File</h1>
            <Field default="Title" name="filename" onChange={handleChange} />
            <div className="errorInformation">{errors.filename}</div>
            <div
                style={{ display: 'flex', padding: '0 20px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
            >
                <textarea
                    className="Input" name='description' style={{ position: 'relative', left: '15px', width: '380px', height: '200px', marginBottom: '25px' }} id="TextArea" placeholder="Description" text="message" default="Jak możemy ci pomóc?" onChange={handleChange}></textarea>
                <div className="errorInformation">{errors.description}</div>
            </div>
            <Field default="Price (tokens)" name="price" type="number" onChange={(e) => setFileData((prevData) => ({ ...prevData, price: parseInt(e.target.value) }))} />
            <div className="errorInformation">{errors.price}</div>
            <Field default="Tag (primary)" name="primary_tag" onChange={handleChange} />
            <Field default="Tag (Secondary)" name="secondary_tag" onChange={handleChange} />

            <input type='file' name="content" onChange={(e) => setFileData((prevData) => ({ ...prevData, content: e.target.files[0] }))}   />




            <button className='TopPageButton' style={{ width: "135px", height: "45px", backgroundColor: 'white', margin: '10px', borderRadius: '50px', textAlign: 'center' }}
                onClick={handleSave}>
                Send
            </button>

        </div>
    );
}

export default UploadPage;