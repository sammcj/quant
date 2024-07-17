# LLM Quantisation Visualisations

This project provides interactive visualisations to help understand the impact and trade-offs of quantisation with relation to perplexity, model parameter size and performance in Large Language Models (LLMs).

The data is mainly focused on GGUF quantisation, but the visualisations can be used to understand other quantisation techniques as well. I plan to add more quantisation techniques and models in the future.

[![](screenshot.png)](quantisation-dashboard.html)

## Disclaimer

I am not a ML engineer, data scientist or researcher. I am simply an engineer with an interest in AI.
This project is a result of my personal interest in understanding the impact of quantisation on LLMs.
The visualisations are based on my understanding of the subject and may not be 100% accurate or complete.
I encourage you to verify the information presented here with other sources.

If you find errors - please do let me know! I want to correct my understanding and improve the visualisations over time.

## Purpose

The dashboard is intended to help me answer the following questions:

- Quality-size trade-offs
- Performance implications across different hardware
- Optimal quantisation levels for various model sizes and VRAM constraints
- How to select the best quantisation levels for a given model
- How to interpret the quantisation spectrum and find sweet spots

## Features

- Perplexity vs Compression Chart
- Quantisation Spectrum Heatmap
- Quantisation Sweet Spots Table
- Quantisation Efficiency Charts
- Decision Tree for Quantisation Selection

## Usage

Open `quantisation-dashboard.html` in a web browser to view the interactive visualisations.

### Building

To build the dashboard, run the following command:

```bash
npm i
npm run build
```

To export the dashboard as a static site (`quantisation-dashboard.html`), run:

```bash
npm run export
```

To serve the dashboard locally, run:

```bash
npm run start
```

## Contributing

Beware, the code is quite messy in places, I put the up front effort into the data and visualisations, not the code quality.

Contributions are welcome, please feel free to submit a Pull Request.

## License

- Copyright © 2024 Sam McLeod
- This project is open source and licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
