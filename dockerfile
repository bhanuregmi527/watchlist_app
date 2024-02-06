FROM node:lts-alpine3.19
RUN apk --no-cache add postgresql-client

# Set environment variables for PostgreSQL connection
ENV PGHOST=postgres
ENV PGUSER=postgres
ENV PGPASSWORD=bhanu
ENV PGDATABASE=watchlist
ENV PGPORT=5432

RUN npm install -g nodemon
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm","start" ]