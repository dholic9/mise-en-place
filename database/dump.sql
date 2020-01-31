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
ALTER TABLE ONLY public."Ingredients" DROP CONSTRAINT "Ingredients_ingredientName_key";
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
    image text,
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
    image text,
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
1	4
2	1
1	1
1	5
11	5
11	4
1	2
19	6
19	5
18	3
18	4
18	6
19	2
19	8
19	9
19	10
20	12
\.


--
-- Data for Name: Ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Ingredients" ("ingredientId", "ingredientName") FROM stdin;
1	english muffin
2	eggs
3	canadian bacon
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
4	vinegar
23	baking powder
24	maple syrup
25	eggplant
26	tomatoes
27	squashes
28	yellow squashes
29	zucchinis
30	olive oil
31	garlic
32	onion
33	bell pepper
34	crushed tomatoes
35	fresh basil
36	parsely
37	thyme
38	potatoes
39	egg
41	chives
44	chile powder
45	basil
46	cumin
49	brussel sprouts
52	red grapes
54	scallion
55	honey
56	hazelnuts
57	Rice noodles
58	Chicken breasts
59	Shrimp
60	Vegetable oil
61	Brown sugar
62	Soy sauce
63	Rice vinegar
64	Lime juice
65	Fish sauce
66	Vegetables
68	Peanuts
69	salt and pepper
70	fettuccine
72	chicken breast
73	unsalted butter
74	heavy cream
75	freshly grated nutmeg
76	freshly grated Parmigiano-Reggiano 
77	cashews
78	water
79	cashew milk
81	coconut oil
82	cocoa butter
83	flaky salt
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
31	5	In a bowl, add the flour and baking powder together, stirring to combine.	1	2020-01-24 23:41:40.651084+00
32	5	In a separate bowl, add the butter, milk, and egg yolks, stirring to combine.	2	2020-01-24 23:42:12.391351+00
33	5	In a third bowl, use a hand mixer to beat the egg whites until soft peaks form.	3	2020-01-24 23:42:44.025916+00
34	5	Gently combine the bowl of flour with the butter and milk mixture, stirring until combined. Gently fold in the egg whites.	4	2020-01-24 23:43:02.055582+00
35	5	Pour a large scoop of pancake batter into an 8-inch (20 cm) nonstick pan on low heat. Place the lid on top, and cook for 3 to 5 minutes, or until a toothpick comes out clean. Repeat with remaining batter. Serve with maple syrup.	5	2020-01-24 23:43:52.24922+00
36	6	Preheat the oven for 375˚F (190˚C).	1	2020-01-27 23:36:06.545553+00
37	6	Slice the eggplant, tomatoes, squash, and zucchini into approximately ¹⁄₁₆-inch (1-mm) rounds, then set aside.	2	2020-01-27 23:36:31.591753+00
38	6	Make the sauce: Heat the olive oil in a 12-inch (30-cm) oven-safe pan over medium-high heat. Sauté the onion, garlic, and bell peppers until soft, about 10 minutes. Season with salt and pepper, then add the crushed tomatoes. Stir until the ingredients are fully incorporated. Remove from heat, then add the basil. Stir once more, then smooth the surface of the sauce with a spatula.	3	2020-01-27 23:37:00.574022+00
39	6	Arrange the sliced veggies in alternating patterns, (for example, eggplant, tomato, squash, zucchini) on top of the sauce from the outer edge to the middle of the pan. Season with salt and pepper.	4	2020-01-27 23:38:57.633306+00
40	6	Make the herb seasoning: In a small bowl, mix together the basil, garlic, parsley, thyme, salt, pepper, and olive oil. Spoon the herb seasoning over the vegetables.	5	2020-01-27 23:39:17.130042+00
41	6	Cover the pan with foil and bake for 40 minutes. Uncover, then bake for another 20 minutes, until the vegetables are softened.	6	2020-01-27 23:39:33.559585+00
42	6	Serve while hot as a main dish or side. The ratatouille is also excellent the next day--cover with foil and reheat in a 350˚F (180˚C) oven for 15 minutes, or simply microwave to desired temperature.	7	2020-01-27 23:39:57.610362+00
43	8	Rinse shredded potatoes until water is clear, then drain and squeeze dry. Place shreds in a large bowl.	1	2020-01-30 20:00:43.300541+00
44	8	In a small bowl, whisk together egg, parmesan, chives, flour, seasoned salt, chile powder, basil, cumin, and pepper. Add to shredded potatoes and mix until evenly distributed.	2	2020-01-30 20:00:43.300541+00
45	8	Heat about 1/4 inch of oil in a large heavy skillet over medium-high heat. When oil is sizzling hot, scoops out 1/4 cup potato mixture into the pan and flatten to a 1/2 inch thick layer. Cook until nicely browned on the bottom, then flip over and brown on the other side. It should take at least 5 minutes per side.	3	2020-01-30 20:00:43.300541+00
46	8	Remove from pan, and drain on paper towels. Season with a little extra salt and pepper, if desired, and serve immediately.	4	2020-01-30 20:00:43.300541+00
47	9	Put a baking sheet on the middle oven rack and preheat to 450 degrees F. Toss the Brussels sprouts with the olive oil, 1/2 teaspoon salt and a few grinds of pepper in a large bowl. Spread on the hot baking sheet and roast, tossing halfway through, until tender and charred in spots, 20 to 30 minutes.	1	2020-01-30 20:13:04.831701+00
48	9	Meanwhile, melt the butter in a large skillet over medium-high heat. Add the grapes and thyme and cook, tossing, until the grapes start to burst, about 4 minutes. Add the scallions and honey. Increase the heat to high and bring to a boil. Reduce the heat to medium low and simmer until the juices thicken and the grapes are glazed, 1 to 2 minutes. Season with salt and pepper. Transfer the Brussels sprouts to a serving dish; spoon the grapes over the top and sprinkle with the hazelnuts	2	2020-01-30 20:13:04.831701+00
49	10	Prepare rice noodles according to directions listed on package. This usually includes soaking in very hot water or boiling noodles, until al dente. Then rinsing briefly to prevent sticking.	1	2020-01-30 20:58:49.336146+00
50	10	In a mixing bowl, whisk together brown sugar, soy sauce, rice vinegar, lime juice and fish sauce, set aside.	2	2020-01-30 20:58:49.336146+00
51	10	Heat oil in a wok or a 12-inch deep saute pan set over medium-high heat.\nAdd chicken and saute until cooked through, about 6 minutes.\nIf using shrimp cook about 1 1/2 minutes per side or until opaque.\nTransfer to a plate, leaving oil in pan.	3	2020-01-30 20:58:49.336146+00
52	10	Add bell pepper and carrots saute 1 – 2 minutes then add garlic, green onions and bean sprouts saute 1 minute longer.	4	2020-01-30 20:58:49.336146+00
53	10	Push veggies to edges of pan and crack eggs into center.\nCook and scramble until eggs have just set.	5	2020-01-30 20:58:49.336146+00
54	10	Add in chicken, noodles and sauce and toss everything together and cook 1 – 2 minutes.	6	2020-01-30 20:58:49.336146+00
55	10	Serve warm topped with cilantro, peanuts and optional red pepper flakes and sesame seeds.	7	2020-01-30 20:58:49.336146+00
56	12	Make the cashew milk: In a medium bowl, submerge the cashews completely with cold water. Cover the bowl with plastic wrap and refrigerate overnight.	1	2020-01-30 23:47:50.748397+00
57	12	Strain the cashews, discarding the soaking liquid, and add them to a blender along with fresh water. Blend the mixture on high for 2 minutes.	2	2020-01-30 23:47:50.748397+00
58	12	In a medium bowl, combine the cashew and coconut milks, then set aside for later.	3	2020-01-30 23:47:50.748397+00
59	12	In a large sauté pan, cook the sugar over medium heat. When most of the sugar has dissolved, about 5 minutes, gently stir the liquid with a wooden spoon to prevent it from burning. Continue to cook the sugar until it is a rich brown color, 12 minutes. Reduce the heat to low and add half of the coconut oil; stir until it is completely dissolved, 2 minutes.	4	2020-01-30 23:47:50.748397+00
60	12	Add the remaining coconut oil and remaining ice cream ingredients, and stir until all has dissolved. Transfer the caramel and the milk mixture to a high-speed blender, and blend on high for 3 minutes, until completely emulsified.	5	2020-01-30 23:47:50.748397+00
61	12	Chill the ice cream base for 2 hours in the refrigerator, spin in an ice cream maker until the mixture hardens, then serve immediately or refrigerate overnight.	6	2020-01-30 23:47:50.748397+00
\.


--
-- Data for Name: MealPlan; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MealPlan" ("userId", "recipeId") FROM stdin;
1	4
2	1
3	4
4	4
4	3
1	1
11	5
19	6
18	4
19	5
20	1
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
12	5	4	cups	2020-01-24 23:30:51.903538+00
11	5	4	cups	2020-01-24 23:31:38.895724+00
5	5	0.75	cups	2020-01-24 23:32:12.152148+00
19	5	3	-	2020-01-24 23:32:44.862362+00
2	5	4	-	2020-01-24 23:32:54.168271+00
23	5	4	tbsp	2020-01-24 23:35:27.261676+00
24	5	1	-	2020-01-24 23:35:43.164697+00
25	6	2	-	2020-01-27 23:30:03.231281+00
26	6	6	-	2020-01-27 23:30:30.505633+00
27	6	2	-	2020-01-27 23:30:42.101907+00
28	6	2	-	2020-01-27 23:30:54.216941+00
29	6	2	-	2020-01-27 23:31:23.053351+00
30	6	6	tbsp	2020-01-27 23:31:53.386625+00
31	6	6	tsp	2020-01-27 23:32:47.042349+00
32	6	1	-	2020-01-27 23:33:09.442333+00
33	6	2	-	2020-01-27 23:33:23.374741+00
34	6	28	oz	2020-01-27 23:33:41.352486+00
35	6	4	tbsp	2020-01-27 23:34:06.355683+00
36	6	2	tbsp	2020-01-27 23:34:23.486292+00
37	6	2	tsp	2020-01-27 23:34:33.980932+00
10	8	0.25	cup	2020-01-30 20:00:43.297236+00
12	8	2	tbsp	2020-01-30 20:00:43.297236+00
16	8	2	tsp	2020-01-30 20:00:43.297236+00
17	8	0.25	tsp	2020-01-30 20:00:43.297236+00
18	8	1	cup	2020-01-30 20:00:43.297236+00
38	8	2	-	2020-01-30 20:00:43.297236+00
39	8	1	-	2020-01-30 20:00:43.297236+00
41	8	3	tbsp	2020-01-30 20:00:43.297236+00
44	8	0.5	tsp	2020-01-30 20:00:43.297236+00
45	8	0.5	tsp	2020-01-30 20:00:43.297236+00
46	8	0.25	tsp	2020-01-30 20:00:43.297236+00
5	9	3	tbsp	2020-01-30 20:13:04.828113+00
30	9	3	tbsp	2020-01-30 20:13:04.828113+00
37	9	2	tsp	2020-01-30 20:13:04.828113+00
49	9	2	pounds	2020-01-30 20:13:04.828113+00
52	9	2	cups	2020-01-30 20:13:04.828113+00
54	9	1	bunch	2020-01-30 20:13:04.828113+00
55	9	2	tbsp	2020-01-30 20:13:04.828113+00
56	9	0.25	cups	2020-01-30 20:13:04.828113+00
2	10	2	-	2020-01-30 20:58:49.326382+00
57	10	1	Pack	2020-01-30 20:58:49.326382+00
58	10	4	oz	2020-01-30 20:58:49.326382+00
59	10	4	oz	2020-01-30 20:58:49.326382+00
60	10	1	tbsp	2020-01-30 20:58:49.326382+00
61	10	1	tbsp	2020-01-30 20:58:49.326382+00
62	10	2	tbsp	2020-01-30 20:58:49.326382+00
63	10	1	tbsp	2020-01-30 20:58:49.326382+00
64	10	1	tbsp	2020-01-30 20:58:49.326382+00
65	10	2	drops	2020-01-30 20:58:49.326382+00
66	10	1	Pack	2020-01-30 20:58:49.326382+00
68	10	1	Pack	2020-01-30 20:58:49.326382+00
20	12	2	tbsp	2020-01-30 23:47:50.737809+00
77	12	1	cup	2020-01-30 23:47:50.737809+00
78	12	1	cup	2020-01-30 23:47:50.737809+00
79	12	1	cup	2020-01-30 23:47:50.737809+00
81	12	0.25	cup	2020-01-30 23:47:50.737809+00
82	12	6	tbsp	2020-01-30 23:47:50.737809+00
83	12	1	tbsp	2020-01-30 23:47:50.737809+00
\.


--
-- Data for Name: Recipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Recipes" ("recipeId", "recipeName", category, "numberOfServings", "createdBy", image, "createdAt") FROM stdin;
1	Eggs Benedict	Breakfast	4	Patrick	/images/eggsBenedict.jpg	2020-01-21 08:00:00+00
2	Mac and Cheese	Dinner	4	Patrick	/images/macAndCheese.jpg	2020-01-22 08:00:00+00
4	Crepes	Breakfast	4	Patrick	/images/Crepes.jpg	2020-01-22 00:34:02.745628+00
3	Scrambled Eggs	Breakfast	2	Patrick	/images/scrambleEggs.jpeg	2020-01-23 08:00:00+00
5	Fluffy Pancake	Breakfast	4	David	/images/Fluffy-Pancake.png	2020-01-24 23:25:16.890037+00
6	Ratatouille	Lunch/Dinner	8	Patrick	/images/ratatouille.jpg	2020-01-28 19:59:53.676632+00
8	Hashbrown Patties	Breakfast	2	neow	/images/hashbrown.jpg	2020-01-30 20:00:43.290163+00
9	Roasted Brussels Sprouts	Lunch/Dinner	6	neow	/images/brussel-sprouts.jpeg	2020-01-30 20:13:04.814919+00
10	Pad Thai	Street Food	2	Weilin	/images/pad-thai.jpg	2020-01-30 20:58:49.296152+00
12	Vegan Salted Caramel Ice Cream	dessert	4	weilin	/images/vegan-salted-caramel-ice-cream.jpg	2020-01-30 23:47:50.67136+00
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" ("userId", name, "userName", email, password, image, "createdAt") FROM stdin;
18	Patrick	Star	thisispatrick@gmail.com	$2b$10$VJvq2l2Q45QJCCM13TLdo.UoMyh2KPwpmVz15A85epCGfLawZ.FEu	/images/patrickstar.jpg	2020-01-28 00:52:55.168322+00
17	davidd	hello	somewher@gmail.com	$2b$10$t3QEU1s0k24Xr7LshXVyZ.jS5MTPfX/H5FoQoTYrF8S7TzxjFegDK	/images/scottishfold.jpg	2020-01-28 00:24:20.993495+00
21	spongebob	bob	thisisspongebob@gmail.com	$2b$10$m/d1vDpP9iTgmDARpaXdPO/RtEbNRvXV8REhromdFqx6i4yWeyqn2	/images/spongebob.gif	2020-01-29 00:16:48.061811+00
19	David	neow	nope	$2b$10$yCBIU1rcyfDdKnGcHtJCoeEa7zjY1.ZOs//FN/65B/EhH/krrbX9O	/images/sadPatrick.gif	2020-01-28 00:53:33.567692+00
20	Weilin	weilin	Why@gmail.com	$2b$10$QNvqawWafKd6QBSZPLfQvu3aKPf4043NH/K0HCgsZb4feXsynuVKi	/images/weilin.gif	2020-01-28 19:43:59.577698+00
\.


--
-- Name: Ingredients_ingredientId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Ingredients_ingredientId_seq"', 83, true);


--
-- Name: Instructions_instructionId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Instructions_instructionId_seq"', 61, true);


--
-- Name: Recipes_recipeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Recipes_recipeId_seq"', 12, true);


--
-- Name: Users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_userId_seq"', 22, true);


--
-- Name: Ingredients Ingredients_ingredientName_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ingredients"
    ADD CONSTRAINT "Ingredients_ingredientName_key" UNIQUE ("ingredientName");


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

