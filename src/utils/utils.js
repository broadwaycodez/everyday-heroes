const Utils = {
  getPercent(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      console.log('not numbers')
      return null
    }
    return Math.round((num1/num2)*100)
  },
  capitalize(word) {
    if (typeof word !== 'string') {
      return null
    }
    return word.split('').map((c, i) => {
      return i === 0 ? c.toUpperCase() : c.toLowerCase()
    }).join('')
  }
}

export default Utils