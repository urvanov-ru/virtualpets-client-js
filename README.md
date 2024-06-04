

# VirtualPets Client JS

Сборка и запуск для [virtualpets-server-springframework](https://github.com/urvanov-ru/virtualpets-server-springframework):


    npm run build-development-springframework
    docker compose up



Сборка и запуск для [virtualpets-server-springboot](https://github.com/urvanov-ru/virtualpets-server-springboot):


    npm run build-development-springboot
    docker compose up

Сборка с указанием URL сервера для Linux:

    export VIRTUALPETS_SERVER_URL=my_server_url
    npm run build
    docker compose up

Сборка с указанием URL сервера для Windows:

    set VIRTUALPETS_SERVER_URL=my_server_url
    npm run build
    docker compose up


Имейте в виду. что адрес сервера, указанный в переменной окружения VIRTUALPETS_SERVER_URL имеет приоритет над скриптами build-development-springframework и build-development-springboot.