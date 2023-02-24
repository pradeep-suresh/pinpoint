import hashlib
import time

import base58


def generate_short_code(url):
    '''
    Create hash using the SHA256 and then use base58 encoder 
    '''
    hashing_function = url.encode("utf-8") + str(time.time()).encode("utf-8")
    h = hashlib.sha256()
    h.update(hashing_function)
    return base58.b58encode(h.hexdigest()[:10])
