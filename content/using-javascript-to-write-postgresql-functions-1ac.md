---
title: Using JavaScript to write PostgreSQL functions
test: this is a test
---

If you're new to PostgreSQL, just understand you can write functions or stored procedures to conveniently capture and reuse processes.

PostgreSQL includes it's own lanaguge called PL/pgSQL which is an extension of the SQL language. It makes it more powerful by enabling things like variables and loops to write more versatile logic.

Here is a very primitive calculator function written in PL/pgSQL.

```sql
create or replace function calc_plpgsql(x int, y int, func text)
returns int
as
$$
declare
 result int = null;
begin
	if func = '+' then
		result =  x + y;
	elsif  func = '-' then
		result = x - y;
	elsif  func = '*' then
	result = x * y;
	elsif  func = '/' then
	result = x / y;
	else
		raise exception 'Invalid function provided';
	end if;
	
	return result;
end
$$
language plpgsql;

select calc_plpgsql(5,5,'+') -- returns 10
```

To break this down. First we're creating a new function called `calc_plpgsql`. This takes three arguments `x`, `y` and `func`. `x` and `y` are both integers, and `func` will be a string which will signify the calculation function to perform e.g `'+'`, `'-'` , `'*'` or `/`. 

Note, we wrap our logic for the function in `$$`. This is known as dollar-quoted strings and is equivalent to [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) in JavaScript. It is a very common pattern when writing functions and stored procedures in PostgreSQL. It allows us to write any code between the `$$`'s without needing to escape single quotes and backslashes which can produce un-readable code.

Next, we can make use of `if`, `elsif` and `else` for conditional logic to detect what was passed into the `func` argument.

The last line is interesting. We state the language we want PostgreSQL to parse in the dollar quoted string. In this example we are using `language plpgsql`. 

When I first saw this it got me thinking. "Does this mean we can use other languages too!?". Turns out you can. PostgreSQL also supports other procedural languages such as Python, C and my favourite, JavaScript!

To be able to write JavaScript for your PostgreSQL function, you have to ensure that PL/v8 has been installed on your database server. If not, then there are a couple of [additional steps required](https://www.xtuple.com/knowledge/installing-plv8).

Once installed you can run:

```sql
CREATE EXTENSION plv8;
```

To test Pl/v8 ready, we can run:

```sql
SELECT plv8_version(); -- shoud show something similar to `3.0alpha`
```

Now lets rewrite our calculator function in JavaScript.

```sql
create or replace function calc_plv8(x int, y int, func text)
returns int
as
$$
if (func === '+'){
	return x + y
}
else if (func === '-'){
	return x - y
}
else if (func === '*'){
	return x * y
}
else if (func === '/'){
	return x - y
} else {
	plv8.elog(ERROR, 'invaid function');
}
$$
language plv8;

select calc_plv8(5,5,'+') -- returns 10
```

How fun is that?

Note, we're using the V8 JavaScript engine inside the context on a database engine so this is not node.js or a browser. This means we don't have access to all the APIs you may expect, such as `console.log`, instead you'll need to use `plv8.elog`. Also don't expect to be able to import libraries from NPM or anything! Nonetheless, I thought it was interesting to know this is possible. 

If you want an easy way to test this out, I recommend spinning up a PostgreSQL database via https://supabase.io. It's free!

## Further Reading

- [https://plv8.github.io/](https://plv8.github.io/)
- [https://www.postgresqltutorial.com/postgresql-plpgsql/](https://www.postgresqltutorial.com/postgresql-plpgsql/)
