import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  uploadDataset,
  selectTarget,
} from "../api/api";

import Navbar from "../components/Navbar";

import LoadingOverlay from "../components/LoadingOverlay";

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

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [analysisComplete, setAnalysisComplete] =
    useState(false);
  const [uploading, setUploading] =
    useState(false);

  const [uploadSuccess, setUploadSuccess] =
    useState(false);

  const handleUpload = async () => {

    if (!file) return;

    setUploading(true);

    try {

      const result =
        await uploadDataset(file);

      setSummary(
        result.data.summary
      );
      setUploadSuccess(true);
    } catch (error) {

      console.error(error);

    } finally {

      setUploading(false);

    }

  };

  const handleAnalyze = async () => {

    if (!target) return;

    setIsAnalyzing(true);

    try {

      const result =
        await selectTarget(target);

      setTaskType(
        result.data.task
      );
      setAnalysisComplete(true);
    } catch (error) {

      console.error(error);

    } finally {

      setIsAnalyzing(false);

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
            id="csv-upload"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setUploadSuccess(false);
                setFile(e.target.files[0]);
              }
            }}
          />
          <label
            htmlFor="csv-upload"
            style={{
              display: "block",
              border: "2px dashed #cbd5e1",
              borderRadius: "14px",
              padding: "45px",
              textAlign: "center",
              cursor: "pointer",
              background: "#f8fafc",
              transition: "0.2s",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "12px",
              }}
            >
              📂
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Drag & Drop CSV Here
            </div>

            <div
              style={{
                margin: "10px 0",
                color: "#6b7280",
              }}
            >
              OR
            </div>

            <div
              style={{
                color: "#2563eb",
                fontWeight: 600,
              }}
            >
              Click to Browse
            </div>
          </label>
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
          <button
            style={{
              ...primaryButtonStyle,
              opacity: uploading ? 0.7 : 1,
            }}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading
              ? "Uploading..."
              : "Upload Dataset"}
          </button>
          {uploadSuccess && (
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "#ECFDF3",
                border: "1px solid #BBF7D0",
                color: "#166534",
                borderRadius: "12px",
                fontWeight: 600,
              }}
            >
              Dataset uploaded successfully!

              <div
                style={{
                  marginTop: "8px",
                  fontWeight: 400,
                }}
              >
                Your dataset has been profiled and is ready for
                analysis.
              </div>
            </div>
          )}
        </div>
        {

          summary && (

            <div>

              <h2
                style={{
                  marginTop: "50px",
                  marginBottom: "25px",
                  fontSize: "32px",
                  color: "#111827",
                }}
              >
                Dataset Summary
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "24px",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      color: "#6b7280",
                      marginBottom: "10px",
                    }}
                  >
                    Rows
                  </div>

                  <div
                    style={{
                      fontSize: "38px",
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {summary.rows}
                  </div>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      color: "#6b7280",
                      marginBottom: "10px",
                    }}
                  >
                    Columns
                  </div>

                  <div
                    style={{
                      fontSize: "38px",
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {summary.columns}
                  </div>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      color: "#6b7280",
                      marginBottom: "10px",
                    }}
                  >
                    Missing Values
                  </div>

                  <div
                    style={{
                      fontSize: "38px",
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {summary.missing_values}
                  </div>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      color: "#6b7280",
                      marginBottom: "10px",
                    }}
                  >
                    Duplicates
                  </div>

                  <div
                    style={{
                      fontSize: "38px",
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {summary.duplicates}
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb",
                  marginBottom: "40px",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: "20px",
                    color: "#111827",
                  }}
                >
                  Dataset Columns
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  {summary.column_names.map(
                    (col: string) => (
                      <div
                        key={col}
                        style={{
                          background: "#EEF2FF",
                          color: "#2563EB",
                          padding: "10px 18px",
                          borderRadius: "999px",
                          fontWeight: 600,
                          fontSize: "15px",
                        }}
                      >
                        {col}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "30px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb",
                  marginBottom: "40px",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: "10px",
                    color: "#111827",
                  }}
                >
                  Target Selection
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                    marginBottom: "20px",
                  }}
                >
                  Choose the column you want the model to predict.
                </p>

                <select
                  value={target}
                  onChange={(e) => {
                    setTarget(e.target.value);
                    setAnalysisComplete(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    marginBottom: "24px",
                  }}
                >
                  <option value="">
                    Select Target Column
                  </option>

                  {summary.column_names.map(
                    (col: string) => (
                      <option
                        key={col}
                        value={col}
                      >
                        {col}
                      </option>
                    )
                  )}
                </select>

                <button
                  style={{
                    ...primaryButtonStyle,
                    opacity:
                      !target || isAnalyzing
                        ? 0.6
                        : 1,
                    cursor:
                      !target || isAnalyzing
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={
                    !target || isAnalyzing
                  }
                  onClick={handleAnalyze}
                >
                  {isAnalyzing
                    ? "Analyzing..."
                    : "Analyze Target"}
                </button>
              </div>
              {
                analysisComplete && (
                  <div
                    style={{
                      marginTop: "30px",
                      marginBottom: "24px",
                      padding: "18px",
                      background: "#ECFDF3",
                      border: "1px solid #BBF7D0",
                      borderRadius: "12px",
                      color: "#166534",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: "6px",
                      }}
                    >
                      Target analysis completed successfully!
                    </div>

                    <div>
                      The system detected a <b>{taskType}</b> problem and is ready for
                      model training.
                    </div>
                  </div>
                )
              }
              {


                taskType && (
                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: "16px",
                      padding: "32px",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      border: "1px solid #e5e7eb",
                      marginTop: "40px",
                    }}
                  >
                    <h2
                      style={{
                        marginTop: 0,
                        marginBottom: "20px",
                        color: "#111827",
                      }}
                    >
                      Target Analysis
                    </h2>

                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "30px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: "#6b7280",
                            marginBottom: "8px",
                          }}
                        >
                          Selected Target
                        </div>

                        <div
                          style={{
                            display: "inline-block",
                            padding: "10px 18px",
                            background: "#DBEAFE",
                            color: "#1D4ED8",
                            borderRadius: "999px",
                            fontWeight: 600,
                          }}
                        >
                          {target}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            color: "#6b7280",
                            marginBottom: "8px",
                          }}
                        >
                          Detected Task
                        </div>

                        <div
                          style={{
                            display: "inline-block",
                            padding: "10px 18px",
                            background: "#DCFCE7",
                            color: "#166534",
                            borderRadius: "999px",
                            fontWeight: 600,
                          }}
                        >
                          {taskType}
                        </div>
                      </div>
                    </div>

                    <button
                      style={primaryButtonStyle}
                      onClick={() => navigate("/train")}
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
      <LoadingOverlay
        visible={loading}
        message="Uploading dataset..."
      />
    </>
  );

}

export default UploadPage;