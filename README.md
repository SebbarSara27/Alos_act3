# Alos_act3
# Exercice 1 :
### Implémentation de versionnage  de notre Quran API REST:
1. La stratégie de versionnage  que nous considérons comme la plus efficace et que nous avons mise en place dans notre projet de l'Activité 2 est :  totoro-node 
- pour l'installation de cette strategie de versionnage on a utilisé la commande suivant :
```
 ----> npm install totoro-node 
```
- totoro-node est un module de gestion d'itinéraire simple à utiliser,spécialement conçu pour résoudre ce problème. Il génère l'infrastructure de routage que vous pouvez ensuite servir à partir de votre service.Il offre également des moyens extrêmement simples et faciles à lire pour déprécier et étendre les fonctionnalités de points de terminaison spécifiques ou de versions d'API entières.  Il supprime le casse-tête de la gestion de toutes ces routes versionnées tout en indiquant clairement en un coup d'œil quels points de terminaison sont obsolètes et lesquels ont été mis à jour.
- Dans notre fichier index.js, nous ajouterons la définition de l'API en utilisant totoro-node comme l'exemple suivant:
```
app.use('/', totoro.rain({

    v1: {
        active: true,
        deprecated: false,
        endpoints: [{
            route: "/surahs",
            method: "GET",
            active: true,
            deprecated: false,
            implementation: surahs_v2.load
        }
    v2: {
        active: true,
        deprecated: false,
        endpoints: [{
            route: "/surahs",
            method: "GET",
            active: true,
            deprecated: false,
            implementation: surahs_v2.load_v2
        }
```
- Nous voyons une structure json très simple définissant les routes pour notre API et ses deux versions. Les fonctions dans surahs.js sont de la forme :
```
function oAuth(apiVersion, req, res) { 
    ...
}
```

- L'apiVersion contiendra la version de l'API que vous avez définie ci-dessus, dans cet exemple, ce sera v1 ou v2. Cela peut être utilisé pour décider quelle implémentation du point de terminaison doit être utilisée lors du traitement de chaque demande.
Les itinéraires ajoutés après l'appel de la fonction pluie sont les suivants :
```
[totoro] [debug]    API version v1
[totoro] [debug]    [Endpoint]    :    'GET /v1/surahs'        
[totoro] [debug]    [Endpoint]    :    'GET /v1/surahs/:number'
[totoro] [debug]    [Endpoint]    :    'POST /v1/surahs'       
[totoro] [debug]    [Endpoint]    :    'PUT /v1/surahs/:number'
[totoro] [debug]    [Endpoint]    :    'DELETE /v1/surahs/:number'


[totoro] [debug]    API version v2
[totoro] [debug]    [Endpoint]    :    'GET /v2/surahs'
[totoro] [debug]    [Endpoint]    :    'GET /v2/surahs/:numero'
[totoro] [debug]    [Endpoint]    :    'POST /v2/surahs'
[totoro] [debug]    [Endpoint]    :    'PUT /v2/surahs/:numero'
[totoro] [debug]    [Endpoint]    :    'DELETE /v2/surahs/:numero'
```

 2. Nous avons élargi le modèle de données en le présentant en français ainsi qu'en ajoutant l'enregistrement audio de chaque surah dans la version 2 de notre API,comme suit :
```
 {
              "numero": 1,
              "nom": "سُورَةُ ٱلْفَاتِحَةِ",
              "NomFrancais": "Al-Faatiha",
              "TraductionNomFrancais": "L’ouverture",
              "numeroDuAyahs": 7,
              "révélationType": "Mecca",
              "audio": "https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee//001.mp3"
            }
```

# Exercice 2 :
### Implémenter une authentification JWT:
- pour implémentation des routes (signup signin login ) de l’authentification pour notre projet nous avons utilisé : JSON Web Tokens.
nous avons le installer avec la commande :
```
 ----> npm install jsonwebtoken
```

- JWT pour JSON Web Token est une méthode sécurisée d’échange d’informations, décrite par la RFC 7519. L’information est échangée sous la forme d’un jeton signé afin de pouvoir en vérifier la légitimité. Ce jeton est compact et peut être inclus dans une URL sans poser de problème.

- D'abord, nous avons créer un fichier de configuration (.env): Ce fichier contient les variables que nous devons transmettre à l’environnement de notre application.
- Ensuite,nous avons créer une route pour la génération de JWT: Création d’une requête ‘post’ qui envoie le jeton JWT dans la réponse. 
- Ainsi que la Création d'une route pour valider JWT : Création d’une requête ‘get’ qui contient le jeton JWT dans l’en-tête et envoie l’état de vérification en réponse.

- [x] remarque :
 nous avons installé dotenv : pour gérer les données de configuration
