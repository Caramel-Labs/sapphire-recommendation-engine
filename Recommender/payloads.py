from pydantic import BaseModel
from typing import List


class TouristInterests(BaseModel):
    activities: List[str]
