from fastapi import FastAPI

app = FastAPI(
    title="My API",
    description="This is my FastAPI project with Swagger UI.",
    version="1.0.0"
)

@app.get('/')
def welcome():
    return {'message': 'Welcome to my FastAPI application'}
