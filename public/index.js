const answerElement = document.querySelector('.answer textarea')
const responseElement = document.querySelector('.response textarea')

const buttonConvert = document.querySelector('.converterBtn')

buttonConvert.onclick = () => {
  if ( !answerElement.value ) {
    responseElement.value = ""
    return responseElement.placeholder = "CSV está vazio"
  }

  const answerSplit = answerElement.value.split('\n')
  const variables = answerSplit[0].split(',')

  if ( variables.length < 2 ) {
    let quotes = 0

    for ( let letter of variables[0]) {
      if ( letter === '"') quotes++
    }

    if ( quotes > 2) {

      responseElement.value = ""
      return responseElement.placeholder = 'CSV está inválido'
    }
  }

  const properties = [] 
  for ( let method of variables ) {
    if ( method[0] != '"' || method[method.length - 1] != '"' ) {

      responseElement.value = ""
      return responseElement.placeholder = 'CSV está inválido'
    }

  }
  
  for ( let i = 1; i < answerSplit.length; i++ ) {
    properties.push(answerSplit[i])
    
  }
  
  responseElement.value = `[\n`
  for ( let proper of properties ) {
    let row = ''
    proper = proper.split(',')

    for ( let i = 0; i < proper.length; i++ ) {
      if ( variables[i] === undefined) {
        responseElement.value = ''
        return responseElement.placeholder = 'CSV está inválido'
      }

      if ( i == proper.length - 1) {
        row += `${variables[i]}: ${proper[i]}`

      } else {
        row += `${variables[i]}: ${proper[i]}, `

      }
    }
    
    if ( proper.join(',') === properties[properties.length - 1]) {
      responseElement.value += ` {${row}}\n`

    } else {
      responseElement.value += ` {${row}},\n`

    }
  }

  return responseElement.value += ']'
}