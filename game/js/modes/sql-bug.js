/**
 * Code Debugger - Mode 11: SQL Bug (30 Challenges)
 * NULL handling, JOIN types, GROUP BY / HAVING, aggregate traps, window functions, indexing, subqueries in SQL.
 */

const SQL_BUG_BANK = [
  {
    id: "sql-01",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 2,
    title: "NULL Comparison with Equal Operator",
    description: "Query searching for users without an email address returns 0 rows.",
    code: `SELECT * FROM users WHERE email = NULL;`,
    options: [
      "Replace equality comparison with IS NULL: SELECT * FROM users WHERE email IS NULL",
      "Use double equal operator comparison: SELECT * FROM users WHERE email == NULL",
      "Use inequality comparison syntax: SELECT * FROM users WHERE email != NULL",
      "Filter with membership list syntax: SELECT * FROM users WHERE email IN (NULL)"
    ],
    correctOption: 0,
    explanation: "WHAT: Three-valued logic NULL comparison. WHY: In SQL, `email = NULL` always evaluates to UNKNOWN (falsy) for every row because NULL represents an unknown value. HOW: Use `WHERE email IS NULL`.",
    basePoints: 85,
    tags: ["sql", "null", "where", "comparison"]
  },
  {
    id: "sql-02",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 2,
    title: "Filtering Aggregate with WHERE instead of HAVING",
    description: "Query trying to filter departments by total employees throws a syntax error.",
    code: `SELECT dept_id, COUNT(*) \nFROM employees \nWHERE COUNT(*) > 5 \nGROUP BY dept_id;`,
    options: [
      "Move the GROUP BY clause to appear immediately before the FROM table reference",
      "Filter aggregate counts using HAVING: GROUP BY dept_id HAVING COUNT(*) > 5",
      "Replace the COUNT(*) aggregate expression with department numeric filter WHERE dept_id > 5",
      "Substitute the COUNT(*) aggregate function with cumulative SUM(*) inside the WHERE clause"
    ],
    correctOption: 1,
    explanation: "WHAT: Misplaced aggregate filter. WHY: The `WHERE` clause filters rows BEFORE grouping occurs. Aggregates like `COUNT(*)` must be filtered in the `HAVING` clause after `GROUP BY`. HOW: Use `HAVING COUNT(*) > 5`.",
    basePoints: 85,
    tags: ["sql", "having", "group_by", "aggregates"]
  },
  {
    id: "sql-03",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 3,
    title: "INNER JOIN Dropping Unmatched Parent Rows",
    description: "Query to list all customers and their orders drops customers who haven't placed any orders.",
    code: `SELECT c.name, o.order_id, o.amount \nFROM customers c \nINNER JOIN orders o ON c.id = o.customer_id;`,
    options: [
      "Switch the join relation to RIGHT JOIN orders o ON c.id = o.customer_id",
      "Replace INNER JOIN with CROSS JOIN orders o ON c.id = o.customer_id",
      "Change INNER JOIN to LEFT JOIN to retain customer rows without matching orders",
      "Append a WHERE o.amount IS NOT NULL predicate to preserve customers with zero orders"
    ],
    correctOption: 2,
    explanation: "WHAT: Loss of non-matching records in INNER JOIN. WHY: `INNER JOIN` only retains rows with matches in BOTH tables. Customers with zero orders are excluded. HOW: Use `LEFT JOIN`.",
    basePoints: 95,
    tags: ["sql", "joins", "left_join", "inner_join"]
  },
  {
    id: "sql-04",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 3,
    title: "Non-Aggregated Column in SELECT with GROUP BY",
    description: "Query selecting user_name along with department count throws SQL error in standard SQL / ONLY_FULL_GROUP_BY.",
    code: `SELECT user_name, dept_id, COUNT(*) \nFROM employees \nGROUP BY dept_id;`,
    options: [
      "Omit dept_id from SELECT clause and group solely by implicit department index keys",
      "Attach an ORDER BY user_name clause to force automatic grouping across names",
      "Replace the COUNT(*) expression with COUNT(user_name) inside the projection list",
      "Add user_name to GROUP BY (GROUP BY dept_id, user_name) or wrap with an aggregate"
    ],
    correctOption: 3,
    explanation: "WHAT: ONLY_FULL_GROUP_BY violation. WHY: Every non-aggregated column in `SELECT` must appear in the `GROUP BY` clause because there may be multiple `user_name` values per `dept_id`. HOW: Add `user_name` to `GROUP BY`.",
    basePoints: 95,
    tags: ["sql", "group_by", "syntax"]
  },
  {
    id: "sql-05",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 3,
    title: "COUNT(column) vs COUNT(*)",
    description: "COUNT(bonus) returns a total smaller than the total number of employee records.",
    code: `SELECT dept, COUNT(bonus) AS total_employees \nFROM staff \nGROUP BY dept;`,
    options: [
      "COUNT(bonus) excludes NULL entries; use COUNT(*) to count all department records",
      "Replace COUNT(bonus) with SUM(bonus) to calculate the full headcount across staff",
      "Append a WHERE bonus IS NULL filter predicate to capture unassigned bonus records",
      "Rename the aggregate function keyword from standard COUNT to TOTAL(bonus) in SQL"
    ],
    correctOption: 0,
    explanation: "WHAT: NULL omission in `COUNT(expr)`. WHY: `COUNT(column)` only counts non-NULL entries. Employees with `bonus = NULL` are skipped. HOW: Use `COUNT(*)` to count rows.",
    basePoints: 95,
    tags: ["sql", "count", "null", "aggregates"]
  },
  {
    id: "sql-06",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 4,
    title: "NOT IN Subquery with NULL Values",
    description: "Query using NOT IN returns 0 rows even though unmatched rows exist.",
    code: `SELECT * FROM products \nWHERE id NOT IN (SELECT product_id FROM order_items); \n-- If order_items has even ONE NULL product_id, NOT IN returns zero rows!`,
    options: [
      "Replace NOT IN operator with != ALL comparison against the order_items dataset",
      "Use NOT EXISTS (SELECT 1 FROM order_items WHERE product_id = products.id) or filter NULLs",
      "Invert the table references by querying from order_items with a subquery on products",
      "Append an ORDER BY id clause to sort the inner product_id values before evaluation"
    ],
    correctOption: 1,
    explanation: "WHAT: `NOT IN` NULL trap. WHY: If any row in the subquery returns NULL, `val NOT IN (..., NULL)` evaluates to UNKNOWN for all rows, returning an empty result. HOW: Use `NOT EXISTS` or filter `IS NOT NULL` in subquery.",
    basePoints: 110,
    tags: ["sql", "subqueries", "not_in", "null"]
  },
  {
    id: "sql-07",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 4,
    title: "WHERE Filter on LEFT JOIN Right Table Converts to INNER JOIN",
    description: "Adding WHERE on right table column negates the LEFT JOIN.",
    code: `SELECT c.name, o.status \nFROM customers c \nLEFT JOIN orders o ON c.id = o.customer_id \nWHERE o.status = 'shipped'; -- Excludes customers without orders!`,
    options: [
      "Convert the join clause from LEFT JOIN to RIGHT JOIN orders o ON c.id = o.customer_id",
      "Relocate the status filter into the HAVING clause after grouping by customer names",
      "Move filter into ON condition: LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'shipped'",
      "Remove the ON join condition and place both joining constraints into the WHERE clause"
    ],
    correctOption: 2,
    explanation: "WHAT: Unintentional conversion of LEFT JOIN to INNER JOIN. WHY: Unmatched rows have `o.status = NULL`. The `WHERE o.status = 'shipped'` condition eliminates all NULL rows. HOW: Put condition in the `ON` clause.",
    basePoints: 110,
    tags: ["sql", "joins", "left_join", "where"]
  },
  {
    id: "sql-08",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 4,
    title: "UNION vs UNION ALL Performance and Deduplication",
    description: "UNION between two large disjoint datasets is running slowly due to unnecessary sorting/deduplication.",
    code: `SELECT id, name FROM active_users \nUNION \nSELECT id, name FROM archived_users;`,
    options: [
      "Convert the query into an INNER JOIN between active_users and archived_users tables",
      "Attach explicit DISTINCT keywords to each individual SELECT statement in the query",
      "Limit the combined output by adding a LIMIT 1000 clause at the end of the second query",
      "Use UNION ALL to skip the expensive deduplication sort when datasets are disjoint"
    ],
    correctOption: 3,
    explanation: "WHAT: Unnecessary distinct sort overhead. WHY: `UNION` performs an expensive sort-distinct operation across all records. `UNION ALL` concatenates datasets directly without deduplication overhead. HOW: Use `UNION ALL`.",
    basePoints: 110,
    tags: ["sql", "union", "union_all", "performance"]
  },
  {
    id: "sql-09",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 5,
    title: "Correlated Subquery in SELECT Clause (N+1 Query in SQL)",
    description: "Query calculating order count per user takes minutes because of scalar subquery per row.",
    code: `SELECT u.id, u.name, \n  (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count \nFROM users u;`,
    options: [
      "Rewrite as set-based query: FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name",
      "Replace the inner COUNT(*) function with SUM(1) to avoid scanning matching order rows",
      "Create a non-clustered index on users(name) to accelerate outer query projection scans",
      "Apply SELECT DISTINCT u.id to collapse duplicate user records before executing subqueries"
    ],
    correctOption: 0,
    explanation: "WHAT: Scalar correlated subquery bottleneck. WHY: A subquery in the SELECT list executes once for every single row in `users` (correlated loop). HOW: Rewrite as a set-based `LEFT JOIN ... GROUP BY`.",
    basePoints: 125,
    tags: ["sql", "subqueries", "joins", "optimization"]
  },
  {
    id: "sql-10",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 5,
    title: "Floating Point Arithmetic in Currency Calculations",
    description: "Financial total has slight rounding discrepancies (e.g., $100.00000000000003).",
    code: `CREATE TABLE accounts (\n  id INT PRIMARY KEY,\n  balance REAL -- Bug: floating point\n);`,
    options: [
      "Expand the column precision specification from REAL to double-precision FLOAT(53)",
      "Use fixed-point DECIMAL(12, 2) or NUMERIC(12, 2) to store exact monetary values",
      "Define balance using DOUBLE PRECISION to eliminate binary floating point imprecision",
      "Store account balance values as VARCHAR strings and perform arithmetic via casting"
    ],
    correctOption: 1,
    explanation: "WHAT: Floating-point precision error in financial data. WHY: Binary floating-point types (`REAL`, `FLOAT`, `DOUBLE`) cannot represent base-10 decimals exactly. HOW: Use fixed-point `DECIMAL(precision, scale)`.",
    basePoints: 125,
    tags: ["sql", "datatypes", "decimal", "precision"]
  },
  {
    id: "sql-11",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 5,
    title: "BETWEEN with Timestamps Dropping End Date",
    description: "BETWEEN '2026-01-01' AND '2026-01-31' misses transactions on January 31st afternoon.",
    code: `SELECT * FROM transactions \nWHERE created_at BETWEEN '2026-01-01' AND '2026-01-31';`,
    options: [
      "Set boundary string to '2026-01-31 23:59:59.999' which still risks millisecond precision truncations",
      "Replace BETWEEN with exact list membership test: WHERE created_at IN ('2026-01-01', '2026-01-31')",
      "Use half-open range: WHERE created_at >= '2026-01-01' AND created_at < '2026-02-01'",
      "Cast created_at column values to integer timestamp format before evaluating date ranges"
    ],
    correctOption: 2,
    explanation: "WHAT: Timestamp midnight boundary truncation. WHY: `'2026-01-31'` evaluates as `'2026-01-31 00:00:00'`, missing any transaction that happened later that day. HOW: Use `>= '2026-01-01' AND < '2026-02-01'`.",
    basePoints: 125,
    tags: ["sql", "datetime", "timestamps", "between"]
  },
  {
    id: "sql-12",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 5,
    title: "Implicit Type Conversion Disabling B-Tree Index",
    description: "Query on indexed VARCHAR column runs full table scan because search term is passed as integer.",
    code: `SELECT * FROM customers WHERE phone_number = 1234567890; -- phone_number is VARCHAR`,
    options: [
      "Create a secondary expression index on phone_number with explicit CAST to integer",
      "Limit the projection list to primary key only: SELECT id FROM customers WHERE phone_number = 1234567890",
      "Use wildcard matching: SELECT * FROM customers WHERE phone_number LIKE '%1234567890%'",
      "Pass string literal: phone_number = '1234567890' so the database utilizes the index"
    ],
    correctOption: 3,
    explanation: "WHAT: Index invalidation via implicit type conversion. WHY: When comparing a string column to an integer literal, SQL converts the column values to numbers (`CAST(phone_number AS INT)`), preventing index usage. HOW: Match datatype `'1234567890'`.",
    basePoints: 125,
    tags: ["sql", "indexing", "types", "performance"]
  },
  {
    id: "sql-13",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 6,
    title: "Window Function Missing ORDER BY in Running Total",
    description: "SUM(amount) OVER (PARTITION BY user_id) returns grand total for all rows instead of cumulative running sum.",
    code: `SELECT user_id, order_date, amount, \n  SUM(amount) OVER (PARTITION BY user_id) AS running_total \nFROM orders;`,
    options: [
      "Include ORDER BY in OVER(): SUM(amount) OVER (PARTITION BY user_id ORDER BY order_date)",
      "Replace the SUM aggregate function with cumulative AVG(amount) across the window frame",
      "Attach a standard GROUP BY user_id clause to group order records before windowing",
      "Remove the PARTITION BY clause from the window specification to enable cumulative sums"
    ],
    correctOption: 0,
    explanation: "WHAT: Missing frame ordering in running total. WHY: Without `ORDER BY` inside `OVER()`, the default window frame is the entire partition `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`. HOW: Add `ORDER BY order_date`.",
    basePoints: 140,
    tags: ["sql", "window_functions", "running_total"]
  },
  {
    id: "sql-14",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 6,
    title: "ROW_NUMBER() vs RANK() vs DENSE_RANK()",
    description: "Query to find top 3 highest salaries skips 2nd rank when there is a tie for 1st place.",
    code: `WITH ranked AS (\n  SELECT name, salary, RANK() OVER (ORDER BY salary DESC) as rnk FROM employees\n)\nSELECT * FROM ranked WHERE rnk = 2; -- Returns 0 rows if two people tie for rank 1!`,
    options: [
      "Replace RANK() with ROW_NUMBER() OVER (ORDER BY salary DESC) to assign arbitrary sequence numbers",
      "Use DENSE_RANK() OVER (ORDER BY salary DESC) to avoid skipping consecutive rank numbers on ties",
      "Modify the outer filter predicate from exact match rnk = 2 to range condition rnk <= 2",
      "Partition the window frame by salary: RANK() OVER (PARTITION BY salary ORDER BY salary DESC)"
    ],
    correctOption: 1,
    explanation: "WHAT: Gap in rank sequence with `RANK()`. WHY: If two employees tie for salary at rank 1, `RANK()` assigns `1, 1, 3` (skipping 2). `DENSE_RANK()` assigns `1, 1, 2`. HOW: Use `DENSE_RANK()`.",
    basePoints: 140,
    tags: ["sql", "window_functions", "ranking", "dense_rank"]
  },
  {
    id: "sql-15",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 6,
    title: "Self JOIN Multiplying Rows on Non-Unique Key",
    description: "Joining a table to itself on status duplicates rows exponentially (Cartesian explosion).",
    code: `SELECT a.id, b.id \nFROM orders a \nJOIN orders b ON a.status = b.status;`,
    options: [
      "Convert the join into CROSS JOIN orders b and filter status equality in WHERE clause",
      "Attach an ORDER BY a.id clause to limit duplicated row output generation in database",
      "Join on unique primary or foreign key relationships rather than low-cardinality status",
      "Remove the ON join predicate and allow the database query engine to infer join keys"
    ],
    correctOption: 2,
    explanation: "WHAT: Cartesian product explosion on non-key join. WHY: If 1,000 orders have status 'pending', joining on status yields $1,000 \\times 1,000 = 1,000,000$ rows. HOW: Join on primary/foreign keys.",
    basePoints: 140,
    tags: ["sql", "joins", "cartesian_product", "cardinality"]
  },
  {
    id: "sql-16",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 6,
    title: "DELETE without WHERE Clause",
    description: "Executing DELETE FROM logs wipes out the entire logs table.",
    code: `DELETE FROM logs; -- Accidentally deletes all rows`,
    options: [
      "DELETE without a WHERE filter only purges the first 100 uncommitted table rows in SQL",
      "Replace the DELETE command with DROP TABLE logs to perform safe row-level removals",
      "Append a LIMIT 1 clause to ensure the delete operation safely removes single records",
      "Specify an explicit WHERE filter or use TRUNCATE when intentionally emptying the table"
    ],
    correctOption: 3,
    explanation: "WHAT: Unconditional table purge. WHY: A `DELETE FROM table;` statement with no `WHERE` clause deletes every record in the table. HOW: Specify `WHERE created_at < NOW() - INTERVAL '30 days'`.",
    basePoints: 140,
    tags: ["sql", "delete", "where", "safety"]
  },
  {
    id: "sql-17",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 7,
    title: "String Concatenation with NULL in Standard SQL",
    description: "Concatenating first_name and middle_name yields NULL when middle_name is NULL.",
    code: `SELECT first_name || ' ' || middle_name || ' ' || last_name AS full_name \nFROM users;`,
    options: [
      "Wrap middle_name with COALESCE(middle_name, '') or use CONCAT_WS(' ', first_name, ...)",
      "Replace standard SQL pipe operators || with addition plus operators for string joining",
      "Wrap the middle_name column with proprietary ISNULL(middle_name) function calls",
      "Configure database column constraints so middle_name columns reject NULL values"
    ],
    correctOption: 0,
    explanation: "WHAT: NULL propagation in concatenation. WHY: In SQL standard, `'Hello' || NULL` evaluates to `NULL`. If any operand is NULL, the entire result becomes NULL. HOW: Use `COALESCE(middle_name, '')` or `CONCAT_WS`.",
    basePoints: 160,
    tags: ["sql", "strings", "null", "coalesce"]
  },
  {
    id: "sql-18",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 7,
    title: "Transaction Isolation Phantom Read in REPEATABLE READ",
    description: "Transaction reads count of rows, another transaction inserts a row and commits, re-reading count yields unexpected row.",
    code: `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n-- Transaction 1 checks for active subscription count, but range locks are only held in SERIALIZABLE`,
    options: [
      "Downgrade transaction isolation level to READ UNCOMMITTED to eliminate range lock waits",
      "Use SERIALIZABLE isolation level to hold predicate range locks and prevent phantom reads",
      "Standard REPEATABLE READ already provides complete isolation against concurrent inserts",
      "Attach table-level NOLOCK query hints across all SELECT statements inside Transaction 1"
    ],
    correctOption: 1,
    explanation: "WHAT: Phantom read anomaly. WHY: In ANSI SQL standard, `REPEATABLE READ` prevents non-repeatable reads on existing rows, but allows phantom row insertions in range queries unless `SERIALIZABLE` is used. HOW: Use `SERIALIZABLE`.",
    basePoints: 160,
    tags: ["sql", "transactions", "isolation_levels", "phantom_read"]
  },
  {
    id: "sql-19",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 7,
    title: "Leading Wildcard in LIKE Query Disabling B-Tree Index",
    description: "Query WHERE username LIKE '%john' performs full table scan on 10M rows.",
    code: `SELECT * FROM users WHERE username LIKE '%john';`,
    options: [
      "Add a standard B-Tree index on username column to accelerate leading wildcard queries",
      "Replace LIKE operator with equality operator: SELECT * FROM users WHERE username = '%john'",
      "Leading wildcards bypass B-Tree index; use prefix 'john%' or trigram/GIN full-text index",
      "Substitute LIKE with REGEXP pattern matching to force database query index utilization"
    ],
    correctOption: 2,
    explanation: "WHAT: Unindexable leading wildcard. WHY: Standard B-Tree indices are ordered from the beginning of the string. A leading `%` prevents binary search traversal. HOW: Use prefix `john%` or trigram/fulltext indexing.",
    basePoints: 160,
    tags: ["sql", "indexing", "like", "performance"]
  },
  {
    id: "sql-20",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 7,
    title: "Recursive CTE Infinite Loop Termination Condition",
    description: "Recursive CTE to traverse organizational hierarchy runs until recursion limit error.",
    code: `WITH RECURSIVE org AS (\n  SELECT emp_id, manager_id FROM employees WHERE emp_id = 1\n  UNION ALL\n  SELECT e.emp_id, e.manager_id FROM employees e JOIN org o ON e.manager_id = o.emp_id\n) -- Hangs if data contains cyclic manager loop!\nSELECT * FROM org;`,
    options: [
      "Replacing UNION ALL with UNION automatically detects and terminates cyclic CTE loops",
      "Remove RECURSIVE keyword from CTE definition to prevent child row expansion scans",
      "Append a LIMIT 1000 clause directly onto the inner recursive query term specification",
      "Track visited node path (e.g. path array) to detect cycles: WHERE NOT e.emp_id = ANY(path)"
    ],
    correctOption: 3,
    explanation: "WHAT: Cyclic graph recursion in CTE. WHY: If employee A manages B and B manages A, `UNION ALL` recurses infinitely until max recursion depth is exceeded. HOW: Track visited nodes array `path || e.emp_id` and filter cycles.",
    basePoints: 160,
    tags: ["sql", "cte", "recursion", "cycles"]
  },
  {
    id: "sql-21",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 8,
    title: "Composite Index Column Order Mismatch",
    description: "Index on (status, created_at) is not used when querying WHERE created_at > '2026-01-01' alone.",
    code: `CREATE INDEX idx_orders ON orders (status, created_at);\n-- Query:\nSELECT * FROM orders WHERE created_at > '2026-01-01'; -- Slow full table scan!`,
    options: [
      "Composite index requires leftmost prefix; queries on created_at alone need (created_at) index",
      "B-Tree composite indices support arbitrary column subsets regardless of declared order",
      "Modify the range comparison operator from greater-than > to exact equality operator =",
      "Add explicit FORCE INDEX hint to force query optimizer to use idx_orders for created_at"
    ],
    correctOption: 0,
    explanation: "WHAT: Leftmost prefix rule violation. WHY: A composite index on `(A, B)` is sorted by A first, then B. Searching on B alone cannot utilize the tree ordering. HOW: Create index on `(created_at)` or query with `status`.",
    basePoints: 175,
    tags: ["sql", "composite_index", "leftmost_prefix", "performance"]
  },
  {
    id: "sql-22",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 8,
    title: "OFFSET Pagination Performance Degradation on Deep Pages",
    description: "SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 1000000 takes 15 seconds.",
    code: `SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 1000000;`,
    options: [
      "Increase database buffer pool memory to cache the 1,000,000 skipped table rows in RAM",
      "Use keyset / cursor pagination: WHERE id > last_seen_id ORDER BY id LIMIT 20",
      "Replace standard OFFSET keyword with database SKIP clause to bypass physical page reads",
      "Remove ORDER BY id sorting criteria to allow database engine to sample rows directly"
    ],
    correctOption: 1,
    explanation: "WHAT: Offset pagination scanning overhead. WHY: `OFFSET 1000000` requires the database to read, sort, and discard 1,000,000 rows before returning 20. HOW: Use keyset pagination `WHERE id > :last_id LIMIT 20`.",
    basePoints: 175,
    tags: ["sql", "pagination", "offset", "keyset"]
  },
  {
    id: "sql-23",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 8,
    title: "Deadlock from Inconsistent Table Lock Ordering",
    description: "Transaction A updates User then Account; Transaction B updates Account then User simultaneously.",
    code: `-- Tx 1:\nUPDATE users SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET total = total - 100 WHERE id = 5;\n\n-- Tx 2:\nUPDATE accounts SET total = total + 100 WHERE id = 5;\nUPDATE users SET balance = balance + 100 WHERE id = 1;`,
    options: [
      "Extend the transaction deadlock timeout parameter to allow competing locks to resolve",
      "Downgrade both transaction isolation levels to READ UNCOMMITTED to skip write locks",
      "Enforce consistent lock acquisition order across transactions (always lock users before accounts)",
      "Split each UPDATE statement into independent autonomous transactions without shared state"
    ],
    correctOption: 2,
    explanation: "WHAT: Cross-resource deadlock. WHY: Tx 1 holds lock on User 1 and waits for Account 5; Tx 2 holds Account 5 and waits for User 1. HOW: Enforce strict, consistent acquisition order across all transactions.",
    basePoints: 175,
    tags: ["sql", "deadlock", "concurrency", "locking"]
  },
  {
    id: "sql-24",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 8,
    title: "CASE Expression Short-Circuiting Assumptions in Aggregates",
    description: "Dividing by zero inside CASE statement in some database engines.",
    code: `SELECT \n  SUM(CASE WHEN total_orders > 0 THEN total_revenue / total_orders ELSE 0 END) \nFROM accounts;`,
    options: [
      "All SQL query planners strictly evaluate CASE branches before projection operations",
      "Change the fallback branch expression from ELSE 0 to explicit ELSE NULL assignment",
      "Append a global WHERE total_orders > 0 filter clause to exclude non-positive records",
      "Guard against zero division using NULLIF: total_revenue / NULLIF(total_orders, 0)"
    ],
    correctOption: 3,
    explanation: "WHAT: SQL optimizer expression reordering vs short-circuiting. WHY: Some SQL query planners (e.g. SQL Server / Oracle) may evaluate expressions in projections before filtering. HOW: Use `NULLIF(total_orders, 0)` which returns NULL on 0, preventing div-by-zero.",
    basePoints: 175,
    tags: ["sql", "case", "nullif", "division_by_zero"]
  },
  {
    id: "sql-25",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 9,
    title: "Lock Escalation during Bulk UPDATE",
    description: "Updating 500,000 rows in single statement acquires exclusive table lock, blocking entire application.",
    code: `UPDATE orders SET status = 'archived' WHERE created_at < '2020-01-01';`,
    options: [
      "Batch the update in smaller chunks (e.g. 5,000 rows per batch) with commits in between",
      "Disable row-level locking parameters on the database server before executing updates",
      "Convert the orders table to an unlogged temporary table to bypass lock escalation",
      "Execute the query using SELECT FOR UPDATE lock hints to retain individual row locks"
    ],
    correctOption: 0,
    explanation: "WHAT: Lock escalation & transaction log exhaustion. WHY: Modifying huge numbers of rows exceeds the row-lock memory threshold, escalating to an exclusive table lock that freezes concurrent queries. HOW: Batch updates in chunks of 1k-10k.",
    basePoints: 190,
    tags: ["sql", "locking", "batching", "lock_escalation"]
  },
  {
    id: "sql-26",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 9,
    title: "UPSERT Race Condition (INSERT ... ON CONFLICT DO UPDATE)",
    description: "Concurrent transactions running SELECT then INSERT cause duplicate key errors under concurrency.",
    code: `-- Thread A and B both run:\nIF NOT EXISTS (SELECT 1 FROM user_stats WHERE user_id = 42) THEN\n    INSERT INTO user_stats (user_id, views) VALUES (42, 1);\nELSE\n    UPDATE user_stats SET views = views + 1 WHERE user_id = 42;\nEND IF;`,
    options: [
      "Acquire row locks by adding SELECT FOR UPDATE to the IF NOT EXISTS existence query",
      "Use atomic UPSERT: INSERT INTO ... VALUES (...) ON CONFLICT (user_id) DO UPDATE SET views = ...",
      "Handle duplicate key exceptions in application code by catching and retrying writes",
      "Remove the primary key unique constraint on user_id to permit duplicate insert rows"
    ],
    correctOption: 1,
    explanation: "WHAT: Check-then-act race condition in database writes. WHY: Both threads see the row doesn't exist, and both attempt to INSERT, triggering unique constraint violation. HOW: Use atomic `ON CONFLICT DO UPDATE` / `MERGE`.",
    basePoints: 190,
    tags: ["sql", "upsert", "race_condition", "concurrency"]
  },
  {
    id: "sql-27",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 9,
    title: "SQL Injection via Dynamic String Interpolation",
    description: "Concatenating user input directly into SQL query allows authentication bypass.",
    code: `String query = "SELECT * FROM users WHERE user = '" + username + "' AND pass = '" + password + "'";`,
    options: [
      "Sanitize input strings by stripping single quotes: username.replace(\"'\", \"\")",
      "Encode username and password strings into base64 format before query interpolation",
      "Use parameterized queries / PreparedStatements with placeholder ? or :named_param",
      "Execute dynamic SQL strings inside stored procedures using dynamic exec statements"
    ],
    correctOption: 2,
    explanation: "WHAT: SQL Injection (SQLi) vulnerability. WHY: Entering `' OR '1'='1` breaks query structure and bypasses password check. HOW: Use parameterized prepared statements (`PreparedStatement.setString`).",
    basePoints: 190,
    tags: ["sql", "security", "sqli", "prepared_statement"]
  },
  {
    id: "sql-28",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 10,
    title: "Foreign Key Cascades with Massive Graph Dependency",
    description: "Deleting one user record cascades deletes across 15 related tables causing 30-second lock freeze and replication lag.",
    code: `CREATE TABLE user_posts (\n  id INT PRIMARY KEY,\n  user_id INT REFERENCES users(id) ON DELETE CASCADE\n); -- Replicated across 15 dependent child and grandchild tables!`,
    options: [
      "Disable global foreign key consistency validation on primary production databases",
      "Change constraint to ON DELETE RESTRICT and suppress cascading foreign key errors",
      "Drop all foreign key indices across child tables to speed up cascading delete scans",
      "Avoid deep ON DELETE CASCADE on busy systems; use soft deletes or batched child pruning"
    ],
    correctOption: 3,
    explanation: "WHAT: Cascade tree locking storm. WHY: `ON DELETE CASCADE` traverses the entire foreign key hierarchy synchronously within a single transaction, locking parent and child tables and saturating replication logs. HOW: Soft delete (`deleted_at`) or batch child deletions.",
    basePoints: 200,
    tags: ["sql", "foreign_keys", "cascade", "database_design"]
  },
  {
    id: "sql-29",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 10,
    title: "Window Frame Exclusions and Peer Groups in RANGE vs ROWS",
    description: "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW includes future peer rows with duplicate sort keys.",
    code: `SELECT emp_id, salary, \n  SUM(salary) OVER (ORDER BY salary RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_sum \nFROM employees;`,
    options: [
      "Use ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW to accumulate physical rows individually",
      "RANGE window frame specification is deprecated in standard SQL across all modern database engines",
      "Add PARTITION BY emp_id to window specification to isolate duplicate salary values per employee",
      "Modify window frame boundary definition from CURRENT ROW to explicit 1 FOLLOWING specification"
    ],
    correctOption: 0,
    explanation: "WHAT: `RANGE` peer grouping anomaly in window frames. WHY: `RANGE` operates on value ranges. If three employees earn $5,000, `RANGE ... CURRENT ROW` includes ALL three employees at once on the first duplicate row. `ROWS` operates on physical rows. HOW: Use `ROWS`.",
    basePoints: 200,
    tags: ["sql", "window_functions", "range_vs_rows"]
  },
  {
    id: "sql-30",
    mode: "sql_bug",
    language: "SQL",
    difficulty: 10,
    title: "PostgreSQL MVCC Table Bloat from Missing VACUUM on Hot Update Tables",
    description: "Table with 100k rows takes up 50GB on disk and queries take seconds because dead tuples are never reclaimed.",
    code: `-- Frequent UPDATE table with autovacuum disabled or long-running transactions blocking cleanup`,
    options: [
      "Execute DROP TABLE on the bloated relation and restore schema from overnight backups",
      "Tune autovacuum for hot tables, terminate stale transactions, and run VACUUM / pg_repack",
      "Increase session work_mem configuration to 10GB to hold dead table tuples in memory",
      "Build a clustered index across all table columns to force automatic tuple compaction"
    ],
    correctOption: 1,
    explanation: "WHAT: MVCC dead tuple bloat. WHY: In PostgreSQL MVCC, `UPDATE` writes a new row version and marks the old row dead. If long-running transactions hold old snapshot horizons, `VACUUM` cannot reclaim dead tuples, inflating table size. HOW: Tune autovacuum and close idle transactions.",
    basePoints: 200,
    tags: ["sql", "postgres", "mvcc", "vacuum", "performance"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SQL_BUG_BANK };
}
