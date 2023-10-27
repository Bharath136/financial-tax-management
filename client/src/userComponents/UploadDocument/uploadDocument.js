import React, { useState } from 'react';
import './uploadDocument.css';

const UploadDocument = () => {
    const [uploadedDocument, setUploadedDocument] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                // Display the content in the console
                console.log(content);
                setUploadedDocument(content);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="upload-document-container">
            <h1>Upload Your Documents</h1>
            <div className="upload-form">
                <div className="input-container">
                    <input type="file" id="fileInput" accept=".pdf, .doc, .docx" onChange={handleFileChange} />
                    <label htmlFor="fileInput">Choose a file</label>
                </div>
                <p>Supported file formats: PDF, Word Documents</p>
                <button className="upload-button">Upload</button>
            </div>
            <div className="instructions">
                <h2>Instructions:</h2>
                <ul>
                    <li>Make sure your document is in PDF or Word format.</li>
                    <li>Use a descriptive file name for your document.</li>
                    <li>Ensure the document is accurate and complete.</li>
                    <li>Double-check for any sensitive information before uploading.</li>
                </ul>
            </div>
            {/* {uploadedDocument && (
                <div className="uploaded-content">
                    <h2>Uploaded Document Content:</h2>
                    <pre>{uploadedDocument}</pre>
                </div>
            )} */}
        </div>
    );
};

export default UploadDocument;
