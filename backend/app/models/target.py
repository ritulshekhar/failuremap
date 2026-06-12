from pydantic import BaseModel

class TargetRequest(BaseModel):
    target: str

