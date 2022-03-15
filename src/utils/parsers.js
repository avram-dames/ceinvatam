const months = [
  'Ianuarie', 
  'Februarie', 
  'Martie', 
  'Aprilie', 
  'Mai', 
  'Iunie', 
  'Iulie', 
  'August', 
  'Septembrie', 
  'Octombrie', 
  'Noiembrie', 
  'Decembrie'
]

function udfNormalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parseDate(dateString) {
  const dt = new Date(dateString)
  return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`

}

export {
  udfNormalize, parseDate
}

