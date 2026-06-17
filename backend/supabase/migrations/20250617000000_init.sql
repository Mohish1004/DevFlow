CREATE TABLE users (
    id                BIGSERIAL    PRIMARY KEY,
    email             VARCHAR(255) NOT NULL,
    display_name      VARCHAR(255) NOT NULL,
    password          VARCHAR(255),
    account_type      VARCHAR(31)  NOT NULL,
    team_code         VARCHAR(255),
    team_name         VARCHAR(255),
    organization_name VARCHAR(255),
    join_link         VARCHAR(255),
    mode              VARCHAR(255) DEFAULT 'db',
    CONSTRAINT uq_users_email UNIQUE (email)
);

CREATE TABLE projects (
    id      BIGSERIAL    PRIMARY KEY,
    name    VARCHAR(255),
    repo    VARCHAR(255),
    summary VARCHAR(2000)
);

CREATE TABLE tasks (
    db_id       BIGSERIAL    PRIMARY KEY,
    id          VARCHAR(255),
    title       VARCHAR(255),
    description VARCHAR(2000),
    assignee    VARCHAR(255),
    status      VARCHAR(31),
    priority    VARCHAR(31),
    github_link VARCHAR(255),
    deadline    VARCHAR(255),
    comments    INTEGER      NOT NULL DEFAULT 0,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP
);

CREATE TABLE task_checkpoints (
    db_id     BIGSERIAL    PRIMARY KEY,
    id        VARCHAR(255),
    title     VARCHAR(255),
    completed BOOLEAN      NOT NULL DEFAULT FALSE,
    task_id   BIGINT       REFERENCES tasks(db_id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    db_id         BIGSERIAL    PRIMARY KEY,
    id            VARCHAR(255),
    task_title    VARCHAR(255),
    message       VARCHAR(2000),
    reviewer      VARCHAR(255),
    submitted_by  VARCHAR(255),
    submitted_at  TIMESTAMP,
    github_link   VARCHAR(255),
    status        VARCHAR(31)
);

CREATE TABLE user_preferences (
    id              BIGSERIAL    PRIMARY KEY,
    theme_mode      VARCHAR(255),
    font_style      VARCHAR(255),
    accent_color    VARCHAR(255),
    border_glow     BOOLEAN      NOT NULL DEFAULT FALSE,
    card_color      VARCHAR(255),
    glass_intensity INTEGER      NOT NULL DEFAULT 0,
    graph_color     VARCHAR(255),
    text_color      VARCHAR(255),
    user_id         BIGINT       UNIQUE REFERENCES users(id) ON DELETE CASCADE
);
