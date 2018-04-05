const analyseMots = require('./analyseMots')
const assert = require('assert')
describe('Test analyseMots', () => {
	
  it('analyseMots est une fonction', () => {
    assert.equal(typeof analyseMots, 'function', "analyseMots n'est pas une fonction")
  })

  it('test sur un tableau de mots', () => {
    const tableauTest = [
      'anagramme', 'ellipse', 'parallelepipede', 'trajectoire'
    ]
    const resultat = analyseMots(tableauTest)
    const attendu = [
      {
        mot: 'anagramme',
        lettres: {
          a: 2,
          e: 1,
          g: 1,
          m: 2,
          n: 1
        },
        longueur: 9,
        voyelles: 3,
        consonnes: 6
      },
      {
        mot: 'ellipse',
        lettres: {
          e: 2,
          i: 1,
          p: 1,
          s: 1
        },
        longueur: 7,
        voyelles: 3,
        consonnes: 4
      },
      {
        mot: 'parallelepipede',
        lettres: {
          a: 2,
          d: 1,
          e: 4,
          i: 1,
          l: 3,
          p: 3,
          r: 1
        },
        longueur: 15,
        voyelles: 7,
        consonnes: 8
      },
      {
        mot: 'trajectoire',
        lettres: {
          a: 1,
          c: 1,
          e: 2,
          i: 1,
          j: 1,
          o: 1,
          r: 2,
          t: 2
        },
        longueur: 11,
        voyelles: 4,
        consonnes: 7
      }
    ]
    assert.deepEqual(resultat)
  })
})