# brobbot-google-image-bomb

A [brobbot](https://github.com/b3nj4m/hubot) script to bomb a room with multiple image results.

## Commands

### Bomb

```
brobbot bomb [me] <query>
```

Respond with some image results matching `query`.

### Bomb (alternate form)

```
brobbot <query>bomb [me]
```

Respond with some image results matching `query`.

## Configuration

### Referer

```bash
BROBBOT_GOOGLE_IMAGE_BOMB_REFERER=url
```

The referer URL to be passed to the Google API (see https://developers.google.com/image-search/v1/jsondevguide).
