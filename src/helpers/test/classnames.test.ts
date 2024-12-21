import {beforeEach, describe, expect, test} from "@jest/globals";
import {classNames, Mods} from "@/helpers/lib/classNames/className";


describe('ClassNames', () => {
    let cls:string;
    let mod:Mods = {}
    let modTwo:Mods = {};
    let additional:(string | undefined)[] = []

    beforeEach(() => {
        cls = 'classFirst';
        mod = {
            "active": true,
        }
        modTwo = {
            "active": true,
            "disabled": false,
            "highlighted": false
        }
        additional = ['classAdd']
    })

    test('передадим cls', () => {
        const result = classNames(cls)
        expect(result).toContain('classFirst');
    })
    test('передадим cls, mod', () => {
        const result = classNames(cls, mod)
        expect(result).toContain('classFirst  active');
    })
    test('передадим толькл cls, modTwo, additional', () => {
        const result = classNames(cls, modTwo, additional)
        expect(result).toContain('classFirst classAdd active');
    })
    test('передадим только additional', () => {
        const result = classNames(cls,undefined, additional)
        expect(result).toContain('classFirst classAdd ');
    })
})
