# linky

[ ![Codeship Status for jacobx1/linky](https://app.codeship.com/projects/1ea2f9c0-fa8f-0135-6fd6-467245c6186e/status?branch=master)](https://app.codeship.com/projects/278835)

Bookmark store built on angular and node

Yeah, so, this is my new pet-project that I am using to learn technologies I wanted to work with

- typescript
- angular
- codeship
- codedeploy
- mariadb

## Pre-reqs

- MariaDB
- NodeJS (latest)

## Build

```
git clone https://github.com/jacobx1/linky.git
cd linky
```

**Install build Pre-reqs**

```
npm install -g @angular/cli typescript runjs-cli npx
npm install
```

**Do the build**

```
npx run build
```

## Run

Set the following envars - optional unless otherwise noted

- `DB` - database name (be sure to create it first)
- `DB_HOST` - database hostname
- `DB_PORT` - database port
- `DB_USER` - ***required*** - MariaDB user with access to `linky` (or custom db name)
- `DB_PASS` - ***required*** - database password
- `CORS_ORIGIN` - url of angular app - set to `http://localhost:4200` for local run

Then run it!

```
npx run dev
```
