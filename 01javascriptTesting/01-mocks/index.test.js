const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');


(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        Date.prototype.getFullYear = () => 2020
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "name": "Erick Wendel",
                "id": 123,
                "profession": "Javascript Instructor",
                "birthDay": 1995
            },
            {
                "name": "Xyxa da Sukva",
                "id": 321,
                "profession": "Javascript Soecuakust",
                "birthDay": 1940
            },
            {
                "name": "Joaozinho",
                "id": 231,
                "profession": "Java Developer",
                "birthDay": 1990
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }


}
)(); 