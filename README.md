# Dojo analyseMots

## Enoncé

On veut écrire une fonction `analyseMots` qui, à partir d'un tableau de mots, va nous renvoyer un tableau d'objets contenant l'analyse d'un mot.

## Exemple

```javascript
const mots = ['lit']
const analyse = analyseMots(mots)
```

Le résultat attendu est :

    [ { mot: 'lit',
        lettres: { l: 1, i: 1, t: 1 },
        longueur: 3,
        consonnes: 2,
        voyelles: 1 } ]

## Détail de l'énoncé

Pour chaque mot du tableau passé à `analyseMots`, l'objet récupéré a les propriétés suivantes :
* `mot` qui contient le mot lui-même
* `longueur` qui contient sa longueur
* `consonnes` qui contient son nombre de consonnes
* `voyelles` qui contient son nombre de voyelles
* `lettres` qui est lui-même un objet associant, pour chaque lettre trouvée dans le mot, le nombre de fois où elle a été rencontrée

## 1ère étape : analyser et comprendre l'énoncé

On te dit qu'on veut obtenir un tableau d'objets à partir d'un tableau de mots.
Le tableau de résultats aura autant d'éléments que le tableau d'entrée.
C'est donc un **bon candidat pour l'utilisation de `map()`**.

On peut alors décomposer `analyseMots` en deux :
* La plus grosse partie, c'est l'écriture d'une fonction qui va analyser *un seul mot*.
* Ensuite, c'est l'appel de `map()` sur le tableau fourni, avec comme paramètre à `map()` la fonction d'analyse d'un mot.

## 2ème étape : fonction d'analyse d'un mot

### Nommage de la fonction et de ses arguments

On va appeler cette fonction `analyseUnMot`. Elle prend logiquement comme argument un mot au singulier.

On peut commencer à écrire :

```javascript
function analyseUnMot(mot) {

}
```

### Préparation de l'objet de sortie

On veut récupérer un objet à la sortie de `analyseUnMot`.

Il doit contenir plusieurs propriétés. Notamment, `mot` et `longueur`.
Ces deux-là sont assez faciles à déterminer !

On peut donc commencer à écrire :

```javascript
function analyseUnMot(mot) {
  // Notre objet de sortie où on a déjà mis 2 propriétés
  const resultat = {
    mot: mot,
    longueur: mot.length
  }

  // On sait qu'on retournera l'objet créé plus haut
  return resultat
}
```

Ensuite, on voudra avoir aussi des propriétés `lettres`, `voyelles` et `consonnes` :
* `lettres` sera un objet
* `voyelles` et `consonnes` auront pour valeur des nombres

L'état initial pour `lettres` est un objet vide (`{}`), celui pour `voyelles` et `consonnes` est 0.

On ajoute tout ça à notre code précédent :
```javascript
function analyseUnMot(mot) {
  // Notre objet de sortie où on a déjà mis 2 propriétés
  const resultat = {
    mot: mot,
    lettres: {},
    longueur: mot.length,
    consonnes: 0,
    voyelles: 0
  }

  // On sait qu'on retournera l'objet créé plus haut
  return resultat
}
```

### Boucle sur les caractères du mots

Toujours dans notre fonction `analyseUnMot`, il va nous falloir une boucle, pour parcourir chaque caractère du mot.

On peut le faire de deux façons, toutes deux semblables à celles utilisables sur un tableau ! La boucle `for` "classique", et la boucle `for..of`.

On écrirait la boucle `for` classique ainsi :

```javascript
for(let i = 0 ; i < mot.length ; i++) {
  const lettre = mot[i]
  // faire quelque chose avec la lettre
}
```
On écrirait la boucle `for..of` ainsi :

```javascript
for(let lettre of mot) {
  // faire quelque chose avec la lettre
}
```

On va prendre le `for..of` qui est plus simple.

### Comptage les voyelles et consonnes

On va commencer par déterminer, dans le corps de la boucle, si la lettre est une voyelle ou une consonne. Une façon de le faire est d'utiliser `Array.includes`, dont voici deux exemples :

```javascript
const jedis = ['Luke', 'Obiwan', 'Yoda']
console.log(jedis.includes('Darth Vader')) // Affiche false

const starks = ['Arya', 'Bran', 'Sansa']
console.log(starks.include('Arya'))        // Affiche true
```

En résumé, **`Array.includes()` permet de déterminer si un élément se trouve dans un tableau** (il faut le lire à l'envers, c'est à dire qu'on cherche si le tableau *inclut* l'élément).

En partant de ce principe, si on crée un tableau avec toutes les voyelles, une lettre sera une voyelle si elle appartient à ce tableau. Sinon ce sera une consonne.


Si c'est une voyelle, on incrémente la propriété `voyelles` de 1, et sinon c'est `consonnes` qu'on incrémente de 1.

On peut ajouter ce code au précédent :

```javascript
function analyseUnMot(mot) {
  // Notre objet de sortie où on a déjà mis 2 propriétés
  const resultat = {
    mot: mot,
    lettres: {},
    longueur: mot.length,
    consonnes: 0,
    voyelles: 0
  }

  // Notre tableau de voyelles
  const voyelles = ['a', 'e', 'i', 'o', 'u', 'y']

  // La boucle
  for(let lettre of mot) {

    // Le test pour vérifier si le mot est une voyelle
    // et l'incrémentation de la propriété voyelles ou
    // consonnes en conséquence
    if(voyelles.includes(lettre)) {
      resultat.voyelles += 1
    }
    else {
      resultat.consonnes += 1
    }
  }

  // On sait qu'on retournera l'objet créé plus haut
  return resultat
}
```

Si en l'état on fait un `console.log(analyseUnMot('wild'))`, on obtient :

    { mot: 'wild',
      lettres: {},
      longueur: 4,
      consonnes: 3,
      voyelles: 1 }

### Comptage des lettres

Toujours dans le corps de la boucle, on veut maintenant remplir l'objet `lettres` qui fait partie de notre objet `resultat`.

Voici comment on procède, pour chaque `lettre` de `mot`. Par exemple, si on trouve un `a`:
* Si la propriété `mot.lettres['a']` n'existe pas (`undefined`), alors on va la créer et lui donner une valeur initiale : comme on vient la rencontrer pour la 1ère fois, on lui associe la valeur 1.
* Si en revanche elle existe, on augmente de 1 la valeur précédente.

On ajoute cela au code précédent :


```javascript
function analyseUnMot(mot) {
  // Notre objet de sortie où on a déjà mis 2 propriétés
  const resultat = {
    mot: mot,
    lettres: {},
    longueur: mot.length,
    consonnes: 0,
    voyelles: 0
  }

  // Notre tableau de voyelles
  const voyelles = ['a', 'e', 'i', 'o', 'u', 'y']

  // La boucle
  for(let lettre of mot) {

    // Le test pour vérifier si le mot est une voyelle
    // et l'incrémentation de la propriété voyelles ou
    // consonnes en conséquence
    if(voyelles.includes(lettre)) {
      resultat.voyelles += 1
    }
    else {
      resultat.consonnes += 1
    }

    // DERNIER AJOUT: vérifier si la propriété
    // resultat.lettres[lettre] existe. Si non,
    // la créer avec une valeur initiale (1),
    // et si oui, l'incrémenter
    if(resultat.lettres[lettre] === undefined) {
      resultat.lettres[lettre] = 1
    }
    else {
      resultat.lettres[lettre] += 1
    }
  }

  // On sait qu'on retournera l'objet créé plus haut
  return resultat
}
```

Si on refait `console.log('wild')`, on obtient :

    { mot: 'wild',
      lettres: { w: 1, i: 1, l: 1, d: 1 },
      longueur: 4,
      consonnes: 3,
      voyelles: 1 }

## 3ème étape : utiliser `map()`

On a notre fonction d'analyse d'un mot. Notre fonction `analyseMots` qui analyse un tableau de mots peut s'écrire très simplement, comme ceci :

```javascript
function analyseMots(mots) {
  return mots.map(analyseUnMot)
}
```

Ou de façon plus concise avec une fonction fléchée :

```javascript
const analyseMots = mots => mots.map(analyseUnMot)
```

## Conclusion

La correction ci-dessus se trouve dans `correction/analyseMots.js`.