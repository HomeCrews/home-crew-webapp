# Two stages: build the bundle with Node, serve it with nginx.
#
# Unlike the service Dockerfiles - which are single-stage and expect `mvn
# package` to have already run - this one builds inside the image. There is no
# equivalent of the Maven wrapper's "the jar is already there" convention for a
# Node project, and shipping Node in the runtime image to serve static files
# would be ~200MB of interpreter doing nothing.

FROM node:24-alpine AS build

WORKDIR /app

# Dependencies first, in their own layer: package.json changes far less often
# than src/, so this layer survives most rebuilds.
#
# `npm install`, not `npm ci`, and only until a lockfile is committed - `npm ci`
# REQUIRES package-lock.json and fails without one. Switch to `npm ci` the day
# that file lands; see the note in README.md about generating it.
COPY package.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

# ---------------------------------------------------------------------------

FROM nginx:1.29-alpine

# The SPA fallback lives here rather than in the default config, because a
# missing try_files is invisible until someone deep-links to /bookings and gets
# a 404 from nginx instead of the app.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# outputPath is pinned to dist/webapp in angular.json; the application builder
# puts the browser bundle in a browser/ subdirectory under it.
COPY --from=build /app/dist/webapp/browser /usr/share/nginx/html

EXPOSE 80

# nginx's own image already has a sensible CMD; no ENTRYPOINT override needed.
