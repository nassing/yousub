import requests
import json

def test_get_link():
    # Test that the function returns a link when links are available
    response = requests.post("http://localhost:5000/", json={"username": "user2"})
    assert response.status_code == 200
    link = json.loads(response.text)["link"]
    print(link)

test_get_link()