Sound of Text API
---

The API for creating audio files generated using TTS technology, in many
different languages.

# Documentation

## POST /sounds/

### Request

#### Amazon Polly Engine

```json
{
    "engine": "polly",
    "data": {
        "text": "Hello, world",
        "voice": "Amy",
        "prosody": {
            "rate": "x-slow"
        }
    }
}
```

Prosody options come from SSML.
Only `rate` is supported, and it applies to the entire text fragment.

#### Google TTS Engine

```json
{
    "engine": "google",
    "data": {
        "text": "Hello, world",
        "language": "en"
    }
}
```

### Response

#### On Success

```json
{
    "success": true,
    "url": "http://hostname/full/path/to/audio.mp3",
    "request": {
        ...
    }
}
```

#### On Failure

```json
{
    "success": false,
    "message": "Generation failed due to..."
}
```

## GET /donations/

### Response

```json
[
    {
        "amount": 10.50,
        "date": "2017-07-03"
    },
    ...
]
```
