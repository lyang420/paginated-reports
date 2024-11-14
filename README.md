
This repository is a fork of TheCodingCanal's
[paginated reports](https://github.com/TheCodingCanal/paginated-reports)
project, and is intended to add quality tests, run them in a CI workflow, and
identify potential bugs.

## Getting Started | Setup Instructions

To set up your environment for local development, make sure Node and all its
dependencies are installed, as well as the two testing suites.

```bash
npm install --legacy-peer-deps
npm init playwright@latest
npm install -D vitest
```

In order to run the tests, it is critical that the development server is up
first:

```bash
npm run dev & npx wait-on http://localhost:3000
```

You may view and interact with the application at
[http://localhost:3000](http://localhost:3000) on your browser. To run the test
suites separately:

```bash
npm run test # This command runs the Vite unit tests, specified in package.json.
npx playwriight test
```

## Basic Test Plan

After forking the original repository, install Playwright and Vitest.

Launch the development server and interact with the Web page on browser, as
well as code files, to understand what goes where.

Write Playwright tests to verify date filtering by both UI and URL options
works, device filtering works, the chart and table data all render correctly,
and the PDF download feature works.

Write Vite tests to verify the utility functions handling date parsing and
formatting, and record data transformation, works as expected.

Document bugs found (if any), maintain clean style in code written, add any
descriptive comments needed, and commit regularly to Git.

Create a GitHub Actions workflow that installs necessary dependencies, launches
the application, runs all tests, performs a build check, and generates a
summary of test results.

## Testing Approach

This was my first time using Playwright or Vitest, but development was
relatively straightforward (if a bit clumsy). Playwright comes with a helpful
tool that launches the application and can identify HTML elements based on user
interactions, albeit in a very verbose manner.

There were also a few stumbling blocks arising from differing file extensions
(.js, .ts, .tsx, inclusion of "spec" and "test" in test files, continually
having to adjust configuration files to account for these, etc.).

## Bugs

I found a few issues.

### Incorrect Date Parsing

The first, and most major one, was that the application worked fine on both
Firefox and Chromium browsers, but wouldn't load at all on WebKit (Safari). I'm
uncertain if this is a problem on my end (I'm using a MacBook that is old
enough to no longer support the most recent OS version), but Safari was very
particular about the way dates are parsed. The default "end" date, October 29,
2024, yielded the following error when the page attempted to load for the first
time:

```bash
Error: Invalid date string: 2024-10-29 12:30:06.5450270 -05:00
```

Except there's nothing wrong with that particular date string. It turned out
that converting a date string to ISO format yielded the above text, just
without the spaces in between, which, for some reason, Safari didn't like. To
fix this, I added a regular expression to the utility function that parsed and
converted strings into dates. In addition, I noticed that the file
`/src/components/ProductionReport.tsx` called `Date()` on the default "end"
date above _before_ passing it to the aforementioned utility function, which
was unnecessary. I removed that part, and the application rendered fine on
Safari thereafter.

### Printing

This was probably more of a goof on my end. After forking the original
repository, clicking the "Download" button would yield a console log stating
the "URL is invalid." To fix this, make sure you have an `.env.local` file in
your local folder that contains the following line:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

It is poor form to include `.env*` files in public repositories, but it's
needed in this case, as it doesn't contain personal information, and is also
required for the GitHub Actions workflow to run.

### Suspense Wrapper

After running `npm run build` in the GitHub Actions workflow, I was met with an
error complaining about having to wrap `<ProductionReport>` in `<Suspense>`.
The applicatioon worked fine before this, but I had to follow their suggestion
anyway. This was done because the application, with all its moving parts, but
not be available immediately after launching the development server, and it's
good form to include a temporary notice while it's loading (a simple "loading"
page).
