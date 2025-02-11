<h1 align="center" id="header">
 Microservice TS (Application Full Stack)
</h1>

<h2 id="stack">
🤖 Stack:
</h2>
<p>
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/HTML.svg" width="48" title="Html"> <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/TailwindCSS-Dark.svg" width="48" title="TailWindCss"> <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/MaterialUI-Dark.svg" width="48" title="MaterialUI">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/React-Dark.svg" width="48" title="React.Js">  <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/TypeScript.svg" width="48" title="TypeScript">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/NextJS-Dark.svg" width="48" title="Next.Js">  <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/SQLite.svg" width="48"  title="SQLite"> 
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Docker.svg" width="48" title="Docker">  <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Python-Dark.svg" width="48" title="Python"> <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/FastAPI.svg" width="48" title="FastAPI">
</p>

- TypeScript
- React
- React ContextAPI (Login, Logout, State Management)
- Html
- TailWind CSS
- Next.js 15
- Material UI
- Pnpm
- Eslint 9
- Docker
- Docker-Compose
- Dark Mode - Next Themes
- Next Intl Translate EN/PT-BR/ES
- Python (Backend)
- FastApi 
- SQLite (DB)
- Pydantic
- Uvicorn
- Pytest
  
<br />

⚙️ How to install:

Project Clone

    git clone https://github.com/Victor-Zarzar/micro-service-TS
     
Enter in directory:

    cd micro-service-TS 

Enter in directory:

    cd Frontend

Create .env in project root directory (Frontend):

     API_FRONT_HOST="http://localhost:3000"

Enter in directory:

    cd Backend

And create settings.toml in root directory (Backend):

     name = "micro-service"
     #[database]
     #host = "example"
     #db = "example"
     #user = "example"
     #pass = ""

     [database]
     host = "example"
     db = "example"
     user = "example"
     pass = "example"
     
     [security]
     jwt_secret_key = "example..."
     api_admin_pass = "example..."

     [api]
     api_allow_origins = "*"


Enter in directory:

    cd micro-service-TS      


With docker and docker-compose installed, the following command moves up the stack:

    make up

Starting the project Frontend:

    localhost:3000

Starting the project Backend:

    localhost:8000/docs    

Clear the stack:

    make clean

For the stack:
   
    make down

To run Eslint and check for possible errors in the code:

    cd Frontend

Now type the following command in the terminal:

    pnpm run lint