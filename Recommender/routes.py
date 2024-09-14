from fastapi import APIRouter
import pandas as pd
import re
import numpy as np
from payloads import TouristInterests
from utilities import generate_bert_embeddings, compute_cosine_similarity
from transformers import BertTokenizer, TFBertModel

# Setup chatbot router
router = APIRouter(
    prefix="/recommender",
    tags=["Sapphire Recommendation Engine"],
)


# Recommendation function
def recommend_places(activities, df, tokenizer, model, top_n=5):
    total_similarities = np.zeros(len(df))

    # Dynamically create the activity weighting dictionary
    default_weight = 1.0
    activity_weighting = {activity: default_weight for activity in activities}

    # Apply specific weights if needed
    activity_weighting[activities[0]] = 1.5

    # Loop through each activity, process it separately, and compute similarity
    for activity in activities:
        # Preprocess and get the embedding for each individual activity
        cleaned_activity = re.sub("[^A-Za-z0-9]+", " ", activity.lower())
        activity_embedding = generate_bert_embeddings(
            cleaned_activity, tokenizer, model
        )

        # Compute cosine similarities between the activity embedding and all place embeddings
        similarities = compute_cosine_similarity(
            activity_embedding, df["activity_embeddings"].tolist()
        )

        # Apply activity weighting
        weight = activity_weighting.get(activity, 1)
        total_similarities += similarities * weight

    # Add the similarity scores to the DataFrame
    df["similarity"] = total_similarities / len(
        activities
    )  # Normalize by number of activities

    # Sort the DataFrame based on similarity scores in descending order
    df_sorted = df.sort_values(by="similarity", ascending=False)

    # Return the top N recommendations (excluding places with zero similarity)
    recommendations = df_sorted[df_sorted["similarity"] > 0].head(top_n)

    return recommendations["name"].tolist()


# Define the route for recommendations
@router.post("/recommend")
def get_recommendations(interests: TouristInterests):
    print("Controller fired")
    print(interests.activities)
    df = pd.read_csv("data/places_with_embeddings.csv")
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    model = TFBertModel.from_pretrained("bert-base-uncased")

    recommended_places = recommend_places(interests.activities, df, tokenizer, model)
    return {
        "favouredPlaces": interests.activities,
        "recommendedPlaces": recommended_places,
    }


# Test router health
@router.get("/ping")
def test_router():
    return {
        "message": "Sapphire Recommender router is up and running.",
    }


if __name__ == "__main__":
    pass
