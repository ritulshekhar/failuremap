import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export async function uploadDataset(
  file: File
) {
  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function selectTarget(
  target: string
) {
  const response = await axios.post(
    `${API_URL}/target`,
    {
      target,
    }
  );

  return response.data;
}

export async function trainModel() {
  const response = await axios.post(
    `${API_URL}/train`
  );

  return response.data;
}

export async function getFailureMap() {
  const response = await axios.get(
    `${API_URL}/failure-map`
  );

  return response.data;
}

export async function getFailureRegions() {
  const response = await axios.get(
    `${API_URL}/failure-regions`
  );

  return response.data;
}

export async function getVisualizations() {
  const response = await axios.get(
    `${API_URL}/visualizations`
  );

  return response.data;
}

export async function getAIAnalysis() {
  const response = await axios.get(
    `${API_URL}/ai-analysis`
  );

  return response.data;
}

export async function getExplainability() {
  const response = await axios.get(
    `${API_URL}/explain`
  );

  return response.data;
}