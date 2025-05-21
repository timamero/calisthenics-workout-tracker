from typing import Union

from fastapi import FastAPI
import httpx
from .config import settings

app = FastAPI(title=settings.app_name, debug=settings.debug)


@app.get("/")
def read_root():
    return {"HELLO": "WORLD"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/test")
def read_test():
    r = httpx.get("https://www.example.org/")
    return r.text
