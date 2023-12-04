import './utils/helpers.js';

let input: string = await Bun.file('input.txt').text();
// let exampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.trim();

const apa = input.lines().filter(line => {
    const sets = line.split(':')[1].split(';');
    const data = sets.map(p => p.split(',').trim().map(val => {
        const parts = val.split(' ');
        const parsed = {
            [parts[1]]: parts[0].nums()[0]
        };
        if (parsed.red && parsed.red > 12) return false;
        if (parsed.green && parsed.green > 13) return false;
        if (parsed.blue && parsed.blue > 14) return false;
        return true;
    })).filter(p => p.filter(o => o).length == p.length);
    return data.length === sets.length;
});

const result = apa.map(a => a.split(':')[0]).map(val => val.nums()[0]).sum();
console.log(result);