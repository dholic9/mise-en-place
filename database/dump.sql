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
2	3
1	3
1	4
2	1
\.


--
-- Data for Name: Ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Ingredients" ("ingredientId", "ingredientName") FROM stdin;
1	english muffin
2	eggs
3	canadian bacon
4	vinager
5	butter
6	lime juice
7	heavy whipping cream
8	elbow macaroni
9	sharp chedder
10	parmesan cheese
11	milk
12	all-purpose flour
13	bread crumbs
14	paprika
15	whole milk
16	salt
17	pepper
18	oil
19	egg yolk
20	sugar
21	strawberries
22	powdered sugar
\.


--
-- Data for Name: Instructions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Instructions" ("instructionId", "recipeId", "instructionDetail", "instructionOrder", "createdAt") FROM stdin;
1	1	Melt the butter in a small saucepan. In a separate small bowl, beat the egg yolks. Mix in lime juice, whipping cream, and salt and pepper.	1	2019-01-21 08:00:00+00
2	1	Add a small spoonful of the hot melted butter to the egg mixture and stir well. Repeat this process adding a spoonful at a time of hot butter to the egg mixture.( Adding the butter slowly, a spoonful at a time, will temper the eggs and ensure they don't curdle).	2	2019-01-21 08:00:00+00
3	1	Once the butter has been incorporated, pour the mixture back into the saucepan. Cook on low heat, stirring constantly, for just 20-30 seconds. Remove from heat and set aside.	3	2019-01-21 08:00:00+00
4	1	Fill a medium size pot with about 3 inches of water. Bring the water to a boil and then reduce heat until it reaches a simmer. You should see small bubbles coming to the surface but not rolling.	4	2019-01-21 08:00:00+00
5	1	Add a little splash of vinegar to the water (this is optional, but it helps the egg white to stay together once it is in the water).	5	2019-01-21 08:00:00+00
6	1	Crack one egg into a small cup (I use a measuring cup).  Lower the egg into the simmer water, gently easing it out of the cup.	6	2019-01-21 08:00:00+00
7	1	Cook the egg in simmering water for 3-5 minutes, depending on how soft you want your egg yolk. Remove the poached egg with a slotted spoon.	7	2019-01-21 08:00:00+00
8	1	**It is not abnormal for a white foam to form on top of the water when poaching an egg. You can simple skim the foam off of the water with a spoon.	8	2019-01-21 08:00:00+00
9	1	While the egg is cooking, place the slices of Canadian bacon in a large pan and cook on medium-high heat for about 1 minute on each side.	9	2019-01-21 08:00:00+00
10	2	preheat obven to 350 degrees F	1	2019-01-21 08:00:00+00
11	2	Cook macaroni according to the package directions. Drain.	2	2019-01-21 08:00:00+00
12	2	In a saucepan, melt butter or margarine over medium heat. Stir in enough flour to make a roux	3	2019-01-21 08:00:00+00
13	2	Add milk to roux slowly, stirring constantly.	4	2019-01-21 08:00:00+00
14	2	Stir in cheeses, and cook over low heat until cheese is melted and the sauce is a little thick	5	2019-01-21 08:00:00+00
15	2	Put macaroni in large casserole dish, and pour sauce over macaroni. Stir well.	6	2019-01-21 08:00:00+00
16	2	Melt butter or margarine in a skillet over medium heat	7	2019-01-21 08:00:00+00
17	2	Add breadcrumbs and brown	8	2019-01-21 08:00:00+00
18	2	Spread over the macaroni and cheese to cover. Sprinkle with a little paprika.	9	2019-01-21 08:00:00+00
19	2	bake for 30 minutes	10	2019-01-21 08:00:00+00
20	3	crack eggs in a medium bowl with milk, salt, and pepper	1	2019-01-21 08:00:00+00
21	3	beat eggs with fork or wisk for about 1 minute	2	2019-01-21 08:00:00+00
22	3	add oil to non-stick skillet over medium heat	3	2019-01-21 08:00:00+00
23	3	pour scrammbled eggs into hot skillet	4	2019-01-21 08:00:00+00
24	3	begin pulling the cooked outer edges in towards the center of the eggs. Uncooked eggs will flood the area you just pulled back	5	2019-01-21 08:00:00+00
25	3	Move the spatula around the edge of the skillet, pulling the cooked edges towards the center and re-flooding repeatedly. Cooked scrambled eggs will gather in the center of the skillet.	6	2019-01-21 08:00:00+00
26	3	At a certain point, the uncooked eggs will no longer flood and the scramble will all collect in the center of the skillet, but it will still be slightly runny in texture. Begin breaking up the scramble; quickly turn undercooked areas and keep the scramble moving to make sure that all surfaces cook evenly. Never leave a surface in contact too long with the skillet or it will become overcooked.	7	2019-01-21 08:00:00+00
27	3	Turn off the heat when the eggs are 90% cooked and serve immediately	8	2019-01-21 08:00:00+00
28	4	In a large mixing bowl, create a well with flour then add eggs, slowly whisking them into flour. Add sugar and salt and stir until combined. Gradually add the milk, whisking to combine. Let batter stand at room temperature until bubbly on top, 15 to 20 minutes.	1	2019-01-21 08:00:00+00
29	4	In a small skillet over medium heat, melt butter. About 1/4 cup at a time, drop batter evenly onto pan, swirling it to evenly coat.	2	2019-01-21 08:00:00+00
30	4	Cook 2 minutes, then flip and cook 1 minute more; repeat with remaining batter. Serve crêpes warm with fresh fruit and powdered sugar.	3	2019-01-21 08:00:00+00
\.


--
-- Data for Name: MealPlan; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MealPlan" ("userId", "recipeId") FROM stdin;
1	4
2	1
\.


--
-- Data for Name: RecipeIngredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RecipeIngredients" ("ingredientId", "recipeId", quantity, unit, "createdAt") FROM stdin;
1	1	2	-	2020-01-20 00:00:00+00
3	1	4	slices	2020-01-22 00:00:00+00
4	1	1	tsp	2020-01-23 00:00:00+00
5	1	4	tbsp	2020-01-24 00:00:00+00
6	1	4	-	2020-01-25 00:00:00+00
7	1	2	tbsp	2020-01-26 00:00:00+00
9	2	8	oz	2020-01-28 00:00:00+00
10	2	2	cups	2020-01-29 00:00:00+00
11	2	0.5	cups	2020-07-17 00:00:00+00
12	2	3	cups	2020-07-18 00:00:00+00
13	2	0.25	cups	2020-07-19 00:00:00+00
14	2	2.5	tbsp	2020-07-20 00:00:00+00
15	2	2	tbsp	2020-07-21 00:00:00+00
16	2	0.5	cups	2020-07-22 00:00:00+00
17	2	1	tsp	2020-07-23 00:00:00+00
18	3	4	-	2020-07-24 00:00:00+00
19	3	1	tbsp	2020-07-25 00:00:00+00
8	2	1	tbsp	2020-01-27 00:00:00+00
20	4	1	pinch	2020-07-26 00:00:00+00
21	4	1	pinch	2020-07-27 00:00:00+00
22	4	1	tbsp	2020-07-28 00:00:00+00
12	4	1	cup	2020-01-22 01:36:51.373377+00
2	1	4	-	2020-01-21 00:00:00+00
2	4	2	-	2020-01-22 01:37:27.042495+00
16	4	0.25	tbsp	2020-01-22 01:39:23.173669+00
11	4	1.5	cups	2020-01-22 01:39:46.494503+00
5	4	1	tbsp	2020-01-22 01:40:23.807494+00
\.


--
-- Data for Name: Recipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Recipes" ("recipeId", "recipeName", category, "numberOfServings", "createdBy", image, "createdAt") FROM stdin;
3	Scrambled Eggs	Breakfast	2	Patrick	test	2020-01-23 08:00:00+00
4	Crepes	Breakfast	4	Patrick	/images/crepes.jpg	2020-01-22 00:34:02.745628+00
1	Eggs Benedict	Breakfast	4	Patrick	/images/eggsBenedict.jpg	2020-01-21 08:00:00+00
2	Mac and Cheese	Dinner	4	Patrick	/images/macAndCheese.jpg	2020-01-22 08:00:00+00
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" ("userId", name, "userName", email, password, image, "createdAt") FROM stdin;
1	Patrick	Star	thisIsPatrick@gmail.com	star	/images/patrickstar.jpg	2020-01-22 00:36:43.874184+00
2	Spongebob	Sponge	thisIsSpongebob@gmail.com	sponge	/images/spongebob.jpg	2020-01-22 00:37:43.707564+00
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

SELECT pg_catalog.setval('public."Users_userId_seq"', 5, true);


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

