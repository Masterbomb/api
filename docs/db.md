# Postgres

Some notes for future me.

## Launch postgres
```bash
npm run start-db
```
I named the container `postgres` specced by the `docker-compose.yaml` file in `docker/` and setup a postgres user with the credentials given in the .env file.

## Inspect logs
```bash
docker logs postgres
```

## Shell into container
This is nice for sandboxing some sql. Shell into the container and run the postgres cli tool as the postgres user:
```bash
docker exec -it postgres /bin/bash
...
psql -U postgres mydb
```

## CLI Commands
List all databases:
```postgres
\l
```

list all tables in database (`+` gives additional info):
```postgres
\dt+
```
## Sandboxing Notes
### BOM Table Query:
```sql
select parts.name, (select name as supplier from suppliers where id=parts.supplier_id), (select name as manufacturer from manufacturers where id=parts.manufacturer_id), bom.quantity, bom.net_price from bom join parts on bom.part_id=parts.id;
```

This performs an inner join on parts and bom tables and selects the important data to display. The supplier_id and manufacturer_id values are sub-queried for their respective name fields. We use aliases to clean up the colomn names:

Result:
 name  |      supplier      | manufacturer | quantity | net_price 
-------+--------------------+--------------+----------+-----------
 TIP22 | Test Supplier Name |              |        5 |       NaN
 TIP22 | Test Supplier Name |              |        4 |       NaN
 TIP22 | Test Supplier Name |              |        7 |     30.10