
# ETF Investment Calculator India

A modern, responsive ETF Investment Calculator built with Next.js, Tailwind CSS, and Recharts.

## Features

-   **Investment Inputs**: SIP amount, Lumpsum, Duration, Expected Return.
-   **Advanced Options**: Step-up SIP, Expense Ratio, Inflation Adjustment.
-   **Visualizations**: Interactive Line Chart and Allocation Pie Chart.
-   **Themes**: Light and Dark mode.
-   **Data Persistence**: Saves your inputs locally so you don't lose them.
-   **Export**: Download report as PDF or share the link.

## Getting Started

### Prerequisites

-   Node.js 18+ installed.

### Installation

1.  Open a terminal in the project directory.
2.  Install dependencies:
    ```bash
    npm install
    # If you encounter issues on Windows/OneDrive, try:
    # npm install --no-bin-links
    ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

If you encounter `Next.js` or `npm ` errors on Windows (especially with OneDrive):
1.  Try deleting `node_modules` and `package-lock.json`.
2.  Run `npm install --no-bin-links`.
3.  If `npm run dev` fails, try running `npx next dev` or `node node_modules/next/dist/bin/next dev` directly.
