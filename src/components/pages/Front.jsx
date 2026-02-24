import { useState } from 'react';
import Upload from './Upload';
import "../ui/Front.css";
export default function Front() {
    const [scan, setScan] = useState(false);
    if (scan) {
        return <Upload />;
    }

    return (
        <>
            {scan ? (
                <Upload />
            ) : (
                <div className="front">
                    <div className="heading">
                        <h1 className="title">Welcome to the Admin Panel</h1>
                        <p className="subtitle">
                            Please log in to access the dashboard and manage your content.
                        </p>
                    </div>

                    <div className="image-container">
                        <button
                            className="upload-button"
                            onClick={() => setScan(true)}
                            aria-label="Start scan"
                        >
                            Scan
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}