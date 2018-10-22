Sound of Text API
---

The API for creating audio files generated using TTS technology, in many
different languages.

# Table of Contents

- [Development](#development)
- [Deployment](#deployment)
- [User Documentation](#documentation)

# Development

Fill in local environment variables:

```
$ cp .env.template .env
$ vim .env # make changes!
$ source .env
```

Install dependencies:

```
$ yarn
```

Start development server:

```
$ yarn develop
```

# Deployment

## Versioning

To bump the version and push to docker:

```
$ yarn release
```

## Production

Deploying to production server:

```
$ cp .env.template .env
$ vim .env # make changes!
$ set -a
$ source .env
$ ./scripts/deploy.sh
```

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

An HTTP status code of 400 with payload:

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
