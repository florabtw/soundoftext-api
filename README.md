Sound of Text API
---

The API for creating audio files generated using TTS technology, in many
different languages.

# Deployment

In order to deploy from your local machine:

1. Fill in a `.env` file
  - Look at `.env.template` to know which variables you need
  - Use `./scripts/make-dotenv.sh` to create file from environment
2. Run `./scripts/deploy.sh`

Deployment can also be set up through Travis CI (look at `.travis.yml`).

# Deployment

1. Setup personal environment (Spawn)
2. Run setup script (scripts/setup.sh)
3. Run deployment script (scripts/production.sh)

# Documentation

## Language Codes

Language codes come from the
[google-tts-languages](https://github.com/ncpierson/google-tts-languages)
repository.

# Reference

## POST /sounds/

### Request

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

An HTTP status code of 200 with payload:

```json
{
    "success": true,
    "id": "<RFC4122 uuid>"
}
```

IDs look something like this: "416eda90-552e-11e7-9a60-63d42f732a9c"

#### On Failure

An HTTP status code of 400 or 500 with payload:

```json
{
    "success": false,
    "message": "Request failed due to..."
}
```

## GET /sounds/:id

### Response

#### On Success

First, the sound will be pending if it is not done being fetched:

```json
{
    "status": "Pending"
}
```

Once complete, you will receive a different status:

```json
{
    "status": "Done",
    "location": "https://hostname/full/path/to/audio.mp3"
}
```

Otherwise, you will receive an error:

```json
{
    "status": "Error",
    "message": "Failed to generate due to..."
}
```

# Future Plans

I would like to support Amazon Polly someday. The request could look like this:

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
