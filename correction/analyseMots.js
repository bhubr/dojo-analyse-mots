const analyseUnMot = mot => {
  const voyelles = ['a', 'e', 'i', 'o', 'u', 'y']
  const resultat = {
    mot: mot,
    lettres: {},
    longueur: mot.length,
    consonnes: 0,
    voyelles: 0
  }
  for(lettre of mot) {
    if(resultat.lettres[lettre] === undefined) {
      resultat.lettres[lettre] = 1
    }
    else {
      resultat.lettres[lettre] += 1
    }
    if(voyelles.includes(lettre)) {
      resultat.voyelles += 1
    }
    else {
      resultat.consonnes += 1
    }
  }
  return resultat
}

const analyseMots = mots => mots.map(analyseUnMot)

// ATTENDU:
// [ { mot: 'mot',
//     lettres: { m: 1, o: 1, t: 1 },
//     longueur: 3,
//     consonnes: 2,
//     voyelles: 1 } ]

console.log(analyseMots(['mot']))

module.exports = analyseMots