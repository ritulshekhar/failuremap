import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  uploadDataset,
  selectTarget,
} from "../api/api";

import Navbar from "../components/Navbar";

const primaryButtonStyle = {
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "12px 24px",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
  transition: "0.2s",
};

const uploadCardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  border: "1px solid #e5e7eb",
  maxWidth: "700px",
  transition: "0.25s ease",
  cursor: "pointer",
};

function UploadPage() {

  const navigate = useNavigate();

  const [file, setFile] =
    useState<File | null>(null);

  const [summary, setSummary] =
    useState<any>(null);

  const [target, setTarget] =
    useState("");

  const [taskType, setTaskType] =
    useState("");

  const handleUpload = async () => {

    if (!file) return;

    try {

      const result =
        await uploadDataset(file);

      setSummary(
        result.data.summary
      );

    } catch (error) {

      console.error(error);

    }

  };

  const handleAnalyze = async () => {

    if (!target) return;

    try {

      const result =
        await selectTarget(
          target
        );

      setTaskType(
        result.data.task
      );

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "0 24px",
          fontFamily: "Arial",
        }}
      >

        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "12px",
              color: "#111827",
            }}
          >
            Upload Dataset
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#6b7280",
              maxWidth: "700px",
              lineHeight: "30px",
            }}
          >
            Upload a CSV dataset to profile your data,
            train a machine learning model, discover
            failure regions, and generate a complete
            FailureMap report.
          </p>
        </div>
        <div style={uploadCardStyle}>
          <h2
            style={{
              marginTop: 0,
              marginBottom: "10px",
              color: "#111827",
            }}
          >
            📁 Dataset
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "24px",
            }}
          >
            Choose a CSV dataset to begin your machine learning analysis.
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {

              if (
                e.target.files?.[0]
              ) {

                setFile(
                  e.target.files[0]
                );

              }

            }}
          />
          <div
            style={{
              marginTop: "18px",
              padding: "12px 16px",
              borderRadius: "10px",
              background: file ? "#ECFDF3" : "#F3F4F6",
              color: file ? "#047857" : "#6B7280",
              fontWeight: 600,
              width: "fit-content",
            }}
          >
            {file
              ? `Selected: ${file.name}`
              : "No file selected"}
          </div>
          <br />
          <br />
          <div style={{ height: "28px" }} />

          <button style={primaryButtonStyle}
            onClick={handleUpload}
          >
            Upload Dataset
          </button>
        </div>
        {

          summary && (

            <div>

              <h2>
                Dataset Summary
              </h2>

              <p>
                Rows: {summary.rows}
              </p>

              <p>
                Columns: {summary.columns}
              </p>

              <p>
                Missing Values: {summary.missing_values}
              </p>

              <p>
                Duplicates: {summary.duplicates}
              </p>

              <h3>
                Columns
              </h3>

              <ul>

                {

                  summary.column_names.map(
                    (
                      col: string
                    ) => (

                      <li
                        key={col}
                      >
                        {col}
                      </li>

                    )
                  )

                }

              </ul>

              <h3>
                Select Target
              </h3>

              <select
                value={target}
                onChange={(e) =>
                  setTarget(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Target
                </option>

                {

                  summary.column_names.map(
                    (
                      col: string
                    ) => (

                      <option
                        key={col}
                        value={col}
                      >
                        {col}
                      </option>

                    )
                  )

                }

              </select>

              <br />
              <br />

              <button
                onClick={
                  handleAnalyze
                }
              >
                Analyze Target
              </button>

              {

                taskType && (

                  <div>

                    <h3>
                      Target Analysis
                    </h3>

                    <p>
                      Target: {target}
                    </p>

                    <p>
                      Task: {taskType}
                    </p>

                    <br />

                    <button
                      onClick={() =>
                        navigate(
                          "/train"
                        )
                      }
                    >
                      Continue to Training →
                    </button>

                  </div>

                )

              }

            </div>

          )

        }

      </div>
    </>
  );

}

export default UploadPage;