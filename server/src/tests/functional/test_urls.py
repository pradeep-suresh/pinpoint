import json


def test_add_url(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        "/shortener",
        data=json.dumps({"url": "www.google.com"}),
        content_type="application/json",
    )

    data = json.loads(resp.data.decode())
    assert resp.status_code == 201


def test_add_duplicate_url(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        "/shortener",
        data=json.dumps({"url": "www.google.com"}),
        content_type="application/json",
    )

    data = json.loads(resp.data.decode())
    assert resp.status_code == 400


def test_get_urls(test_app, test_database):
    client = test_app.test_client()
    resp = client.get(
        "/shortener",
    )
    data = json.loads(resp.data.decode())
    assert data["page"] == 1
    assert data["total"] == 1


def test_delete_urls(test_app, test_database):
    client = test_app.test_client()
    resp = client.get(
        "/shortener",
    )
    data = json.loads(resp.data.decode())
    short_code = data["items"][0]["short_code"]
    resp = client.delete(f"/shortener/{short_code}")
    assert resp.status_code == 404
