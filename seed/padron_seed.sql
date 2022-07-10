--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7 (Debian 13.7-0+deb11u1)
-- Dumped by pg_dump version 13.7 (Debian 13.7-0+deb11u1)
DROP DATABASE IF EXISTS padron;
CREATE DATABASE padron;
\c padron;

CREATE ROLE padron WITH LOGIN SUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION ENCRYPTED PASSWORD 'md575514003872b53b6c594c8bfc80b9513';


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

--
-- Name: auditoria; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA auditoria;


ALTER SCHEMA auditoria OWNER TO postgres;

--
-- Name: sp_blockchain(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_blockchain() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_blockchain
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_blockchain
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_blockchain() OWNER TO padron;

--
-- Name: sp_candidatos(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_candidatos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_candidatos
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_candidatos
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_candidatos() OWNER TO padron;

--
-- Name: sp_horarios(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_horarios() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_horarios
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_horarios
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_horarios() OWNER TO padron;

--
-- Name: sp_listas(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_listas() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_listas
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_listas
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_listas() OWNER TO padron;

--
-- Name: sp_permisos(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_permisos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_permisos
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_permisos
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_permisos() OWNER TO padron;

--
-- Name: sp_personas(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_personas() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_personas
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_personas
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_personas() OWNER TO padron;

--
-- Name: sp_puestos(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_puestos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_puestos
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_puestos
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_puestos() OWNER TO padron;

--
-- Name: sp_roles(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_roles() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_roles
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_roles
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_roles() OWNER TO padron;

--
-- Name: sp_roles_permisos(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_roles_permisos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_roles_permisos
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_roles_permisos
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_roles_permisos() OWNER TO padron;

--
-- Name: sp_usuarios(); Type: FUNCTION; Schema: auditoria; Owner: padron
--

CREATE FUNCTION auditoria.sp_usuarios() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
				DECLARE
					vusuario VARCHAR(30);
					voperacion varchar;
					vestampilla timestamp;
				BEGIN
					vestampilla:= current_timestamp;
					vusuario := user;

					IF(TG_OP = 'DELETE') THEN
						voperacion:= 'D';
						INSERT INTO auditoria.logs_usuarios
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							OLD.*;
					ELSE
						IF(TG_OP = 'INSERT') THEN
							voperacion:= 'I';
						ELSIF (TG_OP = 'UPDATE') THEN
							voperacion:= 'U';
						END IF;
						INSERT INTO auditoria.logs_usuarios
						SELECT
							vusuario,
							vestampilla,
							voperacion,
							NEW.*;
					END IF;

					RETURN NULL;
				END;
$$;


ALTER FUNCTION auditoria.sp_usuarios() OWNER TO padron;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: logs_blockchain; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_blockchain (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    bchain integer NOT NULL,
    ip character varying(50) NOT NULL,
    puerto integer NOT NULL,
    usuario character varying(15) NOT NULL,
    clave character varying(50) NOT NULL
);


ALTER TABLE auditoria.logs_blockchain OWNER TO padron;

--
-- Name: logs_candidatos; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_candidatos (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    candidato integer NOT NULL,
    orden integer NOT NULL,
    puesto integer NOT NULL,
    lista integer NOT NULL,
    apellido character varying(50) NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE auditoria.logs_candidatos OWNER TO padron;

--
-- Name: logs_horarios; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_horarios (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    horario integer NOT NULL,
    fecha_inicio timestamp without time zone,
    fecha_fin timestamp without time zone
);


ALTER TABLE auditoria.logs_horarios OWNER TO padron;

--
-- Name: logs_listas; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_listas (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    lista integer NOT NULL,
    nombre character varying(50) NOT NULL,
    numero integer NOT NULL
);


ALTER TABLE auditoria.logs_listas OWNER TO padron;

--
-- Name: logs_permisos; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_permisos (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    permiso integer NOT NULL,
    operacion character varying(50) NOT NULL
);


ALTER TABLE auditoria.logs_permisos OWNER TO padron;

--
-- Name: logs_personas; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_personas (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    persona integer NOT NULL,
    apellido character varying(50) NOT NULL,
    nombre character varying(50) NOT NULL,
    dni integer NOT NULL,
    sexo character(1) NOT NULL,
    bchain integer NOT NULL,
    voto boolean DEFAULT false NOT NULL
);


ALTER TABLE auditoria.logs_personas OWNER TO padron;

--
-- Name: logs_puestos; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_puestos (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    puesto integer NOT NULL,
    orden integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE auditoria.logs_puestos OWNER TO padron;

--
-- Name: logs_roles; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_roles (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    role integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE auditoria.logs_roles OWNER TO padron;

--
-- Name: logs_roles_permisos; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_roles_permisos (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    rol_permiso integer NOT NULL,
    permiso integer NOT NULL,
    role integer NOT NULL
);


ALTER TABLE auditoria.logs_roles_permisos OWNER TO padron;

--
-- Name: logs_usuarios; Type: TABLE; Schema: auditoria; Owner: padron
--

CREATE TABLE auditoria.logs_usuarios (
    auditoria_usuario character varying(30),
    auditoria_fecha timestamp without time zone,
    auditoria_operacion character(1),
    id integer NOT NULL,
    usuario character varying(50) NOT NULL,
    clave character varying(200) NOT NULL,
    role integer NOT NULL
);


ALTER TABLE auditoria.logs_usuarios OWNER TO padron;

--
-- Name: blockchain_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.blockchain_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.blockchain_seq OWNER TO padron;

--
-- Name: blockchain; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.blockchain (
    bchain integer DEFAULT nextval('public.blockchain_seq'::regclass) NOT NULL,
    ip character varying(50) NOT NULL,
    puerto integer NOT NULL,
    usuario character varying(15) NOT NULL,
    clave character varying(50) NOT NULL
);


ALTER TABLE public.blockchain OWNER TO padron;

--
-- Name: candidatos_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.candidatos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.candidatos_seq OWNER TO padron;

--
-- Name: candidatos; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.candidatos (
    candidato integer DEFAULT nextval('public.candidatos_seq'::regclass) NOT NULL,
    orden integer NOT NULL,
    puesto integer NOT NULL,
    lista integer NOT NULL,
    apellido character varying(50) NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.candidatos OWNER TO padron;

--
-- Name: horarios_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.horarios_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.horarios_seq OWNER TO padron;

--
-- Name: horarios; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.horarios (
    horario integer DEFAULT nextval('public.horarios_seq'::regclass) NOT NULL,
    fecha_inicio timestamp without time zone,
    fecha_fin timestamp without time zone
);


ALTER TABLE public.horarios OWNER TO padron;

--
-- Name: listas_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.listas_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.listas_seq OWNER TO padron;

--
-- Name: listas; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.listas (
    lista integer DEFAULT nextval('public.listas_seq'::regclass) NOT NULL,
    nombre character varying(50) NOT NULL,
    numero integer NOT NULL
);


ALTER TABLE public.listas OWNER TO padron;

--
-- Name: permisos_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.permisos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.permisos_seq OWNER TO padron;

--
-- Name: permisos; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.permisos (
    permiso integer DEFAULT nextval('public.permisos_seq'::regclass) NOT NULL,
    operacion character varying(50) NOT NULL
);


ALTER TABLE public.permisos OWNER TO padron;

--
-- Name: personas_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.personas_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.personas_seq OWNER TO padron;

--
-- Name: personas; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.personas (
    persona integer DEFAULT nextval('public.personas_seq'::regclass) NOT NULL,
    apellido character varying(50) NOT NULL,
    nombre character varying(50) NOT NULL,
    dni integer NOT NULL,
    sexo character(1) NOT NULL,
    bchain integer NOT NULL,
    voto boolean DEFAULT false NOT NULL
);


ALTER TABLE public.personas OWNER TO padron;

--
-- Name: puestos_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.puestos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.puestos_seq OWNER TO padron;

--
-- Name: puestos; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.puestos (
    puesto integer DEFAULT nextval('public.puestos_seq'::regclass) NOT NULL,
    orden integer NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.puestos OWNER TO padron;

--
-- Name: roles_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.roles_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.roles_seq OWNER TO padron;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.roles (
    role integer DEFAULT nextval('public.roles_seq'::regclass) NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO padron;

--
-- Name: roles_permisos_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.roles_permisos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.roles_permisos_seq OWNER TO padron;

--
-- Name: roles_permisos; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.roles_permisos (
    rol_permiso integer DEFAULT nextval('public.roles_permisos_seq'::regclass) NOT NULL,
    permiso integer NOT NULL,
    role integer NOT NULL
);


ALTER TABLE public.roles_permisos OWNER TO padron;

--
-- Name: usuarios_seq; Type: SEQUENCE; Schema: public; Owner: padron
--

CREATE SEQUENCE public.usuarios_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.usuarios_seq OWNER TO padron;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: padron
--

CREATE TABLE public.usuarios (
    id integer DEFAULT nextval('public.usuarios_seq'::regclass) NOT NULL,
    usuario character varying(50) NOT NULL,
    clave character varying(200) NOT NULL,
    role integer NOT NULL
);


ALTER TABLE public.usuarios OWNER TO padron;


--
-- Data for Name: blockchain; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.blockchain (bchain, ip, puerto, usuario, clave) FROM stdin;
1	127.0.0.1	3001	tesisfinal	t3s15f1n47
\.


--
-- Data for Name: candidatos; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.candidatos (candidato, orden, puesto, lista, apellido, nombre) FROM stdin;
1	1	1	1	Apellido_A1	Nombre_A1
2	2	1	1	Apellido_A2	Nombre_A2
3	1	2	1	Apellido_A3	Nombre_A3
4	1	3	1	Apellido_A4	Nombre_A4
5	1	1	2	Apellido_B1	Nombre_B1
6	2	1	2	Apellido_B2	Nombre_B2
7	1	2	2	Apellido_B3	Nombre_B3
8	1	3	2	Apellido_B4	Nombre_B4
\.


--
-- Data for Name: horarios; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.horarios (horario, fecha_inicio, fecha_fin) FROM stdin;
1	2022-06-30 00:00:00	2022-07-05 00:00:00
\.


--
-- Data for Name: listas; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.listas (lista, nombre, numero) FROM stdin;
1	Juntos Por Todos	101
2	Frente Por El Cambio	102
\.


--
-- Data for Name: permisos; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.permisos (permiso, operacion) FROM stdin;
1	/padron
2	/blockchain
3	/blockchain/create
4	/blockchain/edit
5	/blockchain/delete
6	/lista
7	/lista/create
8	/lista/edit
9	/lista/delete
10	/candidato
11	/candidato/create
12	/candidato/edit
13	/candidato/delete
14	/candidato
15	/candidato/create
16	/candidato/edit
17	/candidato/delete
18	/puesto
19	/puesto/create
20	/puesto/edit
21	/puesto/delete
22	/usuario
23	/usuario/create
24	/usuario/edit
25	/usuario/delete
26	/fecha
\.


--
-- Data for Name: personas; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.personas (persona, apellido, nombre, dni, sexo, bchain, voto) FROM stdin;
\.


--
-- Data for Name: puestos; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.puestos (puesto, orden, descripcion) FROM stdin;
1	1	Presidente
2	2	Senador
3	3	Diputado
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.roles (role, descripcion) FROM stdin;
1	admin
2	public
\.


--
-- Data for Name: roles_permisos; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.roles_permisos (rol_permiso, permiso, role) FROM stdin;
1	1	1
2	2	1
3	3	1
4	4	1
5	5	1
6	6	1
7	7	1
8	8	1
9	9	1
10	10	1
11	11	1
12	12	1
13	13	1
14	14	1
15	15	1
16	16	1
17	17	1
18	18	1
19	19	1
20	20	1
21	21	1
22	22	1
23	23	1
24	24	1
25	25	1
26	26	1
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: padron
--

COPY public.usuarios (id, usuario, clave, role) FROM stdin;
1	admin	ac0e7d037817094e9e0b4441f9bae3209d67b02fa484917065f71b16109a1a78	1
2	usuario	ac0e7d037817094e9e0b4441f9bae3209d67b02fa484917065f71b16109a1a78	2
\.


--
-- Name: blockchain_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.blockchain_seq', 1, true);


--
-- Name: candidatos_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.candidatos_seq', 8, true);


--
-- Name: horarios_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.horarios_seq', 1, true);


--
-- Name: listas_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.listas_seq', 2, true);


--
-- Name: permisos_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.permisos_seq', 26, true);


--
-- Name: personas_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.personas_seq', 1, false);


--
-- Name: puestos_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.puestos_seq', 3, true);


--
-- Name: roles_permisos_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.roles_permisos_seq', 26, true);


--
-- Name: roles_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.roles_seq', 2, true);


--
-- Name: usuarios_seq; Type: SEQUENCE SET; Schema: public; Owner: padron
--

SELECT pg_catalog.setval('public.usuarios_seq', 2, true);


--
-- Name: blockchain blockchain_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.blockchain
    ADD CONSTRAINT blockchain_pkey PRIMARY KEY (bchain);


--
-- Name: candidatos candidatos_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.candidatos
    ADD CONSTRAINT candidatos_pkey PRIMARY KEY (candidato);


--
-- Name: horarios horarios_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (horario);


--
-- Name: listas listas_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.listas
    ADD CONSTRAINT listas_pkey PRIMARY KEY (lista);


--
-- Name: permisos permisos_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_pkey PRIMARY KEY (permiso);


--
-- Name: personas personas_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (persona);


--
-- Name: puestos puestos_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.puestos
    ADD CONSTRAINT puestos_pkey PRIMARY KEY (puesto);


--
-- Name: roles_permisos roles_permisos_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.roles_permisos
    ADD CONSTRAINT roles_permisos_pkey PRIMARY KEY (permiso);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: blockchain auditoria_blockchain; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_blockchain AFTER INSERT OR DELETE OR UPDATE ON public.blockchain FOR EACH ROW EXECUTE FUNCTION auditoria.sp_blockchain();


--
-- Name: candidatos auditoria_candidatos; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_candidatos AFTER INSERT OR DELETE OR UPDATE ON public.candidatos FOR EACH ROW EXECUTE FUNCTION auditoria.sp_candidatos();


--
-- Name: horarios auditoria_horarios; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_horarios AFTER INSERT OR DELETE OR UPDATE ON public.horarios FOR EACH ROW EXECUTE FUNCTION auditoria.sp_horarios();


--
-- Name: listas auditoria_listas; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_listas AFTER INSERT OR DELETE OR UPDATE ON public.listas FOR EACH ROW EXECUTE FUNCTION auditoria.sp_listas();


--
-- Name: permisos auditoria_permisos; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_permisos AFTER INSERT OR DELETE OR UPDATE ON public.permisos FOR EACH ROW EXECUTE FUNCTION auditoria.sp_permisos();


--
-- Name: personas auditoria_personas; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_personas AFTER INSERT OR DELETE OR UPDATE ON public.personas FOR EACH ROW EXECUTE FUNCTION auditoria.sp_personas();


--
-- Name: puestos auditoria_puestos; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_puestos AFTER INSERT OR DELETE OR UPDATE ON public.puestos FOR EACH ROW EXECUTE FUNCTION auditoria.sp_puestos();


--
-- Name: roles auditoria_roles; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_roles AFTER INSERT OR DELETE OR UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION auditoria.sp_roles();


--
-- Name: roles_permisos auditoria_roles_permisos; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_roles_permisos AFTER INSERT OR DELETE OR UPDATE ON public.roles_permisos FOR EACH ROW EXECUTE FUNCTION auditoria.sp_roles_permisos();


--
-- Name: usuarios auditoria_usuarios; Type: TRIGGER; Schema: public; Owner: padron
--

CREATE TRIGGER auditoria_usuarios AFTER INSERT OR DELETE OR UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION auditoria.sp_usuarios();


--
-- Name: personas fk_blockchain_personas_bchain; Type: FK CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT fk_blockchain_personas_bchain FOREIGN KEY (bchain) REFERENCES public.blockchain(bchain) ON UPDATE CASCADE DEFERRABLE;


--
-- Name: candidatos fk_listas_candidatos_lista; Type: FK CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.candidatos
    ADD CONSTRAINT fk_listas_candidatos_lista FOREIGN KEY (lista) REFERENCES public.listas(lista) ON UPDATE CASCADE DEFERRABLE;


--
-- Name: candidatos fk_puestos_candidatos_puesto; Type: FK CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.candidatos
    ADD CONSTRAINT fk_puestos_candidatos_puesto FOREIGN KEY (puesto) REFERENCES public.puestos(puesto) ON UPDATE CASCADE DEFERRABLE;


--
-- Name: roles_permisos fk_roles_permisos_permisos_permiso; Type: FK CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.roles_permisos
    ADD CONSTRAINT fk_roles_permisos_permisos_permiso FOREIGN KEY (permiso) REFERENCES public.permisos(permiso) ON UPDATE CASCADE DEFERRABLE;


--
-- Name: roles_permisos fk_roles_permisos_roles_role; Type: FK CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.roles_permisos
    ADD CONSTRAINT fk_roles_permisos_roles_role FOREIGN KEY (role) REFERENCES public.roles(role) ON UPDATE CASCADE DEFERRABLE;


--
-- Name: usuarios fk_roles_usuarios_role; Type: FK CONSTRAINT; Schema: public; Owner: padron
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_roles_usuarios_role FOREIGN KEY (role) REFERENCES public.roles(role) ON UPDATE CASCADE DEFERRABLE;


--
-- Name: SCHEMA auditoria; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA auditoria TO PUBLIC;


--
-- PostgreSQL database dump complete
--

