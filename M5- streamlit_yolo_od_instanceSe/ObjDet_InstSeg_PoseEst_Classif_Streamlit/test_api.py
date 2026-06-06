import io
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_pose_image():
    # Read sample image
    with open("resources/images/bus.jpg", "rb") as f:
        file_bytes = f.read()
    
    response = client.post(
        "/predict/pose/image",
        files={"file": ("bus.jpg", file_bytes, "image/jpeg")}
    )
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/jpeg"
    print("Test /predict/pose/image passed!")

def test_pose_json():
    with open("resources/images/bus.jpg", "rb") as f:
        file_bytes = f.read()
    
    response = client.post(
        "/predict/pose/json",
        files={"file": ("bus.jpg", file_bytes, "image/jpeg")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "persons" in data
    print(f"Test /predict/pose/json passed! Found {len(data['persons'])} persons.")

if __name__ == "__main__":
    test_pose_image()
    test_pose_json()
