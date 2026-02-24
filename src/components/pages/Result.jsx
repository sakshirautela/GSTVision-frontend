import { useEffect, useState } from "react";
import Upload from "./Upload";
import Front from "./Front";

export default function Result({ data }) {

    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);
    const [valid, setValid] = useState([]);
    const [anotherScan, setAnotherScan] = useState(false);
    const [home, setHome] = useState(false);

    const gst_api = process.env.REACT_APP_GST_APP_API_URL || "";
    const api = process.env.REACT_APP_API_URL || "http://localhost:8080";

    // ✅ ALL HOOKS MUST BE HERE FIRST
    useEffect(() => {

        const validateGST = async () => {
            const validationResults = [];

            for (let gst of data.gstNumber) {
                try {
                    const response = await fetch(`${gst_api}/${gst}`);
                    if (!response.ok) throw new Error();
                    await response.json();
                    validationResults.push({ [gst]: true });
                } catch {
                    validationResults.push({ [gst]: false });
                }
            }

            setValid(validationResults);
        };

        if (data?.gstNumber?.length) {
            validateGST();
        }

    }, [data.gstNumber, gst_api]);


    useEffect(() => {

        const fetchDetails = async () => {
            try {
                const response = await fetch(`${api}/api/auth/ocr/details`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        gstNumber: data.gstNumber,
                        valid,
                        text: data.text
                    })
                });

                if (!response.ok) throw new Error("Failed");

                const result = await response.json();
                setDetails(result);

            } catch (err) {
                setError("Something went wrong");
            }
        };

        if (valid.length > 0) {
            fetchDetails();
        }

    }, [valid, api, data]);


    // ✅ CONDITIONAL RETURNS AFTER HOOKS
    if (home) return <Front />;
    if (anotherScan) return <Upload />;

    return (
        <div className="result-container">
            <h2 className="result-title">GST Invoice Details</h2>

            <button onClick={() => setAnotherScan(true)}>
                Scan Another
            </button>

            <button onClick={() => setHome(true)}>
                Home
            </button>
        </div>
    );
}