import Field from '../components/field';
import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const UploadPage = ({onSave, file={}}) => {


    const [FileData, setFileData] = useState(file);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = React.useState(false);
    const {name, creator, price, primary_tag, secondary_tag, content, description} = FileData;
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const timerRef = React.useRef(0)
    const token = useSelector((state) => state.token.token);
	const authorized = useSelector((state) => state.token.authorized);
	const id = useSelector((state) => state.user.id);



    /*Validates data*/
    const validateData = () => {
        let errors = {};
        if (!name){
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


    /*Handling of change in data*/ 
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFileData((prevData) => ({...prevData, [name]: value }));
    };


    /*Save and upload file*/
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
        
        /*Upload of file*/
        console.log(selectedFile);
        const formData = new FormData();
        formData.append('File', selectedFile);
        try{ 
            const response2 = await fetch(
                "http://localhost/api/files/create",
                {method: 'POST',
                    body: JSON.stringify({ 
                        filename: FileData.name, 
                        creator: FileData.creator, 
                        price: FileData.price, 
                        primary_tag: FileData.primary_tag,
                        secondary_tag: FileData.secondary_tag,
                        content: FileData.content
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            if (response2.ok) {
                console.log('Images uploaded successfully');
                // Perform any necessary actions after successful upload
              } else {
                console.log('Image upload failed');
                // Handle the failure scenario
              }
        } catch (error) {
            console.error('Error uploading images:', error);
            // Handle any network or other errors that occurred during the upload
        }

    }

    /*Sets the file in state and set isSelected to true*/
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        console.log(selectedFile);
	};

    return(
        <div className="GlobalContainer"> {!authorized ? <Navigate to="/login?r=upload"/> : null }
			<Header/>
            <h1>Upload File</h1>
            <Field default="Title" name="name" onChange={handleChange}/>
            <Field default="Primary Tag" name="primary_tag" onChange={handleChange}/>
            <Field default="Secondary Tag" name="secondary_tag" onChange={handleChange}/>
            <Field default="Content" name="content" onChange={handleChange}/>
            <Field default="Creator" name="creator" onChange={handleChange}/>
            <div className="errorInformation"></div>
            <div
                style={{ display: 'flex', padding: '0 20px', flexWrap: 'wrap', gap: 15, alignItems: 'center'   }}
            >
            <textarea
                className="Input" 
                name='description' 
                style={{position: 'relative', left: '15px', width: '380px', height: '200px', marginBottom: '25px'}} 
                id="TextArea" placeholder="Description" text="message" default="Jak możemy ci pomóc?" 
                onChange={handleChange}>
            </textarea>
            <div className="errorInformation"></div>
            </div>
            <Field default="Price (PLN)" name="price" onChange={handleChange}/>
            <div className="errorInformation"></div>
            <input type='file' onChange={changeHandler}></input>
            <button 
                className='TopPageButton'
                style={{width: "135px", height: "45px", backgroundColor: 'white', margin: '10px', borderRadius: '50px', textAlign: 'center'}} 
                onClick={handleSave}> 
                        Send
            </button>

        </div>
    );
}
export default UploadPage;