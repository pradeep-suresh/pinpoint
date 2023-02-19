import json

def test_add_url(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        '/shortener',
        data = json.dumps({
            'url' : 'www.google.com'
        }),
        content_type='application/json'
    )

    data = json.loads(resp.data.decode())
    assert resp.status_code == 201