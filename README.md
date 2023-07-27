For Summations.

![Screenshot](https://github-production-user-asset-6210df.s3.amazonaws.com/6403562/256427415-702de7ba-af75-42d4-948a-443b00461015.png)

## Installation and running

```
pnpm i
pnpm dev
```

## Features

- Error handling:
  - Empty DOI
  - Invalid DOI
  - No abstract in given DOI
- Caching of previous searches:
  - All previous searches are listed at the bottom of the page
  - If you re-input a DOI that you've already used, the cached abstract will be immediately displayed, without hitting the network again
