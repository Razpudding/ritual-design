//TODO: Remove side effect, global var 'words'
import { csv } from 'd3-fetch'

let sentenceLength = 4
let words = {}
let columns
const iterations = 20

export async function loadData(url){
  console.log(url)

  await csv(url, parseRow)
  console.log("word Data", words)
  
  columns = Object.keys(words)
  console.log("columns", columns)
  return words
}

function parseRow(row){
  // console.log(row)
  for (let column in row){
    if (row[column] == ""){
      continue
    }
    if (!words[column]) {
      words[column] = []
    }
    words[column].push(row[column])
  }
}

export function generateText(words, pattern){
  console.log("generating", pattern)
  let text = ''
  let sentenceEnd = pattern.includes("questions") ? "?" : "."

  // random selective
  for (let i of pattern){
    let candidates = words[i]
    // console.log(candidates)
    text += candidates[Math.floor(Math.random() * candidates.length)] + " "
  }
  text = text.replace(/.$/, sentenceEnd)
  return text
}