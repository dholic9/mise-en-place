--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
ALTER TABLE ONLY public."Recipes" DROP CONSTRAINT "Recipes_pkey";
ALTER TABLE ONLY public."Instructions" DROP CONSTRAINT "Instructions_pkey";
ALTER TABLE ONLY public."Ingredients" DROP CONSTRAINT "Ingredients_pkey";
ALTER TABLE public."Users" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public."Recipes" ALTER COLUMN "recipeId" DROP DEFAULT;
ALTER TABLE public."Instructions" ALTER COLUMN "instructionId" DROP DEFAULT;
ALTER TABLE public."Ingredients" ALTER COLUMN "ingredientId" DROP DEFAULT;
DROP SEQUENCE public."Users_userId_seq";
DROP TABLE public."Users";
DROP SEQUENCE public."Recipes_recipeId_seq";
DROP TABLE public."Recipes";
DROP TABLE public."RecipeIngredients";
DROP TABLE public."MealPlan";
DROP SEQUENCE public."Instructions_instructionId_seq";
DROP TABLE public."Instructions";
DROP SEQUENCE public."Ingredients_ingredientId_seq";
DROP TABLE public."Ingredients";
DROP TABLE public."FavoriteRecipes";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: FavoriteRecipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FavoriteRecipes" (
    "userId" numeric NOT NULL,
    "recipeId" numeric NOT NULL
);


--
-- Name: Ingredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Ingredients" (
    "ingredientId" integer NOT NULL,
    "ingredientName" text NOT NULL
);


--
-- Name: Ingredients_ingredientId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Ingredients_ingredientId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Ingredients_ingredientId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Ingredients_ingredientId_seq" OWNED BY public."Ingredients"."ingredientId";


--
-- Name: Instructions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Instructions" (
    "instructionId" integer NOT NULL,
    "recipeId" numeric NOT NULL,
    "instructionDetail" text NOT NULL,
    "instructionOrder" numeric NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: Instructions_instructionId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Instructions_instructionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Instructions_instructionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Instructions_instructionId_seq" OWNED BY public."Instructions"."instructionId";


--
-- Name: MealPlan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MealPlan" (
    "userId" numeric NOT NULL,
    "recipeId" numeric NOT NULL
);


--
-- Name: RecipeIngredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RecipeIngredients" (
    "ingredientId" numeric NOT NULL,
    "recipeId" numeric NOT NULL,
    quantity numeric NOT NULL,
    unit text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: Recipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Recipes" (
    "recipeId" integer NOT NULL,
    "recipeName" text NOT NULL,
    category text NOT NULL,
    "mealPlan" boolean NOT NULL,
    "numberOfServings" numeric NOT NULL,
    "createdBy" text NOT NULL,
    image text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: Recipes_recipeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Recipes_recipeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Recipes_recipeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Recipes_recipeId_seq" OWNED BY public."Recipes"."recipeId";


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    "userId" integer NOT NULL,
    name text NOT NULL,
    "userName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    image text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: Users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Users_userId_seq" OWNED BY public."Users"."userId";


--
-- Name: Ingredients ingredientId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ingredients" ALTER COLUMN "ingredientId" SET DEFAULT nextval('public."Ingredients_ingredientId_seq"'::regclass);


--
-- Name: Instructions instructionId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Instructions" ALTER COLUMN "instructionId" SET DEFAULT nextval('public."Instructions_instructionId_seq"'::regclass);


--
-- Name: Recipes recipeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Recipes" ALTER COLUMN "recipeId" SET DEFAULT nextval('public."Recipes_recipeId_seq"'::regclass);


--
-- Name: Users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users" ALTER COLUMN "userId" SET DEFAULT nextval('public."Users_userId_seq"'::regclass);


--
-- Data for Name: FavoriteRecipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."FavoriteRecipes" ("userId", "recipeId") FROM stdin;
\.


--
-- Data for Name: Ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Ingredients" ("ingredientId", "ingredientName") FROM stdin;
1	salt
2	pepper
\.


--
-- Data for Name: Instructions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Instructions" ("instructionId", "recipeId", "instructionDetail", "instructionOrder", "createdAt") FROM stdin;
\.


--
-- Data for Name: MealPlan; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MealPlan" ("userId", "recipeId") FROM stdin;
\.


--
-- Data for Name: RecipeIngredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RecipeIngredients" ("ingredientId", "recipeId", quantity, unit, "createdAt") FROM stdin;
\.


--
-- Data for Name: Recipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Recipes" ("recipeId", "recipeName", category, "mealPlan", "numberOfServings", "createdBy", image, "createdAt") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" ("userId", name, "userName", email, password, image, "createdAt") FROM stdin;
4	Patrick	Star	ThisIsPatrick@gmail.com	star	/home/dev/lfz/recipe-manager/server/public/images	2020-01-21 19:54:49.655566+00
\.


--
-- Name: Ingredients_ingredientId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Ingredients_ingredientId_seq"', 2, true);


--
-- Name: Instructions_instructionId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Instructions_instructionId_seq"', 1, false);


--
-- Name: Recipes_recipeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Recipes_recipeId_seq"', 1, false);


--
-- Name: Users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_userId_seq"', 4, true);


--
-- Name: Ingredients Ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ingredients"
    ADD CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("ingredientId");


--
-- Name: Instructions Instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Instructions"
    ADD CONSTRAINT "Instructions_pkey" PRIMARY KEY ("instructionId");


--
-- Name: Recipes Recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Recipes"
    ADD CONSTRAINT "Recipes_pkey" PRIMARY KEY ("recipeId");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

