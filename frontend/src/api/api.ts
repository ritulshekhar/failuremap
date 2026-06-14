import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";


export const uploadDataset =
async (
  file: File
) => {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(
      `${API_URL}/upload`,
      formData
    );

  return response.data;
};


export const trainModel =
async (
  target: string
) => {

  const response =
    await axios.post(
      `${API_URL}/train`,
      {
        target
      }
    );

  return response.data;
};