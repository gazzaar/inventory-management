## DATABASE ERD

### Products

| COLUMN        | TYPE               |
| ------------- | ------------------ |
| product_ID    | NUMBER PRIMARY_KEY |
| product_name  | STRING             |
| price         | NUMBER             |
| quantity      | NUMBER             |
| product_image | BLOB               |
| category_id   | category_ID        |

### Categories

| COLUMN        | TYPE               |
| ------------- | ------------------ |
| category_ID   | NUMBER PRIMARY_KEY |
| category_name | STRING             |
| description   | STRING             |
