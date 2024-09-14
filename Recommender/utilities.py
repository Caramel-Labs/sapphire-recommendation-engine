import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


def compute_cosine_similarity(embedding, embeddings):
    """
    Compute cosine similarity between a single embedding and all other embeddings.

    Args:
    - embedding (np.ndarray): The embedding vector for the input set of tourist interests.
    - embeddings (list of np.ndarray): List of all location embedding vectors in the dataset.

    Returns:
    - similarities (np.ndarray): Array of cosine similarities.
    """
    similarities = cosine_similarity(
        embedding.reshape(1, -1), np.vstack(embeddings)
    ).flatten()
    return similarities


def generate_bert_embeddings(text, tokenizer, model):
    # Tokenize the input text
    inputs = tokenizer(
        text, return_tensors="tf", padding=True, truncation=True, max_length=512
    )

    # Use the Hugging Face TFBertModel to get the embeddings
    outputs = model(inputs)

    # Return the pooled output (embedding for the [CLS] token)
    return outputs.pooler_output.numpy()


if __name__ == "__main__":
    pass
