# WealthCalc India — Professional ETF Calculator

A high-performance, professional, and responsive ETF Investment Calculator built with Vanilla HTML, CSS, JavaScript, and Chart.js.

## Features

-   **Professional Fintech UI**: Inspired by Groww and Zerodha with a clean, trustworthy design.
-   **SIP Compounding Logic**: Precise financial calculations for long-term wealth planning.
-   **Dynamic Visualizations**: Interactive Area Charts using Chart.js to visualize investment growth.
-   **Dark Mode**: Native dark mode support with theme persistence.
-   **No-Build Required**: Pure vanilla project for maximum performance and portability.
-   **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.

## Deployment

This project is configured for static hosting (Vercel, GitHub Pages, Netlify).

-   **Vercel**: Automatically deployed via `vercel.json`.
-   **Local Running**: Simply open `index.html` in your browser.

## Project Structure

- `index.html`: Semantic HTML5 structure.
- `styles.css`: Modern fintech styling & dark mode.
- `script.js`: Calculation logic and Chart.js integration.
- `vercel.json`: Deployment configuration.
- `legacy/`: Folder containing the original Next.js codebase.

## Calculations

The calculator uses the standard Future Value formula for SIPs:
`FV = P * [((1 + r)^n - 1) / r] * (1 + r)`
Where:
- `P` = Monthly investment
- `r` = Monthly return rate
- `n` = Number of months

---
*Built for smart investors.*
