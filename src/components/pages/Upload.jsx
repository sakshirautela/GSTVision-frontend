import React, { useState, useEffect } from "react";
import Result from "./Result";
import Front from "./Front";
import "../ui/Upload.css";

export default function Upload() {

    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [next, setNext] = useState(false);
    const [back, setBack] = useState(false);

    const api = process.env.REACT_APP_API_URL || "http://localhost:8080";

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleSubmit = async () => {

        if (!image) return;

        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await fetch(`${api}/api/auth/ocr/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            setResult(data);

        } catch (err) {
            setError("An error occurred while uploading");
        }
    };
    useEffect(() => {
        if (!result) return;

        if (!result.gstNumber) {
            setError("GST Number not found in the invoice. Please try again.");
        } else {
            setNext(true);
        }
    }, [result]);

    if (next) return <Result data={result} />;
    if (back) return <Front />;

    return (
        <div className="upload-container">
            <h2 className="upload-title">Upload GST Invoice</h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="upload-input"
            />

            {image && (
                <button
                    onClick={handleSubmit}
                    className="upload-button"
                >
                    Scan Invoice
                </button>
            )}

            {error && <div className="upload-error">{error}</div>}

            <button
                onClick={() => setBack(true)}
                className="upload-back"
            >
                Back
            </button>
        </div>
    );
}