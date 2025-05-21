-- Players-List 
CREATE TABLE IF NOT EXISTS players
(
    id integer NOT NULL DEFAULT nextval('players_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT players_pkey PRIMARY KEY (id),
    CONSTRAINT players_name_key UNIQUE (name)
);

-- Statistic: Multiplayer (501 & 301)
CREATE TABLE IF NOT EXISTS game_stats(
    player_id integer NOT NULL,
    games_played integer DEFAULT 0,
    wins integer DEFAULT 0,
    losses integer DEFAULT 0,
    highest_checkout integer DEFAULT 0,
    highest_9dart_avg numeric DEFAULT 0,
    player_name text COLLATE pg_catalog."default",
    CONSTRAINT game_stats_pkey PRIMARY KEY (player_id),
    CONSTRAINT game_stats_player_id_fkey FOREIGN KEY (player_id)
        REFERENCES public.players (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Training: Around the clock singles
CREATE TABLE IF NOT EXISTS training_singles
(
    id integer NOT NULL DEFAULT nextval('training_singles_id_seq'::regclass),
    training_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    tries_target_1 integer,
    tries_target_2 integer,
    tries_target_3 integer,
    tries_target_4 integer,
    tries_target_5 integer,
    tries_target_6 integer,
    tries_target_7 integer,
    tries_target_8 integer,
    tries_target_9 integer,
    tries_target_10 integer,
    tries_target_11 integer,
    tries_target_12 integer,
    tries_target_13 integer,
    tries_target_14 integer,
    tries_target_15 integer,
    tries_target_16 integer,
    tries_target_17 integer,
    tries_target_18 integer,
    tries_target_19 integer,
    tries_target_20 integer,
    average_tries numeric,
    CONSTRAINT training_singles_pkey PRIMARY KEY (id)
);


-- Training: Around the clock doubles
CREATE TABLE IF NOT EXISTS training_doubles
(
    id integer NOT NULL DEFAULT nextval('training_doubles_id_seq'::regclass),
    training_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    tries_target_1 integer,
    tries_target_2 integer,
    tries_target_3 integer,
    tries_target_4 integer,
    tries_target_5 integer,
    tries_target_6 integer,
    tries_target_7 integer,
    tries_target_8 integer,
    tries_target_9 integer,
    tries_target_10 integer,
    tries_target_11 integer,
    tries_target_12 integer,
    tries_target_13 integer,
    tries_target_14 integer,
    tries_target_15 integer,
    tries_target_16 integer,
    tries_target_17 integer,
    tries_target_18 integer,
    tries_target_19 integer,
    tries_target_20 integer,
    average_tries numeric,
    CONSTRAINT training_doubles_pkey PRIMARY KEY (id)
);

