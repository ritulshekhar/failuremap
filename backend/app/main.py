from fastapi import FastAPI

app = FastAPI(title="FailureMap")

@app.get("/")
def root():
    return {"status": "running"}