from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_hello():
  response = client.get("/")
  assert response.status_code == 200
  assert response.json() == {"message": "Backend is running!"}

def test_models_name():
  response = client.get("/models")
  assert response.status_code == 200
  data = response.json()

  assert isinstance(data, list)
  assert len(data) > 0
  assert all(isinstance(x["name"], str) for x in data)

def test_model_weight():
  model_list = client.get("/models").json()
  model = model_list[0]["name"]

  response = client.get(f"/models/{model}/weight")
  assert response.status_code == 200

  data = response.json()

  assert isinstance(data, (int, float))
  assert data > 0