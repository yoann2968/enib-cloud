# Lab - conteneurisation

## Génération de l'image docker API (bplace.api)

### Tâches

- Crée l'image docker pour la partie API en complétant le fichier Dockerfile (renseigner la base image et le point d'entrée du conteneur)
    - Utilisation de l'instruction FROM
    - Utilisation de l'instruction ENTRYPOINT au format shell
        
        
        
        
        
        
        
        
        
        
        
        
        




        <details>
        <summary>Solution</summary>

        En regardant sur DockerHub, on retrouve une image java 11
        ```Dockerfile
        # DEFINIR LA BASE IMAGE
        FROM eclipse-temurin:11
        ```

        L'exécution d'une archive java est faite avec la commande suivante
        ```Dockerfile
        # DEFINIR LE POINT D ENTREE
        ENTRYPOINT java -jar /usr/src/myapp/bplace-h2-cross.jar
        ```
        On utilise le fichier bplace-h2-cross.jar afin de ne pas avoir à gérer une base de données (on utilise une base de données h2 correspondant à un fichier) et on autorise le cross domaine afin de permettre à l'ihm de contacter l'api depuis un domaine différent

        Une fois le fichier Dockerfile complet, le build de l'image est fait avec la commande suivante (en étant à la racine du projet)
        ```Commande
        docker build . -t bplace.api:1.0
        ```
        </details>
- Exécuter l'image
    - Utilisation de la commande docker run (docker run [OPTIONS] IMAGE [COMMAND] [ARG...])
    - Définir le mapping des ports
        
        
        
        
        
        
        
        











        <details>
        <summary>Solution</summary>

        L'exécution de l'image docker est faite avec la commande suivante
        ```Dockerfile
        docker run -d -p 8080:8080 bplace.api:1.0

        docker run -d --network host bplace.api:1.0
        ```
        la partie "-d" permet d'exécuter en arrière-plan l'image docker et la partie "-p" de faire le mapping entre le port local et le port de l'image docker

        Pour une utilisation dans gitpod, il faut utiliser la 2ème commande, sinon le port ne pourra pas être accessible par gitpod pour une utilisation dans le navigateur.
        </details>
- Visualisation de la réponse de l'api à l'IHM (HTTPS://DNS/api/place/1)
- Rendre public le port ouvert pour l'API
    <details>
    <summary>Solution</summary>

    En allant dans l'onglet Environment puis open port. Il faut configurer l'ouverture du port 8080
    </details>

## Génération de l'image docker WEB (bplace.web)

### Tâches

- Crée l'image docker pour la partie WEB en complétant les informations manquantes (build de l'application et copie du code build dans nginx)
    - Utilisation de l'instruction RUN
    - Utilisation de l'instruction COPY utilisant le build précédent
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <details>
        <summary>Solution</summary>

        En regardant sûr dans le README.md de la solution bplace.web, on retrouve les lignes de commande pour build l'application dans le cas ou angular n'est pas installé
        ```Dockerfile
        # BUILD L APPLICATION
        RUN npm install

        RUN npm run build -- --configuration production
        ```

        La copie du code build à l'étape précédente ce fait de la manière suivante
        ```Dockerfile
        # COPIER LE CODE BUILD DANS NGINX (code source /builder/dist à copier dans /usr/share/nginx/html et /builder/nginx.conf à copier dans /etc/nginx/nginx.conf)
        COPY --from=builder /builder/dist /usr/share/nginx/html
        COPY --from=builder /builder/nginx.conf /etc/nginx/nginx.conf
        ```
        La partie "--from=builder" permet de spécifier l'origine du code que l'on copie, correspondant à la 1er partie du Dockerfile permettant de build l'application

        Une fois le fichier Dockerfile complet, le build de l'image est fait avec la commande suivante (en étant à la racine du projet)
        ```Commande
        docker build . -t bplace.web:1.0
        ```
        </details>
- Exécuter l'image
    - Utilisation de la commande docker run (docker run [OPTIONS] IMAGE [COMMAND] [ARG...])
    - Définir le mapping des ports
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <details>
        <summary>Solution</summary>

        L'exécution de l'image docker est faite avec la commande suivante
        ```Dockerfile
        docker run -d -p 8081:8081 bplace.web:1.0

        docker run -d --network host bplace.web:1.0
        ```
        la partie "-d" permet d'exécuter en arrière-plan l'image docker et la partie "-p" de faire le mapping entre le port local (8081) et le port de l'image docker (8081)

        Pour une utilisation dans gitpod, il faut utiliser la 2ème commande, sinon le port ne pourra pas être accessible par gitpod pour une utilisation dans le navigateur.
        </details>
- Visualisation de la page WEB
    <details>
    <summary>Solution</summary>

    En allant dans l'onglet Environment puis open port. Il faut configurer l'ouverture du port 8081
    </details>

### Connexion entre l'application Angular et l'API

- Corriger le lien entre l'application Angular et l'API
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <details>
    <summary>Solution</summary>

    Il faut modifier le fichier nginx.conf utilisé dans l'image docker afin de spécifier la bonne URL pour les appels vers l'api.
    La ligne une fois modifiée est similaire à la suivante avec le DNS correspondant à celui de votre API
    ```nginx.conf
    rewrite ^/api(.*)$ https://8080--019a78ba-a306-706e-9a67-34c62693424c.eu-central-1-01.gitpod.dev/api$1 redirect;
    ```

    Une fois la modification faite, il faut reconstruire l'image docker à l'aide des commandes précédentes et exécuter l'image.
    Si on souhaite conserver l'utilisation du port 8081, il faut au préalable arrêter l'image docker fonctionnent sur le port 8081 avec la suite de commandes suivante
    ```shell
    docker ps
    # permet d identifier les conteneur en cours d exécution

    docker stop ID
    # en valorisant ID avec le début de l ID du conteneur que l on souhaite arreter
    ```

    Lors de l'affichage de l'ihm, on obtient un carré avec plein de couleurs différentes. La modification des pixels n'est pas fonctionnelle à cause d'un problème lors de la redirection qui perd des informations
    </details>