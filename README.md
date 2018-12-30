# Space Ships

A fun browser game where you drive around your spaceship in a variety of open worlds with other players.

### Building locally

To setup the ENV variables, copy the .env.example file and change the variables or leave them as default for local
development.

```bash
cp .env.example .env
```

Given you have [Docker](https://www.docker.com/get-started) downloaded onto your machine, run the following command.

```bash
docker-compose up
```

This will take a while the first time you run this command.

**!! IMPORTANT !!**

When you install a new npm package you will need to run`docker-compose up --build` command.

When the container is restarted the database and all data will be removed and re-created.
