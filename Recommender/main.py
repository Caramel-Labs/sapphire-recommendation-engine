from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as recommender_router

# Instantiate FastAPI application
app = FastAPI(
    title="Sapphire Intelligence",
    description="Sapphire Intelligence is the reasoning and cognitive aspect of Sapphire.",
)

# Bind routers to primary application
app.include_router(recommender_router)

# Define allowed origins for CORS
origins = [
    "*",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4000",
]

# Setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root route (to test service health)
@app.get("/", tags=["Sapphire Recommender (Internals)"])
async def root():
    return {
        "message": "Sapphire Recommnender is up and running.",
    }
