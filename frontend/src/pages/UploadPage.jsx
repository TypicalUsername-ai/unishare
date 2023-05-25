import Field from '../components/field';
import React, { useState } from "react";


const UploadPage = ({onSave, file={}}) => {


    const [FileData, setFileData] = useState(file);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const {title, description, price} = FileData;

    const validateData = () => {
        let errors = {};
        if (!title){
            errors.title = "Title is required!";
            console.log(errors.title);
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
        const {name, value} = event.target;
        setFileData((prevData) => ({...prevData, [name]: value }));
    };

    const handleSave = async () => {
        const errors = validateData();
        if (Object.keys(errors).length){
            setErrors(errors);
            
            return;
        }
        setErrors({});
        console.log(FileData);

        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
        setOpen(true);
        }, 100);
        onSave(FileData);

    }

    return(
        <div className="GlobalContainer">
            <h1>Upload File</h1>
             <Field default="Title" name="title" onChange={handleChange}/>
                <div className="errorInformation"></div>
            <div
                style={{ display: 'flex', padding: '0 20px', flexWrap: 'wrap', gap: 15, alignItems: 'center'   }}
            >
            <textarea
                className="Input" name='description' style={{position: 'relative', left: '15px', width: '380px', height: '200px', marginBottom: '25px'}} id="TextArea" placeholder="Description" text="message" default="Jak możemy ci pomóc?" onChange={handleChange}></textarea>
                 <div className="errorInformation"></div>
            </div>
            <Field default="Price (PLN)" name="price" onChange={handleChange}/>
                <div className="errorInformation"></div>

            <input type='file' value={selectedFile}   ></input>



                    
                        <button className='TopPageButton' style={{width: "135px", height: "45px", backgroundColor: 'white', margin: '10px', borderRadius: '50px', textAlign: 'center'}} 
                            onClick={handleSave}> 
                            Send
                        </button>

</div>
    );
}

export default UploadPage;