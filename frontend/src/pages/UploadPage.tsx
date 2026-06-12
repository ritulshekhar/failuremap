import { useState } from "react";
import { uploadDataset } from "../api/api";

function UploadPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [summary, setSummary] =
    useState<any>(null);

  const handleUpload = async () => {

    if (!file) return;

    try {

      const result =
        await uploadDataset(file);

      setSummary(result.summary);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>FailureMap</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => {

          if (e.target.files?.[0]) {

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

      {summary && (

        <div>

          <h2>
            Dataset Summary
          </h2>

          <p>
            Rows:
            {summary.rows}
          </p>

          <p>
            Columns:
            {summary.columns}
          </p>

          <p>
            Missing Values:
            {summary.missing_values}
          </p>

          <p>
            Duplicates:
            {summary.duplicates}
          </p>

          <h3>
            Columns
          </h3>

          <ul>

            {
              summary.column_names.map(
                (col: string) => (

                  <li key={col}>
                    {col}
                  </li>

                )
              )
            }

          </ul>

        </div>

      )}

    </div>

  );
}

export default UploadPage;