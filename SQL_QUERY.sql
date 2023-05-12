-- If each user ORDER total > 1000

SELECT
  users.name,
  users.email,
  SUM((orders.quantity * product.price)) as total_amount
FROM users
JOIN orders ON users.id = orders.user_id 
JOIN product ON product.id = orders.product_id
WHERE product.category = 'Electronics' and (orders.quantity * product.price) > 1000
GROUP BY
  users.id
HAVING COUNT( DISTINCT orders.id ) >= 3
ORDER BY total_amount DESC;


-- If the sum of all the user order > 1000

SELECT
  users.name,
  users.email,
  SUM((orders.quantity * product.price)) as total_amount
FROM users
JOIN orders ON users.id = orders.user_id 
JOIN product ON product.id = orders.product_id
WHERE product.category = 'Electronics'
GROUP BY
  users.id
HAVING COUNT( DISTINCT orders.id ) >= 3 AND total_amount > 1000 
ORDER BY total_amount DESC;