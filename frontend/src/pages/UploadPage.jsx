import Field from '../components/field';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import uploadFile from '../functions/uploadFile';
import ProgressBar from '../components/ProgressBar';
import { useNavigate, Navigate } from 'react-router-dom';

const UploadPage = ({ onSave, file = {} }) => {


    const [FileData, setFileData] = useState(file);
    const [errors, setErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const { filename, description, price, content } = FileData;

    const token = useSelector((state) => state.token.token);
    const authorized = useSelector((state) => state.token.authorized);
    const id = useSelector((state) => state.user.id);
    const navigate = useNavigate();

    let [progress, setProgress] = useState(0);

    const validateData = () => {
        let errors = {};
        console.log(FileData);
        if (!filename) {
            errors.filename = "Title is required!";
        }

        if (!description) {
            errors.description = "Description is required!";
        }

        if (!price) {
            errors.price = "Price is required!";
        }
        if (FileData.price > 99999 || FileData.price < 10) {
            errors.price = "Price should be between 10 and 99999, your currect price: " + price
        }

        if (!content) {
            errors.content = "File is required!";
        } else if (content.size > 20_000) {
            errors.content = "File is too big!"
        }
        console.log(content.size);



        console.log(errors);
        return errors;
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const moveProgressTo = (val) => {
        console.log("called moveProgress")
        while (progress < val) {
            if (progress >= 100) break;
            setTimeout(() => {
                setProgress(progress+1)
            }, "10")
        }
    }

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
        setProgress(80)
        uploadFile(reqData, token).then(
            (r) => {
                setProgress(100)
                setTimeout(
                    () => {
                        alert("File uploaded successfuly!")
                        navigate("/notes")
                    }, "2500")
            },
            (err) => alert(err)
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
            <Field
                default="Price (tokens)"
                name="price"
                type="number"
                onChange={(e) => {
                    const enteredValue = parseInt(e.target.value);
                    setFileData((prevData) => ({ ...prevData, price: enteredValue }));
                }}
            />
            <div className="errorInformation">{errors.price}</div>
            <Field default="Tag (primary)" name="primary_tag" onChange={handleChange} />
            <Field default="Tag (Secondary)" name="secondary_tag" onChange={handleChange} />

            <input type='file'
                name="content"
                onChange={(e) => {
                    setFileData((prevData) => ({ ...prevData, content: e.target.files[0] }));
                    setProgress(25);
                }}
                accept='.md, .tex, .txt'
            />


            <div>
                <p> upload progress </p>
                <ProgressBar completed={progress} bgcolor="black"/>
            </div>

            <button className='TopPageButton' style={{ width: "135px", height: "45px", backgroundColor: 'white', margin: '10px', borderRadius: '50px', textAlign: 'center' }}
                onClick={handleSave}>
                Send
            </button>


        </div>
    );
}

export default UploadPage;