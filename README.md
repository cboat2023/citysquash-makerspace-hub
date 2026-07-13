# CitySquash Makerspace Hub

CitySquash Makerspace Hub is a static student resource website for a five-week makerspace program. It includes weekly
activities, safety and technical references, project ideas, a makerspace pledge, and a project progress dashboard.

## Run locally

From the project folder, start a static web server:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in a browser. The site uses only HTML, CSS, and JavaScript; no package installation,
backend, database, or login is required.

## Publish with GitHub Pages

1. Create a public GitHub repository named `citysquash-makerspace-hub`.
2. Add that repository as the `origin` remote and push the `main` branch.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder, then save.
6. Wait for GitHub Pages to finish its first deployment.

Live website URL: `https://YOUR-GITHUB-USERNAME.github.io/citysquash-makerspace-hub/`

## Update the live website

After editing and testing the site, publish updates with:

```sh
git add .
git commit -m "Describe the website update"
git push origin main
```

GitHub Pages will rebuild the website automatically after the push.

## Privacy reminder

Never commit private student information, form responses, editable spreadsheets, email addresses, API keys, passwords,
environment files, or instructor-only documents. Only use a read-only published dashboard URL for the class progress
board. Verify that public Google Forms collect only the information intended for students to submit.
