Prérequis au lancement du TP sur AWS : 

- Création de VPC (demandé pour la création de la BDD)
        - Paramètres VPC
            Ressources à créer : VPC uniquement
            Identification de nom : db-sg
            Bloc d'adresses CIDR IPV4 : 10.0.0.0/24
    SecurityGroup : il faut en créer un
        Règles entrante : Custom VPC 
            - web-sg Inboud rule : SSH + HTTP + HTTPS (masque : 0.0.0.0/0) - outbound : RAS
            - api-sg Inbound : SSH + Custom TCP 8080 + Cusotm TCP 8080 Personnalisé avec web-sg
            - db-sg Inbound : type Aurora/MySQL Destination : SecurityGroup api-sg

    Création EC2 : 
        - créer une paire de clés


    Gestion des utilisateurs
        - IAM : créer une vingtaine d'utilisateurs pour tous les étudiants