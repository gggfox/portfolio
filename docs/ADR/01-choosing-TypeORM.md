# Choosing Type ORM as the database abstraction

- Created at: 2024-JUN-25
- Updated at: 2024-JUN-25

## Status

- [X] ACCEPTED
- [ ] REJECTED
- [ ] DEPRECATED
- [ ] SUPERSEDED

## Context

Looked into an ORM for the portfolio project looked into Drizzle because it seemed to have great word of mouth,
but correctly setting it up was tricky and possible some issues were discovered. Looked into Kysely next it was not
really an ORM but more of a query builder with great Typescript support, decided to go with TypeORM because I had the
most experience with this and the set up was the simplest of all the options.

## Decision

Going to use TypeORM its pretty stable and easy to set up.

## Consequences

give up on some new features that could give a better DX.
