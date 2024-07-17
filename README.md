# LLM Quantisation Visualisations

This project provides interactive visualisations to help understand the impact and trade-offs of quantisation with relation to perplexity, model parameter size and performance in Large Language Models (LLMs).

The data is mainly focused on GGUF quantisation, but the visualisations can be used to understand other quantisation techniques as well. I plan to add more quantisation techniques and models in the future.

[![](screenshot.png)](quantisation-dashboard.html)

[Blog post](https://smcleod.net/2024/07/understanding-ai/llm-quantisation-through-interactive-visualisations/)

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

### Perplexity vs Compression Chart

This chart illustrates the relationship between model compression and perplexity increase. It aims to help understand how different quantisation levels affect model quality and size reduction.

### Quantisation Spectrum Heatmap

This table provides a quick overview of various quantisation types, their relative sizes, qualities, and performance characteristics on different hardware (CUDA and Metal). It's for quickly comparing different quantisation options at a glance.

### Quantisation Sweet Spots

This table helps to identify the optimal quantisation level for different model sizes and VRAM constraints. It's useful for those working with specific hardware limitations.

### Quantisation Efficiency

These charts dive deeper into the efficiency of quantisation across different model sizes. They show how perplexity increase per GB saved changes with model size and quantisation.

### Decision Tree

This visual guide helps users navigate the decision-making process for selecting the most appropriate quantisation level based on their priorities (quality vs. size) and hardware constraints.

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
