# LLM Workstation

- This repo was inspired by Mckay Wrigley's AI Workflow. See his [template](https://github.com/mckaywrigley/mckays-app-template) and [o1 parser](https://github.com/mckaywrigley/o1-xml-parser). Much of this code originated from him.

- This will allow you to put together massive prompts with codebases appended and automatically copy everything to your clipboard.

- Best when used to paste into a big LLM like openai o1 or gemini fast 2.0 and can one shot a code update.

- Copy and paste the output from the LLM into the `LLM XML Parser`. Use the absolute file path to the repository for `Project Directory`. Select `Apply` and code changes from the LLM will be applied to your repository.

- Create environment variable `GEMINI_API_KEY` to use the LLM Chatbox if you prefer the in app chatbox.

## How to run

`npm run dev`
