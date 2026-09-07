# Recipe Finder Pro — Fixed

## Fixes included
- Rebuilt a reliable static frontend (the original deploy archive had no index.html).
- Fixed missing `/api/chat` with a Netlify Function.
- Added a no-key fallback recipe generator so the app can still demonstrate recipes.
- Optional OpenAI support through Netlify environment variables.
- Save Recipe works immediately using browser localStorage; saved recipes persist after refresh.
- Open/delete/copy saved recipes.
- Fixed responsive/mobile UI and warm background colour.
- Serving selector scales fallback recipes.
- Added proper error handling and disabled states.
- Kept the original favicon and included the original uploaded logo asset for reference.

## Netlify AI setup (optional)
In Netlify: Site configuration → Environment variables:
- `OPENAI_API_KEY` = your API key
- `OPENAI_MODEL` = optional model name (default `gpt-4o-mini`)

Then redeploy. Without the key, the built-in fallback recipes still work.

## Deploy
Upload this folder as a Netlify site, or connect the folder/repository. The publish directory is the project root.
