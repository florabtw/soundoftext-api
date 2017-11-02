Sound of Text API
---

The API for creating audio files generated using TTS technology, in many
different languages.

# Setup

Copy the `bin/environment.sh.example` file to `bin/environment.sh`.

Change the variables.

Then source the file.

# Documentation

## Language Codes

Full list of language codes and values:

| Code  | Language |
| ----- | -------- |
| af-ZA | Afrikaans |
| sq    | Albanian |
| ar-AE | Arabic |
| hy    | Armenian |
| bn    | Bengali |
| bs    | Bosnian |
| ca-ES | Catalan |
| yue-Hant-HK | Chinese, Cantonese (Traditional) |
| cmn-Hans-CN | Chinese, Mandarin (Simplified) |
| hr-HR | Croatian |
| cs-CZ | Czech |
| da-DK | Danish |
| nl-NL | Dutch |
| en-AU | English (Australia) |
| en-GB | English (United Kingdom) |
| en-US | English (United States) |
| eo    | Esperanto |
| fi-FI | Finnish |
| fr-FR | French |
| de-DE | German |
| el-GR | Greek |
| hi-IN | Hindi |
| hu-HU | Hungarian |
| is-IS | Icelandic |
| id-ID | Indonesian |
| it-IT | Italian |
| ja-JP | Japanese (Japan) |
| km    | Khmer |
| ko-KR | Korean |
| la    | Latin |
| lv    | Latvian |
| mk    | Macedonian |
| ne    | Nepali |
| nb-NO | Norwegian |
| pl-PL | Polish |
| pt-BR | Portuguese |
| ro-RO | Romanian |
| ru-RU | Russian |
| sr-RS | Serbian |
| si    | Sinhala |
| sk-SK | Slovak |
| es-MX | Spanish (Mexico) |
| es-ES | Spanish (Spain) |
| sw    | Swahili |
| sv-SE | Swedish |
| ta    | Tamil |
| th-TH | Thai |
| tr-TR | Turkish |
| uk-UA | Ukrainian |
| vi-VN | Vietnamese |
| cy    | Welsh |

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
