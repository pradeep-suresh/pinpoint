import json 

def test_redirect_url(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        '/shortener',
        data = json.dumps({
            'url' : 'www.google.com'
        }),
        content_type='application/json'
    )
    data = json.loads(resp.data.decode())
    short_code = data['short_code']
    resp = client.get(
        f'/{short_code}',
    )
    assert resp.headers['location'] == 'www.google.com'
    assert resp.status_code == 301