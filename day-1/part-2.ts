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

const replaceLowestValue = (arr: number[], value: number) => {
    const lowestValue = arr.reduce((acc, curr) => {
        if(curr < acc) {
            return curr
        }

        return acc
    }, arr[0])
    const lowestValueIndex = arr.indexOf(lowestValue)
    arr[lowestValueIndex] = value

    return arr
}

const topThreeElfWithHighestCallories = caloriesPerElfSummed.reduce((acc, curr) => {
    if(curr >acc[0]||curr >acc[1]||curr >acc[2]) {
        return replaceLowestValue(acc, curr)
    }

    return acc
}, [0, 0, 0])

const totalCalloriesCount = topThreeElfWithHighestCallories.reduce((acc, curr) => acc + curr, 0)

console.log('res: ', totalCalloriesCount);
