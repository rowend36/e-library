
-- Datasets Table
CREATE TABLE datasets (
    dataset_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    pdf_url TEXT,
    tsv tsvector,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Full-Text Search for Datasets
-- ALTER TABLE datasets ADD COLUMN tsv tsvector;
UPDATE datasets SET tsv = to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(content, ''));
CREATE TRIGGER tsvectorupdate_datasets BEFORE INSERT OR UPDATE ON datasets FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(tsv, 'pg_catalog.english', title, description, content);

-- GIN Index on Datasets' Tsvector
CREATE INDEX datasets_tsv_idx ON datasets USING gin(tsv);
