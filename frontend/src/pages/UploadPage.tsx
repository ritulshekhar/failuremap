import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  uploadDataset,
  selectTarget,
} from "../api/api";

import Navbar from "../components/Navbar";

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

        <br />
        <br />

        <button
          onClick={handleUpload}
        >
          Upload Dataset
        </button>

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