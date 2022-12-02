export {}

const input = await Deno.readTextFile("day-1/input.txt"); 
const data: string[] = input.split("\n")
 

const caloriesPerElf = data.reduce<string[][]>((acc, curr) => {
    if(curr) {
       const lastElf = acc.at(-1) ?? []
       acc.pop()
       return [...acc, [...lastElf, curr]]
    }
    return [...acc, []]
}, [[]])

const caloriesPerElfSummed = caloriesPerElf.map(elf => elf.reduce((acc, curr) => acc + parseInt(curr), 0))

const elfWithHighestCalories = caloriesPerElfSummed.reduce((acc, curr, index) => {
    if(curr > acc.calories) {
        return {calories: curr, index}
    }
    return acc
}, {index: 0, calories: 0})

console.log('res: ', elfWithHighestCalories);
