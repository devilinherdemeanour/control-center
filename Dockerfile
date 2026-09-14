# Build Angular 14 frontend (needs Node 16)
FROM node:16-bullseye AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npx ng build --configuration=production

# Runtime: API + static UI
FROM node:18-bullseye-slim
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci --omit=dev
COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/dist/frontend ./frontend/dist/frontend

ENV NODE_ENV=production
ENV PORT=4535
EXPOSE 4535

WORKDIR /app/backend
CMD ["node", "src/server.js"]
