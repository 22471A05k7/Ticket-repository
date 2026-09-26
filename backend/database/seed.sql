USE support_ticket_db;

INSERT INTO users
(name, email, password_hash, role)
VALUES
(
    'John Customer',
    'customer@test.com',
    '$2b$10$examplehash',
    'CUSTOMER'
),
(
    'Jordan Lee',
    'agent@test.com',
    '$2b$10$examplehash',
    'AGENT'
);